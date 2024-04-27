from rest_framework import status
import os
import nest_asyncio
from asgiref.sync import sync_to_async
from django.core.mail import send_mail
from django.conf import settings
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
from django.http import JsonResponse, HttpResponseBadRequest
from twilio.rest import Client
import json
import subprocess
import time
import requests
from django.shortcuts import get_object_or_404


API_KEY = '99b41e1dfa0b482193afe53016477721'
access_token = 'pk.eyJ1IjoiamFubmF0c2s0NCIsImEiOiJjbHY1ODdtbjUwMDd4Mm1vYnFtMndwc25kIn0.UJhfUVw-YPS6cPYoB7hXZQ'

class StolenLaptopDetailsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        stolen_laptops = StolenLaptopDetails.objects.all()
        serializer = StolenLaptopDetailsSerializer(stolen_laptops, many=True)
        print(f"path: {settings.BASE_DIR}")
        return Response(serializer.data)

    def post(self, request):
        request_data = request.data.copy()
        request_data['user'] = request.user.id  

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

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.1.2222.33 Safari/537.36",
    "Accept-Encoding": "*",
    "Connection": "keep-alive"
})

User = get_user_model()
nest_asyncio.apply()  

class SearchView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            user_email = request.user.email 
            data = json.loads(request.body)
            id = data.get('id')
            mac_address = data.get('mac_address')

            if not id or not mac_address:
                return JsonResponse({"error": "Both id and MAC address are required."}, status=400)
                
            path = f"{settings.BASE_DIR}\pcap_files"  
            mac_address_found = False
            result = {}

            print("Searching for MAC address:", mac_address)  

            for root, dirs, files in os.walk(path):
                if mac_address_found:
                    break

                for pcap_file in files:
                    if pcap_file.endswith(".pcap"):
                        filepath = os.path.join(root, pcap_file)
                        print(f"Searching in file: {filepath}")  

                        tshark_command = [
                            rf"{settings.BASE_DIR}\pcap_files\Wireshark\tshark.exe",  
                            "-r", filepath,
                            "-Y", f"eth.src == {mac_address}",
                            "-T", "fields",
                            "-e", "ip.src",
                        ]

                        print("Executing tshark command:", " ".join(tshark_command))  

                        tshark_process = subprocess.Popen(
                            tshark_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
                        )

                        print("tshark_process:", " ",tshark_process)  

                        for line in tshark_process.stdout:
                            print("tshark output:", line.strip())  
                            
                            ip_address = line.strip()
                            
                            res = session.get(f'https://api.ipgeolocation.io/ipgeo?apiKey={API_KEY}&ip={ip_address}')
                            data = res.json()
                            print(data)
                            lat = data.get('latitude', '')
                            lon = data.get('longitude', '')
                            print("lat:",lat)
                            print("lon:",lon)

                            res_location = session.get(f'https://api.mapbox.com/search/geocode/v6/reverse?longitude={lon}&latitude={lat}&access_token={access_token}')
                            data = res_location.json()
                            location = data['features'][0]['properties']['full_address']

                            print(location)
                            mac_address_found = True  

                            result = {
                                "mac_address": mac_address,
                                "ip_address": ip_address,
                                "location": location
                            }
                            print('Sending email')
                            
                            send_mail(
                                'Laptop Found',
                                f'Your Laptop is found at {location}',
                                settings.EMAIL_HOST_USER,
                                [user_email],
                                fail_silently=False,
                            )

                            print('Saving Details to database')
                            # Save to StolenLaptopDetails model
                            try:
                                stolen_laptop = StolenLaptopDetails.objects.get(id=id)
                                stolen_laptop.mac_address = mac_address
                                stolen_laptop.ipv4 = ip_address
                                stolen_laptop.location = location
                                stolen_laptop.status = True
                                contact = stolen_laptop.contact_no
                                stolen_laptop.save()
                               
                                print('Sending SMS')

                                message = session.post(
                                    f'https://api.twilio.com/2010-04-01/Accounts/{settings.TWILIO_ACCOUNT_SID}/Messages.json',
                                    data={
                                        'Body': f'Your Laptop is found at {location}',
                                        'From': settings.TWILIO_PHONE_NUMBER,
                                        'To': f'+91{contact}'
                                    },
                                    auth=(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
                                )
                                print(message.json())

                                print('SMS Sent')

                            except StolenLaptopDetails.DoesNotExist:
                                return JsonResponse({"error": "Invalid id."}, status=400)        
                            break

                        tshark_process.terminate()
                        print('tshark terminated')

            if not mac_address_found:
                print("MAC address not found")  
                return JsonResponse({"error": "MAC address not found"}, status=404)
                
            return JsonResponse(result)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data in request body."}, status=400)

    def get(self, request, *args, **kwargs):
        return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)
    

class ContactUsListCreate(generics.ListCreateAPIView):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer



class MakeSuperuserAPIView(APIView):
    def post(self, request):
        if not request.user.is_superuser:
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        
        email = request.data.get('email')

        user = get_object_or_404(User, email=email)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return Response({"message": f"{email} is now an Admin"}, status=status.HTTP_200_OK)
    
@csrf_exempt
def upload_pcap_files(request):
    try:
        if request.method == 'POST' and request.FILES.getlist('pcap_files'):
            pcap_files = request.FILES.getlist('pcap_files')
            uploaded_files = []
            upload_dir = f'{settings.BASE_DIR}/pcap_files/'
            os.makedirs(upload_dir, exist_ok=True)

            for pcap_file in pcap_files:
                file_path = os.path.join(upload_dir, pcap_file.name)
                if os.path.exists(file_path):
                    os.remove(file_path)
                with open(file_path, 'wb+') as destination:
                    for chunk in pcap_file.chunks():
                        destination.write(chunk)
                uploaded_files.append(pcap_file.name)

            return JsonResponse({'uploaded_files': uploaded_files})
        else:
            return JsonResponse({'error': 'No files uploaded'}, status=400)
    except Exception as e:
        # Log the error for debugging purposes
        print(f"Error occurred during file upload: {str(e)}")
        return JsonResponse({'error': 'An error occurred during file upload'}, status=500)