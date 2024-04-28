from django.db import models
from django.contrib.auth.models import User

# Si vous avez besoin de stocker des informations supplémentaires
class FormInfo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    brand = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
