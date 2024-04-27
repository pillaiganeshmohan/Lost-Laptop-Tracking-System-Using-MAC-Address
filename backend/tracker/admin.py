from django.contrib import admin
from .models import *
import os
from django.conf import settings

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'police_id')
    search_fields = ('email', 'police_id')

@admin.register(ContactUs)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'contact_us')
    search_fields = ('email', 'contact_us')
   

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

@admin.register(PcapFile)
class PcapFileAdmin(admin.ModelAdmin):
    list_display = ('file_display', 'uploaded_at')  # Changed 'file' to 'file_display'

    def file_display(self, obj):
        if obj.file:
            return obj.file.name
        return ''

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        media_root = settings.MEDIA_ROOT
        existing_files = []
        if os.path.exists(media_root):
            existing_files = [f for f in os.listdir(media_root) if os.path.isfile(os.path.join(media_root, f))]

        for filename in existing_files:
            file_obj, created = PcapFile.objects.get_or_create(file=filename)
            if created:
                file_obj.title = filename
                file_obj.save()

        return queryset | PcapFile.objects.filter(file__in=existing_files)

    def delete_model(self, request, obj):
        if obj.file:
            file_path = obj.file.path
            if os.path.exists(file_path):
                os.remove(file_path)
        super().delete_model(request, obj)
