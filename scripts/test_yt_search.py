import urllib.request
import urllib.parse
import re

def search_yt(query):
    safe_query = urllib.parse.quote(query)
    # Remove the sp filter to see if it works
    url = f"https://www.youtube.com/results?search_query={safe_query}"
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # Print a snippet to debug
        # Write to file to inspect
        with open("yt_debug.html", "w") as f:
            f.write(html)
            
        match = re.search(r'"videoId":"([^"]{11})"', html)
        if match:
            return match.group(1)
        
        # Second attempt: check for watch?v=
        match2 = re.search(r'/watch\?v=([^"&\\]{11})', html)
        if match2:
            return match2.group(1)
            
    except Exception as e:
        print(f"Error: {e}")
    return None

print("Test :", search_yt("@economiaparadummies3743 Funciones de Producción"))
