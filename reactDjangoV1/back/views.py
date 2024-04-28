from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth.models import User


from datetime import datetime
from random import randint
from django.http import HttpResponse
from django.shortcuts import redirect, render
from random import randint
import requests
from bs4 import BeautifulSoup
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib import messages
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.shortcuts import render
import csv
from selenium import webdriver
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.common.by import By
import requests
from multiprocessing import freeze_support
import requests
from bs4 import BeautifulSoup
import time
import undetected_chromedriver as uc





@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({"message": "Login successful"})
    else:
        return JsonResponse({"message": "Invalid credentials"}, status=401)

@api_view(['POST'])
def submit_form(request):
    # Assumer que l'utilisateur est déjà authentifié
    # Logique pour exécuter le code backend
    # ...
    #return JsonResponse({"message": "Code bien exécuté"})

    # options = FirefoxOptions()
    # options.headless = True
    # options.add_argument("--headless")
    # driver = webdriver.Firefox(options=options)
    print("test0")
    from selenium import webdriver
    from selenium.webdriver.firefox.options import Options

    options = Options()
    options.add_argument("--headless")
    driver = webdriver.Firefox(options=options)
    print("test1")
    #driver = uc.Chrome(options=options)
    # driver = uc.Chrome()

    #recup donées
    enseigne = request.data.get('brand')
    ville = request.data.get('city')
    url2="https://www.google.com/search?q="+enseigne+"+"+ville+"&rlz=1C5GCEM_en&biw=1848&bih=968&tbm=lcl&ei=apkhZLSKGsbVkdUP1oabuAY&ved=0ahUKEwi058D5mvz9AhXGaqQEHVbDBmcQ4dUDCAg&uact=5&oq="+enseigne+"+"+ville+"&gs_lcp=Cg1nd3Mtd2l6LWxvY2FsEAMyCAgAEIAEELEDMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgcIABCKBRBDOgYIABAWEB46CwgAEIAEELEDEIMBOgoIABCKBRCxAxBDUP8KWOjchgFgjN6GAWgHcAB4AIABfIgB-AySAQQxOC4ymAEAoAEBsAEAwAEB&sclient=gws-wiz-local#rlfi=hd:;si:;mv:[[72.59981891874918,78.7458826694124],[24.315754054065685,-46.76192983058759]];start:{page}"
    pages = range(0,200,20)
    MAG=[]
    PHONE=[]
    TYPE=[]
    ADR=[]
    driver.get(url2)
    time.sleep(1)
    back = driver.find_elements(By.CSS_SELECTOR, "div[class='lssxud']")[1]
    back.click()
    print("test")
    #with open("/home/samihella/Downloads/Downloads/scrapp_gm.csv", "w") as f:
    try:
                #1 ER ETAPE RECUPERER Nom Magasin,Type,Adresse,Numero Tel -> GOOD
                # 2 EME ETAPE RECUPERER MAIL RECHERCHE CROISEE GOOGLE -> CODE A AJOUTER LUNDI
                # 3 EME ETAPE RECUPERER NOM PATRON -> CODE A AJOUTER MERCREDI FERIE
                # 4 EME ETAPE RAJOUTER ACTION EN ARRIERE PLAN POUR QUE CVS S ENVOI PAR MAIL
                #......
                for page in pages:
                    print("lets go")
                    driver.get(url2.format(page=page))
                    time.sleep(3)
                    soup = BeautifulSoup(driver.page_source, 'html.parser')
                    time.sleep(2)    
                    stores= soup.find_all("div", class_="rllt__details")
                    print("----")
                    for store in stores:
                        print(store)
                        try:
                            mag = store.find_all("div")[0].text
                        except:
                             mag=""
                        try:
                            type= store.find_all("div")[1].text
                        except:
                             type=""
                        try:
                            adr= store.find_all("div")[2].text.split(" · ")[0]
                        except:
                             adr=""
                        try:
                            tel= store.find_all("div")[2].text.split(" · ")[1]
                        except:
                             tel=""
                        print("-------Mag------")
                        print(mag)
                        print(type)
                        print(adr)
                        print(tel)
                        MAG.append(mag)
                        TYPE.append(type)
                        ADR.append(adr)
                        PHONE.append(tel)
                
                
                #fermer la page chrome
                driver.close()
                response = HttpResponse()
                response['Content-Disposition'] = 'attachment; filename='+enseigne+'.csv'
                # Create the CSV writer using the HttpResponse as the "file"
                writer = csv.writer(response)
                writer.writerow(['Nom Magasin', 'Type','Adresse','Numero Tel'])
                for (name,type,adr,phone) in zip(MAG,TYPE,ADR,PHONE):
                    writer.writerow([name,type,adr,phone])

                return response
        
    except:
                return JsonResponse({"message": "Code mal exécuté"})

@api_view(['POST'])
def register_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if User.objects.filter(username=username).exists():
        return JsonResponse({"message": "Username already taken"}, status=400)
    user = User.objects.create_user(username=username, password=password)
    user.save()
    return JsonResponse({"message": "User created successfully"}, status=201)
