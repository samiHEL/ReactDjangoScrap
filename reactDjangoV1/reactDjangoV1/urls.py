from django.contrib import admin
from django.urls import path
from back.views import login_view, submit_form_basique,submit_form_medium,submit_form_prenium, register_view

urlpatterns = [
    path('api/login', login_view),
    path('api/submit', submit_form_basique),
    path('api/submit_medium', submit_form_medium),
    path('api/submit_prenium', submit_form_prenium),
    path('api/register', register_view),
    path('admin/', admin.site.urls),
]
