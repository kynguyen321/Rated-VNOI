import os
import time
import requests

xx = 211938
folder_path = "bailam"

if not os.path.exists(folder_path):
    os.makedirs(folder_path)

def check_and_download_file():
    global xx  
    while True:
        url = f"https://hpcode.edu.vn/static/chambai/tmp/{xx}.cpp" 
        response = requests.get(url)
        
        if response.status_code == 200:
            file_path = os.path.join(folder_path, f"{xx}.cpp")
            with open(file_path, 'wb') as f:
                f.write(response.content)
            print(f"{xx}nd .cpp assignment success.")
            
            xx += 1  
        else:
            time.sleep(1)  
            
check_and_download_file()

