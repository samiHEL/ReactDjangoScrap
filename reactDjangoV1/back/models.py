# from django.db import models
# from django.contrib.auth.models import User

# # Modèle pour les informations supplémentaires sur l'utilisateur
# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
#     # Vous pouvez ajouter d'autres champs spécifiques à l'utilisateur ici

#     def __str__(self):
#         return self.user.username

# # Modèle pour les tickets
# class Ticket(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='ticket')
#     quantity = models.PositiveIntegerField(default=0)

#     def __str__(self):
#         return f"{self.user.username} - {self.quantity} tickets"

# # Modèle pour les achats
# class Purchase(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='purchases')
#     tickets_purchased = models.PositiveIntegerField()
#     purchase_date = models.DateTimeField(auto_now_add=True)
#     amount = models.DecimalField(max_digits=6, decimal_places=2)

#     def __str__(self):
#         return f"{self.user.username} - {self.tickets_purchased} tickets - {self.amount}€"
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    tickets = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username
    