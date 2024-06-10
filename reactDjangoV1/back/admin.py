# from django.contrib import admin
# from .models import UserProfile, Ticket, Purchase

# class UserProfileAdmin(admin.ModelAdmin):
#     list_display = ['user']

# admin.site.register(UserProfile, UserProfileAdmin)

# class TicketAdmin(admin.ModelAdmin):
#     list_display = ['user', 'quantity']

# admin.site.register(Ticket, TicketAdmin)

# class PurchaseAdmin(admin.ModelAdmin):
#     list_display = ['user', 'tickets_purchased', 'amount', 'purchase_date']
#     list_filter = ['purchase_date']

# admin.site.register(Purchase, PurchaseAdmin)
from django.contrib import admin
from .models import Profile

admin.site.register(Profile)
