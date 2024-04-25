from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)
        

class User(AbstractBaseUser, PermissionsMixin):
    email = models.CharField(max_length=100, unique=True)
    police_id = models.CharField(max_length=100, unique=True)
    aadhaar_no = models.CharField(max_length=100)
    contact_no = models.IntegerField(default=0)
    address = models.CharField(max_length=100, null=True)
    full_name = models.CharField(max_length=100)
    is_staff = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    REQUIRED_FIELDS = []
    USERNAME_FIELD = 'email'

    objects = UserManager()

    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name="user_profile")
    phone = models.CharField(max_length=255, blank=True, null=True)
   
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email

class ContactUs(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    contact_us = models.CharField(max_length=200)
    query = models.TextField()

  # Import User model here

class StolenLaptopDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="stolen_laptop_details")
    full_name = models.CharField(max_length=100)
    aadhaar_no = models.CharField(max_length=12)
    approximate_time = models.TimeField(null=True)
    date = models.DateField(null=True)
    address = models.CharField(max_length=255)
    contact_no = models.CharField(max_length=15)
    brand = models.CharField(max_length=100)
    description = models.TextField()
    model_no = models.CharField(max_length=100)
    mac_address = models.CharField(max_length=17)
    ipv4 = models.CharField(max_length=15, null=True)
    location = models.CharField(max_length=100, null=True)
    status = models.BooleanField(default=False) 
   

    def __str__(self):
        return f"{self.full_name}"

