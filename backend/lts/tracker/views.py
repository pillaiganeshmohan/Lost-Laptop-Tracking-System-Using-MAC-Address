from rest_framework import status
import asyncio
from asgiref.sync import sync_to_async
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
import pyshark
from ip2geotools.databases.noncommercial import DbIpCity
from geopy.geocoders import Nominatim
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt


class StolenLaptopDetailsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        stolen_laptops = StolenLaptopDetails.objects.all()
        serializer = StolenLaptopDetailsSerializer(stolen_laptops, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Add user information to the request data
        request_data = request.data.copy()
        request_data['user'] = request.user.id  # Assign the logged-in user's ID to the user field

        serializer = StolenLaptopDetailsSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
#

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
User = get_user_model()




@method_decorator(csrf_exempt, name='dispatch')
class UpdateStolenLaptopDetails(View):
   
    async def process_packet(self, pcap_file_path, mac_address):
        ipv4_address = None
        cap = pyshark.FileCapture(pcap_file_path)
        for pkt in cap:
            if "eth" in pkt and pkt["eth"].src_resolved == mac_address:
                ipv4_address = pkt.ip.src
                break
        cap.close()
        return ipv4_address
    
    async def post(self, request):
        try:
            id = request.data.get('id')
            mac_address = request.data.get('mac_address')
            pcap_file_path = "C:\Major Projct\wrccdc-mss-msctrl-cap.pcap"
            
            ipv4_address = await self.process_packet(pcap_file_path, mac_address)
            
            if ipv4_address:
                res = DbIpCity.get(ipv4_address, api_key="free")
                lat, lon = res.latitude, res.longitude
                geolocator = Nominatim(user_agent="my_app")
                location = geolocator.reverse(f"{lat}, {lon}")
                
                stolen_laptop = get_object_or_404(StolenLaptopDetails, id=id)
                
                if stolen_laptop.mac_address == mac_address:
                    stolen_laptop.ipv4 = ipv4_address
                    stolen_laptop.location = location.address
                    stolen_laptop.save()
                    
                    return JsonResponse({
                        "id": stolen_laptop.id,
                        "ipv4": ipv4_address,
                        "location": location.address
                    }, status=status.HTTP_200_OK)
                else:
                    return JsonResponse({"message": "MAC address does not match the provided id"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return JsonResponse({"message": "IPv4 address not found for the provided MAC address"}, status=status.HTTP_404_NOT_FOUND)
        except StolenLaptopDetails.DoesNotExist:
            return JsonResponse({"message": "Stolen laptop details not found for the provided id"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)