import os, requests, time

# Configs sensíveis
DOMAIN = "unicaclubcg.site"
VPS_IP = "31.97.30.237"
CLOUDFLARE_TOKEN = "xy6O-UqBCdmPfDGYVv_zD0ct61i1CzWM8z4XqS-z"
CF_ACCOUNT_ID = "17f2a8f2ad996cca89eb9d084443f829"
CF_ZONE_ID = "bcc28545574ccfee28f52946300233f8"

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

def listar_servicos():
    # Lista todos diretórios de primeiro nível como novos serviços
    ignore = ['.git', 'docs', 'scripts', '__pycache__']
    return [d for d in os.listdir(ROOT_DIR) if os.path.isdir(os.path.join(ROOT_DIR, d)) and d not in ignore]

def criar_dns_cf(sub, ip):
    url = f"https://api.cloudflare.com/client/v4/zones/{CF_ZONE_ID}/dns_records"
    headers = {
        "Authorization": f"Bearer {CLOUDFLARE_TOKEN}",
        "Content-Type": "application/json"
    }
    data = {
        "type": "A",
        "name": f"{sub}.{DOMAIN}",
        "content": ip,
        "ttl": 120,
        "proxied": True
    }
    # Checa se já existe
    r = requests.get(url, headers=headers, params={"name": f"{sub}.{DOMAIN}"})
    if r.json().get("result"):
        # Update
        rec_id = r.json()["result"][0]["id"]
        resp = requests.put(f"{url}/{rec_id}", headers=headers, json=data)
    else:
        # Create
        resp = requests.post(url, headers=headers, json=data)
    return resp.status_code, resp.text

def update_nginx_conf(sub):
    nginx_path = "/etc/nginx/conf.d"
    conf_file = f"{nginx_path}/{sub}.{DOMAIN}.conf"
    conf = f'''
server {{
    listen 80;
    server_name {sub}.{DOMAIN};
    location / {{
        proxy_pass http://{VPS_IP}:5{str(hash(sub))[-3:]};  # Exemplo de porta dinâmica
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }}
}}
'''
    with open(conf_file, 'w') as f:
        f.write(conf)
    os.system('nginx -s reload')

def main():
    servicos = listar_servicos()
    for s in servicos:
        status, resp = criar_dns_cf(s, VPS_IP)
        print(f"[DNS] {s}.{DOMAIN} => {VPS_IP}: {status} - {resp}")
        update_nginx_conf(s)
        print(f"[NGINX] Configurado {s}.{DOMAIN}")
        # Você pode expandir para automatizar VPN, logs, etc.

if __name__ == "__main__":
    main()
