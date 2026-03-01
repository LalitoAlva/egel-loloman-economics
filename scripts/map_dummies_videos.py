import urllib.request
import urllib.parse
import json
import re
import time

supabase_url = 'https://xutsiuyihbufpnvhhccs.supabase.co/rest/v1'
supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dHNpdXlpaGJ1ZnBudmhoY2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTcwOTUsImV4cCI6MjA4NTUzMzA5NX0.v31871_4RQKZGLSZOEQlR6n57nsxTsc_aP6D45CLwng'

headers = {
    'apikey': supabase_key,
    'Authorization': f'Bearer {supabase_key}',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

def request_supabase(endpoint, method='GET', data=None):
    url = f"{supabase_url}/{endpoint}"
    req = urllib.request.Request(url, headers=headers, method=method)
    if data:
        req.data = json.dumps(data).encode('utf-8')
    try:
        response = urllib.request.urlopen(req)
        return json.loads(response.read().decode('utf-8'))
    except Exception as e:
        print(f"Error Supabase: {e}")
        return None

def search_yt(query):
    safe_query = urllib.parse.quote(query)
    url = f"https://www.youtube.com/results?search_query={safe_query}"
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'"videoId":"([^"]{11})"', html)
        if match:
            return f"https://www.youtube.com/watch?v={match.group(1)}"
    except Exception as e:
        print(f"Error YouTube: {e}")
    return None

def extract_media(contenido):
    if not contenido:
        return contenido, {}
    parts = contenido.split('\n\n---MEDIA---\n')
    text_part = parts[0]
    media_part = {}
    if len(parts) > 1:
        try:
            media_part = json.loads(parts[1])
        except:
            pass
    return text_part, media_part

def pack_media(text, media):
    if not media:
        return text
    return f"{text}\n\n---MEDIA---\n{json.dumps(media, ensure_ascii=False)}"

def is_valid_topic(title):
    tb = title.lower()
    if 'sección' in tb or 'modulo' in tb or 'resumen ejecutivo' in tb or 'tabla de fórmulas' in tb or 'descriptores' in tb or 'diagnóstica' in tb or 'ortografía' in tb or 'comprensión' in tb:
        return False
    return True

def main():
    clases = request_supabase('contenido_clase')
    if not clases:
        return
        
    print(f"Loaded {len(clases)} clases. Starting video mapping...")
    
    updates = 0
    for cls in clases:
        title = cls.get('titulo', '')
        if not is_valid_topic(title):
            continue
            
        print(f"\nProcessing: {title}")
        
        query = f"@economiaparadummies3743 {title}" 
        video_url = search_yt(query)
        
        if not video_url:
            print("  -> No video found.")
            continue
            
        print(f"  -> Found Video: {video_url}")
        
        contenido = cls.get('contenido', '')
        text_part, media_part = extract_media(contenido)
        
        media_part['videos'] = [video_url]
        new_contenido = pack_media(text_part, media_part)
        
        if new_contenido != contenido:
            endpoint = f"contenido_clase?id=eq.{cls['id']}"
            res = request_supabase(endpoint, method='PATCH', data={"contenido": new_contenido})
            if res is not None:
                updates += 1
                print("  -> Updated DB!")
                
        time.sleep(1) # Prevent rate limits
        
    print(f"\nFinished! Updated {updates} classes with new videos.")

if __name__ == '__main__':
    main()
