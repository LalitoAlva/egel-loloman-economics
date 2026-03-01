import urllib.request
import re
import json

topics = [
    "van tir",
    "acciones bonos",
    "apalancamiento financiero",
    "razones financieras dupont",
    "inflación pib",
    "multiplicador keynesiano",
    "elasticidad demanda",
    "costo marginal",
    "veblen giffen",
    "is lm macroeconomia",
    "tipo de cambio ventaja",
    "depreciacion contabilidad",
    "punto de equilibrio"
]

results = {}

for topic in topics:
    query = urllib.parse.quote(f"Economía para Dummies {topic}")
    url = f"https://www.youtube.com/results?search_query={query}"
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        video_ids = re.findall(r"watch\?v=(\S{11})", html)
        if video_ids:
            results[topic] = f"https://www.youtube.com/watch?v={video_ids[0]}"
    except Exception as e:
        print(f"Failed {topic}: {e}")

print(json.dumps(results, indent=2))
