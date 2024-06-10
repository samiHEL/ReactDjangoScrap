from django.contrib import admin
from django.urls import path, include
from .views import signup,login,submit_form_medium, submit_form_basique, submit_form_prenium, buy_tickets
urlpatterns = [
    #path('register', RegisterView.as_view(), name='register'),
    #path('buy_tickets', buy_tickets, name='buy_tickets'),
    path('signup', signup),
    path('login', login),
    path('submit_form_basique', submit_form_basique, name='submit_form_basique'),
    path('submit_form_medium', submit_form_medium, name='submit_form_medium'),
    path('submit_form_prenium', submit_form_prenium, name='submit_form_prenium'),
    path('buy_tickets', buy_tickets, name='buy_tickets'),
    #path('logout', LogoutView.as_view(), name='logout'),
]

