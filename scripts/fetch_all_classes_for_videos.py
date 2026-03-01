import urllib.request
import json
import os

supabase_url = 'https://xutsiuyihbufpnvhhccs.supabase.co/rest/v1'
# Fetch key from .env or just use the one we saw before
supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dHNpdXlpaGJ1ZnBudmhoY2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTcwOTUsImV4cCI6MjA4NTUzMzA5NX0.v31871_4RQKZGLSZOEQlR6n57nsxTsc_aP6D45CLwng'

headers = {
    'apikey': supabase_key,
    'Authorization': f'Bearer {supabase_key}',
    'Content-Type': 'application/json'
}

def request_supabase(endpoint):
    url = f"{supabase_url}/{endpoint}"
    req = urllib.request.Request(url, headers=headers)
    try:
        response = urllib.request.urlopen(req)
        return json.loads(response.read().decode('utf-8'))
    except Exception as e:
        print(f"Error: {e}")
        return None

def main():
    modulos = request_supabase('modulos?order=numero.asc')
    clases = request_supabase('contenido_clase?order=orden.asc')
    
    if not modulos or not clases:
        return
        
    for m in modulos:
        print(f"\n[{m['numero']}] Módulo: {m['titulo']}")
        m_clases = [c for c in clases if c['modulo_id'] == m['id']]
        for c in m_clases:
            print(f"  - {c['titulo']}")

if __name__ == '__main__':
    main()
