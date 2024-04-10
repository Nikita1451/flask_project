import time

import serial
import requests
i = 0
with open('uic.txt', "w") as f:
    f.write("")

for i in range(10):
    try:
        # Установка параметров COM-порта
        port = f'COM{i}'  # Укажите нужный COM-порт
        baudrate = 9600  # Укажите нужную скорость передачи данных

        # Инициализация COM-порта
        ser = serial.Serial(port, baudrate)

        # Чтение данных из COM-порта
        while True:
            if ser.in_waiting > 0:
                print("connected")
                data = ser.readline().decode('utf-8').rstrip()
                if "ID" in data:
                    print(f'Принято: {data}')
                    data = data.replace(" ", '').split(":")
                    print(data)  # Закрытие COM-порта
                    with open("uic.txt", 'w') as file:
                        if len(data) >= 2:
                            req = requests.get(f"http://192.168.43.145:5000/poster/{data[1]}").json()
                            if req:
                                file.write(data[1])
                            else:
                                file.write("No reqistred")
                        else:
                            file.write("None")
                else:
                    i += 1
                    break
        ser.close()
    except Exception as f:
        i += 1
        print(f)
print("Error - Not COM-ports")
