import time, requests
while True:
    r = requests.get("http://painel_backend:8000/api/mensagens")
    for msg in r.json():
        print("📩 Mensagem recebida:", msg)
    time.sleep(5)
