from django.contrib import admin
from .models import FormInfo

class FormInfoAdmin(admin.ModelAdmin):
    list_display = ['user', 'brand', 'city']  # Champs à afficher dans la liste
    search_fields = ['brand', 'city']  # Champs pour la recherche
    list_filter = ['brand', 'city']  # Filtres disponibles

admin.site.register(FormInfo, FormInfoAdmin)

