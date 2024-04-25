from django.contrib import admin
from .models import *


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'police_id')
    search_fields = ('email', 'police_id')
   

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'updated_at')
    search_fields = ('user__email',)
    list_filter = ( 'created_at', 'updated_at')

@admin.register(StolenLaptopDetails)
class StolenLaptopDetailsAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'full_name', 'aadhaar_no', 'date', 'brand', 'model_no', 
        'mac_address', 'ipv4', 'location', 'status'
    )
    search_fields = ('user__email', 'full_name', 'aadhaar_no', 'brand', 'model_no', 'mac_address' )
    list_filter = ('date', 'brand', 'status')

    def get_queryset(self, request):
        """ Modify this method to adjust the queryset as per admin user needs, if necessary. """
        queryset = super().get_queryset(request)
        # Custom filtering or adjustments to queryset
        return queryset

    def save_model(self, request, obj, form, change):
        """ You can also override this method to implement custom save behavior. """
        super().save_model(request, obj, form, change)