import subprocess
from ip2geotools.databases.noncommercial import DbIpCity
from geopy.geocoders import Nominatim
import os
import asyncio
import time

async def tshark_process_file(filepath, my_mac_address):
    tshark_command = [
        "C:\\Program Files\\Wireshark\\tshark.exe",
        "-r",
        filepath,
        "-Y",
        f"eth.src == {my_mac_address}",
        "-T",
        "fields",
        "-e",
        "ip.src",
    ]

    try:
        process = await asyncio.create_subprocess_exec(
            *tshark_command,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            text=True
        )

        ip_addresses = []
        async for line in process.stdout:
            ip_addresses.append(line.strip())

        if ip_addresses:
            results = []
            for ip_address in ip_addresses:
                try:
                    res = DbIpCity.get(ip_address, api_key="free")
                    print("Found")
                    print(res.ip_address)
                    lat = res.latitude
                    lon = res.longitude
                    geolocator = Nominatim(user_agent="my_app")
                    location = await asyncio.to_thread(geolocator.reverse, f"{lat}, {lon}")
                    print(location.address)
                    results.append({
                        'mac_address': my_mac_address,
                        'ip_address': ip_address,
                        'location': location.address
                    })
                except Exception as e:
                    print(f"Error processing IP {ip_address}: {e}")

            return results

    except Exception as e:
        print(f"An error occurred while processing file {filepath}: {e}")

    return []

async def search_mac_address_location(mac_address, timeout=300):
    path = "C:\Major Project"
    start_time = time.time()

    results = []
    for root, dirs, files in os.walk(path):
        for pcap_file in files:
            if pcap_file.endswith(".pcap"):
                print("processing file", pcap_file)
                filepath = os.path.join(root, pcap_file)
                file_results = await tshark_process_file(filepath, mac_address)
                results.extend(file_results)

                # Check timeout
                if time.time() - start_time > timeout:
                    break

        # Check timeout
        if time.time() - start_time > timeout:
            break

    if results:
        print("MAC address found!")
        return results
    else:
        print("MAC address not found in any PCAP files")
        return {'error': 'MAC address not found in any PCAP files'}

# Indicator
print("Search completed.")
