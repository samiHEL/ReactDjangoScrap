from django.contrib import admin
from django.urls import path
from back.views import login_view, submit_form, register_view

urlpatterns = [
    path('api/login', login_view),
    path('api/submit', submit_form),
    path('api/register', register_view),
    path('admin/', admin.site.urls),
]
