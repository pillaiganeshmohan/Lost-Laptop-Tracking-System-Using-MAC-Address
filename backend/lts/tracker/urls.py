from django.urls import path
from .views import *

urlpatterns = [
   path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/', UserListCreate.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroy.as_view(), name='user-retrieve-update-destroy'),
    path('users/register/', UserCreateAPIView.as_view(), name='user_create'),
    path('stolen-laptop-details/', StolenLaptopDetailsAPIView.as_view(), name='stolen-laptop-details/'),
    path('update-stolen-laptop-details/', UpdateStolenLaptopDetails.as_view(), name='update_stolen_laptop_details'),
]

#eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyNTM0Mzk4LCJpYXQiOjE3MTI1MzQwOTgsImp0aSI6IjI3MDZkOThiYjcwNTQ5MGQ4ZjU4MWYzODI0ZGU5NTRhIiwidXNlcl9pZCI6MX0._jp9nha8qUwIxTakBNbCaIznqHopJdI8M-kxs0nz7lM