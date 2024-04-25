import os
import pyshark
from ip2geotools.databases.noncommercial import DbIpCity
from geopy.geocoders import Nominatim
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class SearchLocationByMac(APIView):
    def get(self, request):
        mac_address = request.query_params.get('mac_address')
        folder_path = '/path/to/pcap/files/'

        ip_address = None
        for root, dirs, files in os.walk(folder_path):
            for pcap_file in files:
                if pcap_file.endswith(".pcap"):
                    pcap_file_path = os.path.join(root, pcap_file)
                    cap = pyshark.FileCapture(pcap_file_path)
                    for pkt in cap:
                        if "eth" in pkt and pkt["eth"].src_resolved.lower() == mac_address.lower():
                            ip_address = pkt.ip.src
                            break
                    cap.close()
                    if ip_address:
                        break

        if ip_address:
            try:
                res = DbIpCity.get(ip_address, api_key="free")
                lat, lon = res.latitude, res.longitude
                geolocator = Nominatim(user_agent="my_app")
                location = geolocator.reverse(f"{lat}, {lon}")
                return Response({
                    "ip_address": ip_address,
                    "location": location.address
                }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"message": "MAC address not found in any PCAP file"}, status=status.HTTP_404_NOT_FOUND)
