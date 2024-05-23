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
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import re
import json
from selenium.webdriver.firefox.service import Service as FirefoxService



options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)





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
def register_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if User.objects.filter(username=username).exists():
        return JsonResponse({"message": "Username already taken"}, status=400)
    user = User.objects.create_user(username=username, password=password)
    user.save()
    return JsonResponse({"message": "User created successfully"}, status=201)

@api_view(['POST'])
def submit_form_medium(request):
    print("medium")
    #driver = uc.Chrome(options=options)
    # driver = uc.Chrome()
    #recup donées
    enseigne = request.data.get('brand')
    ville = request.data.get('city')
    url2="https://www.google.com/search?q="+enseigne+"+"+ville+"&rlz=1C5GCEM_en&biw=1848&bih=968&tbm=lcl&ei=apkhZLSKGsbVkdUP1oabuAY&ved=0ahUKEwi058D5mvz9AhXGaqQEHVbDBmcQ4dUDCAg&uact=5&oq="+enseigne+"+"+ville+"&gs_lcp=Cg1nd3Mtd2l6LWxvY2FsEAMyCAgAEIAEELEDMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgcIABCKBRBDOgYIABAWEB46CwgAEIAEELEDEIMBOgoIABCKBRCxAxBDUP8KWOjchgFgjN6GAWgHcAB4AIABfIgB-AySAQQxOC4ymAEAoAEBsAEAwAEB&sclient=gws-wiz-local#rlfi=hd:;si:;mv:[[72.59981891874918,78.7458826694124],[24.315754054065685,-46.76192983058759]];start:{page}"
    pages = range(0,40,20)
    MAG=[]
    PHONE=[]
    TYPE=[]
    ADR=[]
    ZIP=[]
    CITY=[]
    WEB=[]
    HORAIRE=[]
    IMAGE=[]
    # Setup WebDriver options
    options = FirefoxOptions()
    options.add_argument("--headless")
    service = FirefoxService()

    with webdriver.Firefox(service=service, options=options) as driver:
        try:
            driver.get(url2)
            time.sleep(1)
            #driver.save_screenshot("screenshot1.png")
            back = driver.find_elements(By.CSS_SELECTOR, "div[class='lssxud']")[1]
            back.click()

            for page in pages:
                    print("page")
                    print(page)
                    driver.get(url2.format(page=page,ville=ville))
                    time.sleep(2)
                    soup = BeautifulSoup(driver.page_source, 'html.parser')
                    time.sleep(1)    

                    stores_verif= soup.find_all("div", class_="rllt__details")
                    stores= driver.find_elements(By.CSS_SELECTOR, "div[class='rllt__details']")
                    if stores_verif ==[]:
                        break
                    print("------")

                    for x in range(23):
                        stores2= driver.find_elements(By.CSS_SELECTOR, "div[class='rllt__details']")
                        time.sleep(0.5)
                        try:
                            stores2[x].click()
                            soup2 = BeautifulSoup(driver.page_source, 'html.parser')
                            time.sleep(0.5)
                            try:
                                adr_complete=soup2.find("div", {"data-attrid": "kc:/location/location:address"}).text
                            except:
                                adr_complete=""
                            try:
                                name=soup2.find("h2", {"data-dtype": "d3ifr"}).text
                            except:
                                name=""
                            try:
                                type=soup2.find("span", class_="YhemCb").text
                            except:
                                type=""
                            try:
                                horaire=soup2.find("table", class_="WgFkxc").text
                            except:
                                horaire=""
                            try:
                                jours_semaine = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
                            except:
                                jours_semaine=""
                            
                            # Utilisez des expressions régulières pour extraire les jours et les heures
                            try:
                                pattern = rf'({"|".join(jours_semaine)})((?:\d{{2}}:\d{{2}}–\d{{2}}:\d{{2}}|Fermé))+'
                                matches = re.findall(pattern, horaire)
                                horaires = {jour: heures if "Fermé" not in heures else "Fermé" for jour, heures in matches}
                                horaires_json = json.dumps(horaires, ensure_ascii=False)
                            except:
                                horaires_json=""
                            try:
                                zip_code=adr_complete.split(",")[1].split(" ")[1]
                            except:
                                zip_code=""
                            try:
                                city=adr_complete.split(",")[1].split(" ")[2]
                            except:
                                city=""
                            image_url=""
                            try:
                                style=soup2.find("button", {"data-clid": "local-photo-browser"}).find("div").get("style")
                                parts = style.split("url(")
                                image_url = parts[1].strip(")\"'")
                            except:
                                img="no"
                            try:
                                #phone=soup2.find("a", {"data-dtype": "d3ph"}).text
                                phone=soup2.find("span", class_="LrzXr zdqRlf kno-fv").text
                            except:
                                phone=""
                            try:
                                web=soup2.find("a", class_="xFAlBc").text
                            except:
                                web=""
                            print(f"{name};{zip_code};{city};{adr_complete};{phone};{web};{horaires_json};{type};{image_url} ")
                            MAG.append(name)
                            ZIP.append(zip_code)
                            CITY.append(city)
                            ADR.append(adr_complete)
                            PHONE.append(phone)
                            WEB.append(web)
                            HORAIRE.append(horaires_json)
                            TYPE.append(type)
                            IMAGE.append(image_url)
                        except:
                                print("erreur mag")
                                continue
        except Exception as e:
            print(f"Erreur WebDriver : {e}")
    #fermer la page chrome
    response = HttpResponse()
    response['Content-Disposition'] = 'attachment; filename='+enseigne+'.csv'
    # Create the CSV writer using the HttpResponse as the "file"
    writer = csv.writer(response)
    writer.writerow(['Nom Magasin', 'Type','Adresse','Numero Tel'])
    for (name,type,zip_code,city,adr_complete,phone,horaires_json,web,image_url) in zip(MAG,TYPE,ZIP,CITY,ADR,PHONE,HORAIRE,WEB,IMAGE):
        writer.writerow([name,type,zip_code,city,adr_complete,phone,horaires_json,web,image_url])

    return response



@api_view(['POST'])
def submit_form_prenium(request):
    print("prenium")
    enseigne = request.data.get('brand')
    ville = request.data.get('city')
    url2="https://www.google.com/search?q="+enseigne+"+"+ville+"&rlz=1C5GCEM_en&biw=1848&bih=968&tbm=lcl&ei=apkhZLSKGsbVkdUP1oabuAY&ved=0ahUKEwi058D5mvz9AhXGaqQEHVbDBmcQ4dUDCAg&uact=5&oq="+enseigne+"+"+ville+"&gs_lcp=Cg1nd3Mtd2l6LWxvY2FsEAMyCAgAEIAEELEDMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgcIABCKBRBDOgYIABAWEB46CwgAEIAEELEDEIMBOgoIABCKBRCxAxBDUP8KWOjchgFgjN6GAWgHcAB4AIABfIgB-AySAQQxOC4ymAEAoAEBsAEAwAEB&sclient=gws-wiz-local#rlfi=hd:;si:;mv:[[72.59981891874918,78.7458826694124],[24.315754054065685,-46.76192983058759]];start:{page}"
    pages = range(0,40,20)
    MAG=[]
    PHONE=[]
    TYPE=[]
    ADR=[]
    ZIP=[]
    CITY=[]
    WEB=[]
    HORAIRE=[]
    IMAGE=[]
    EMAILS = []
    # Setup WebDriver options
    options = FirefoxOptions()
    options.add_argument("--headless")
    service = FirefoxService()

    with webdriver.Firefox(service=service, options=options) as driver:
        try:
            driver.get(url2)
            time.sleep(1)
            #driver.save_screenshot("screenshot1.png")
            back = driver.find_elements(By.CSS_SELECTOR, "div[class='lssxud']")[1]
            back.click()

            for page in pages:
                    print("page")
                    print(page)
                    driver.get(url2.format(page=page,ville=ville))
                    time.sleep(2)
                    soup = BeautifulSoup(driver.page_source, 'html.parser')
                    time.sleep(1)    

                    stores_verif= soup.find_all("div", class_="rllt__details")
                    stores= driver.find_elements(By.CSS_SELECTOR, "div[class='rllt__details']")
                    if stores_verif ==[]:
                        break
                    print("------")

                    for x in range(23):
                        stores2= driver.find_elements(By.CSS_SELECTOR, "div[class='rllt__details']")
                        time.sleep(0.5)
                        try:
                            stores2[x].click()
                            soup2 = BeautifulSoup(driver.page_source, 'html.parser')
                            time.sleep(0.5)
                            try:
                                adr_complete=soup2.find("div", {"data-attrid": "kc:/location/location:address"}).text
                            except:
                                adr_complete=""
                            try:
                                name=soup2.find("h2", {"data-dtype": "d3ifr"}).text
                            except:
                                name=""
                            try:
                                type=soup2.find("span", class_="YhemCb").text
                            except:
                                type=""
                            try:
                                horaire=soup2.find("table", class_="WgFkxc").text
                            except:
                                horaire=""
                            try:
                                jours_semaine = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
                            except:
                                jours_semaine=""
                            
                            # Utilisez des expressions régulières pour extraire les jours et les heures
                            try:
                                pattern = rf'({"|".join(jours_semaine)})((?:\d{{2}}:\d{{2}}–\d{{2}}:\d{{2}}|Fermé))+'
                                matches = re.findall(pattern, horaire)
                                horaires = {jour: heures if "Fermé" not in heures else "Fermé" for jour, heures in matches}
                                horaires_json = json.dumps(horaires, ensure_ascii=False)
                            except:
                                horaires_json=""
                            try:
                                zip_code=adr_complete.split(",")[1].split(" ")[1]
                            except:
                                zip_code=""
                            try:
                                city=adr_complete.split(",")[1].split(" ")[2]
                            except:
                                city=""
                            image_url=""
                            try:
                                style=soup2.find("button", {"data-clid": "local-photo-browser"}).find("div").get("style")
                                parts = style.split("url(")
                                image_url = parts[1].strip(")\"'")
                            except:
                                img="no"
                            try:
                                #phone=soup2.find("a", {"data-dtype": "d3ph"}).text
                                phone=soup2.find("span", class_="LrzXr zdqRlf kno-fv").text
                            except:
                                phone=""
                            try:
                                web=soup2.find("a", class_="xFAlBc").text
                            except:
                                web=""
                            print(f"{name};{zip_code};{city};{adr_complete};{phone};{web};{horaires_json};{type};{image_url} ")
                            MAG.append(name)
                            ZIP.append(zip_code)
                            CITY.append(city)
                            ADR.append(adr_complete)
                            PHONE.append(phone)
                            WEB.append(web)
                            HORAIRE.append(horaires_json)
                            TYPE.append(type)
                            IMAGE.append(image_url)
                        except:
                                print("erreur mag")
                                continue
            print(MAG)
            # Recherche des emails pour chaque magasin
            for name in MAG:
                try:
                    email_url = "https://www.google.com/search?q={nomM}%2Bemail%2Bcontact&client=firefox-b-d&sca_esv=1114ab6409594670&sxsrf=ACQVn092M4Iq4F0e47WjMlAG9Op8OQGXJQ%3A1710249643869&ei=q1bwZZnQNJ-lkdUP48mFkAg&ved=0ahUKEwjZ0f-z6O6EAxWfUqQEHeNkAYIQ4dUDCBA&uact=5&oq=Electrician+Service+Pros%2Bemail%2Bcontact&gs_lp=Egxnd3Mtd2l6LXNlcnAiJkVsZWN0cmljaWFuIFNlcnZpY2UgUHJvcytlbWFpbCtjb250YWN0MgUQIRigATIFECEYoAEyBRAhGKABSNMaUOQKWPkXcAJ4AZABAJgBPKABjQOqAQE4uAEDyAEA-AEBmAIKoAKxA8ICBxAjGLADGCfCAgoQABhHGNYEGLADwgIHECMYsAIYJ8ICBxAhGAoYoAGYAwCIBgGQBgSSBwIxMKAHyxY&sclient=gws-wiz-serp"
                    driver.get(email_url.format(nomM=name.replace("&", "")))
                    print(email_url.format(nomM=name.replace("&", "")))
                    print(name.replace("&", ""))
                    time.sleep(3)
                    soup_email = BeautifulSoup(driver.page_source, 'html.parser')
                    time.sleep(1.5)
                    msg_lien = soup_email.find_all("div", class_="MjjYud")
                    liste_emails = []
                    for msg in msg_lien[:4]:
                        if "@" in msg.text:
                            emails = re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", msg.text)
                            if emails:
                                email = emails[0]
                                clean_email = re.sub(r"\.[A-Z][^@]*$", "", email)
                                clean_email = re.sub(r"(?<!\.)[A-Z].*", "", clean_email)
                                liste_emails.append(clean_email)
                    EMAILS.append(liste_emails)
                except:
                    EMAILS.append([])
        except Exception as e:
            print(f"Erreur WebDriver : {e}")

    print(EMAILS)
    response = HttpResponse()
    response['Content-Disposition'] = 'attachment; filename='+enseigne+'.csv'
    # Create the CSV writer using the HttpResponse as the "file"
    writer = csv.writer(response)
    writer.writerow(['Nom Magasin', 'Type', 'Adresse', 'Numero Tel', 'Horaires', 'Web', 'Image', 'Emails'])
    for (name,type,zip_code,city,adr_complete,phone,horaires_json,web,image_url,emails) in zip(MAG,TYPE,ZIP,CITY,ADR,PHONE,HORAIRE,WEB,IMAGE,EMAILS):
        writer.writerow([name,type,zip_code,city,adr_complete,phone,horaires_json,web,image_url,emails])

    return response


@api_view(['POST'])
def submit_form_basique(request):
    # Assumer que l'utilisateur est déjà authentifié
    # Logique pour exécuter le code backend

    print("basique")

    #recup données
    enseigne = request.data.get('brand')
    ville = request.data.get('city')
    url2="https://www.google.com/search?q="+enseigne+"+"+ville+"&rlz=1C5GCEM_en&biw=1848&bih=968&tbm=lcl&ei=apkhZLSKGsbVkdUP1oabuAY&ved=0ahUKEwi058D5mvz9AhXGaqQEHVbDBmcQ4dUDCAg&uact=5&oq="+enseigne+"+"+ville+"&gs_lcp=Cg1nd3Mtd2l6LWxvY2FsEAMyCAgAEIAEELEDMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgcIABCKBRBDOgYIABAWEB46CwgAEIAEELEDEIMBOgoIABCKBRCxAxBDUP8KWOjchgFgjN6GAWgHcAB4AIABfIgB-AySAQQxOC4ymAEAoAEBsAEAwAEB&sclient=gws-wiz-local#rlfi=hd:;si:;mv:[[72.59981891874918,78.7458826694124],[24.315754054065685,-46.76192983058759]];start:{page}"
    pages = range(0,40,20)
    MAG=[]
    PHONE=[]
    TYPE=[]
    ADR=[]
    # Setup WebDriver options
    options = FirefoxOptions()
    options.add_argument("--headless")
    service = FirefoxService()

    with webdriver.Firefox(service=service, options=options) as driver:
        try:
            driver.get(url2)
            time.sleep(1)
            back = driver.find_elements(By.CSS_SELECTOR, "div[class='lssxud']")[1]
            back.click()
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
        except Exception as e:
            print(f"Erreur WebDriver : {e}")
