from django.urls import path
from search_algo.views import SearchLocationByMac

urlpatterns = [
    path('search-location-by-mac/', SearchLocationByMac.as_view(), name='search_location_by_mac'),
    # Add other URL patterns as needed
]
