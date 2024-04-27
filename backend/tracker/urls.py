from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
   path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('users/', UserListCreate.as_view(), name='user-list-create'),
   path('users/<int:pk>/', UserRetrieveUpdateDestroy.as_view(), name='user-retrieve-update-destroy'),
   path('users/register/', UserCreateAPIView.as_view(), name='user_create'),
   path('stolen-laptop-details/', StolenLaptopDetailsAPIView.as_view(), name='stolen-laptop-details/'),
   path('update-stolen-laptop-details/', SearchView.as_view(), name='update_stolen_laptop_details'),
   path('contactus/',ContactUsListCreate.as_view(), name='contact_us'),
   path('make-superuser/', MakeSuperuserAPIView.as_view(), name='make_superuser'),
   path('upload/', upload_pcap_files, name='upload_pcap_files'),
  

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

