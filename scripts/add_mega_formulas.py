import urllib.request
import json
import os

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
    except urllib.error.HTTPError as e:
        print(f"Error: {e.read().decode()}")
        return None

def main():
    # 1. Get the Formulas Module ID
    modulos = request_supabase('modulos?slug=eq.formulas-y-tips')
    if not modulos:
        print("Modulo de formulas no encontrado!")
        return
    modulo_id = modulos[0]['id']
    
    # 2. Delete existing formula lessons to replace them with the mega-list
    request_supabase(f'contenido_clase?modulo_id=eq.{modulo_id}', method='DELETE')

    mega_formulas = [
        {
            "modulo_id": modulo_id,
            "tipo": "teoria",
            "orden": 1,
            "titulo": "Microeconomía: Demanda, Oferta y Elasticidades",
            "contenido": "### Demanda y Oferta\n* **Función Inversa de Demanda**: `P = a - b * Qd`\n* **Función Inversa de Oferta**: `P = c + d * Qs`\n* **Punto de Equilibrio de Mercado**: `Qd = Qs` (o `Pd = Ps`)\n\n### Elasticidades\n* **Elasticidad Precio Demanda (Ep)**: `Ep = (Δ%Q) / (Δ%P) = ( (Q2-Q1)/Q1 ) / ( (P2-P1)/P1 )`\n* **Elasticidad Punto (Derivada)**: `Ep = (dQ/dP) * (P/Q)`\n* **Elasticidad Cruzada (Exy)**: `Exy = (Δ%Qx) / (Δ%Py)`. *(Si Exy > 0 son sustitutos. Si Exy < 0 son complementarios)*\n* **Elasticidad Ingreso (Ei)**: `Ei = (Δ%Q) / (Δ%I)`. *(Si Ei < 0 Bien Inferior; 0<Ei<1 Bien Normal Necesario; Ei>1 Bien Lujo)*\n\n> *(Hack)* Si la elasticidad precio |Ep| > 1, conviene bajar el precio para aumentar el ingreso total.\n\n---MEDIA---\n{}"
        },
        {
            "modulo_id": modulo_id,
            "tipo": "teoria",
            "orden": 2,
            "titulo": "Microeconomía: Producción y Costos",
            "contenido": "### Producción\n* **Producto Medio (PMe)**: `PMe = Q / L` (Producción total / Nivel de trabajo)\n* **Producto Marginal (PMg)**: `PMg = ΔQ / ΔL` o `dQ/dL`\n\n### Costos de Corto Plazo\n* **Costo Total (CT)**: `CT = CF + CV` (Costo Fijo + Costo Variable)\n* **Costo Medio (CMe)**: `CMe = CT / Q`\n* **Costo Variable Medio (CVMe)**: `CVMe = CV / Q`\n* **Costo Fijo Medio (CFMe)**: `CFMe = CF / Q`\n* **Costo Marginal (CMg)**: `CMg = ΔCT / ΔQ` o `d(CT)/dQ`\n\n### Maximización de Beneficios\n* **Ingreso Total (IT)**: `IT = P * Q`\n* **Ingreso Marginal (IMg)**: `IMg = ΔIT / ΔQ`\n* **Regla de Oro (Maximización)**: `IMg = CMg`\n* *(En Competencia Perfecta)*: `P = CMg`\n\n> *(Hack)* El Costo Marginal cruza al Costo Medio y Costo Variable Medio exactamente en sus puntos mínimos.\n\n---MEDIA---\n{}"
        },
        {
            "modulo_id": modulo_id,
            "tipo": "teoria",
            "orden": 3,
            "titulo": "Macroeconomía: Contabilidad Nacional y PIB",
            "contenido": "### Producto Interno Bruto (PIB)\n* **PIB (Enfoque Gasto / Demanda Agregada)**: `PIB = C + I + G + (X - M)`\n  *(Consumo + Inversión + Gasto Público + Exportaciones Netas)*\n* **PIB (Enfoque Ingreso)**: `PIB = Salarios + Rentas + Intereses + Beneficios + Impuestos indirectos - Subvenciones + Depreciación`\n* **PIN (Producto Interno Neto)**: `PIN = PIB - Depreciación`\n\n### Inflación y Crecimiento\n* **Deflactor del PIB**: `Deflactor = (PIB Nominal / PIB Real) * 100`\n* **Tasa de Inflación**: `π = [ (INPC_t - INPC_t-1) / INPC_t-1 ] * 100`\n* **Tasa de Crecimiento Económico**: `g = [ (PIB_Real_t - PIB_Real_t-1) / PIB_Real_t-1 ] * 100`\n* **Tasa de Desempleo**: `(Desempleados / PEA) * 100`\n\n> *(Hack)* PIB Nominal mide a precios corrientes (inflados). PIB Real mide a precios constantes (año base). El PIB Real es el único que indica crecimiento verdadero.\n\n---MEDIA---\n{}"
        },
        {
            "modulo_id": modulo_id,
            "tipo": "teoria",
            "orden": 4,
            "titulo": "Macroeconomía: Modelo IS-LM y Multiplicadores",
            "contenido": "### Multiplicadores Keynesianos\n* **Regla Básica (Propensión)**: `Pensión Marginal a Consumir (c) + Propensión Marginal a Ahorrar (s) = 1`\n* **Multiplicador del Gasto Simple (k)**: `k = 1 / (1 - c)` o `k = 1 / s`\n* **Multiplicador con Impuestos (t)**: `k = 1 / [1 - c(1 - t)]`\n* **Efecto de un cambio en Gasto Público**: `ΔY = k * ΔG`\n\n### Modelo IS-LM\n* **Ecuación IS (Mercado de Bienes)**: `Y = C_autonomo + c(Y-T) + I_autonoma - b*i + G`\n* **Ecuación LM (Mercado de Dinero)**: `M/P = k*Y - h*i`\n* **Oferta Monetaria (M)**: `M = Efectivo + Depósitos` o `M = Multiplicador Monetario * Base Monetaria`\n* **Multiplicador Monetario (m)**: `m = (e + 1) / (e + r)` *(e = coef. efectivo; r = coef. reservas/encaje)*\n* **Ecuación Cuantitativa del Dinero**: `M * V = P * Y`\n\n> *(Hack)* Para sacar de recesión al país: Aumenta G (desplaza IS derecha) o Aumenta M (desplaza LM derecha).\n\n---MEDIA---\n{}"
        },
        {
            "modulo_id": modulo_id,
            "tipo": "teoria",
            "orden": 5,
            "titulo": "Finanzas: Evaluación de Proyectos (Matemáticas Financieras)",
            "contenido": "### Valor del Dinero en el Tiempo\n* **Interés Simple**: `VF = VA * (1 + r * n)`\n* **Interés Compuesto**: `VF = VA * (1 + r)^n`\n* **Valor Actual (VA / VP)**: `VA = VF / (1 + r)^n`\n\n### Criterios de Inversión\n* **VAN (Valor Actual Neto)**: `VAN = -Inversión Inicial + Σ [ Flujo_t / (1+r)^t ]`\n  *(Si VAN > 0, SE ACEPTA el proyecto)*\n* **TIR (Tasa Interna de Retorno)**: Es la tasa `r` que hace que el `VAN = 0`.\n  *(Si TIR > Costo de Capital/WACC, SE ACEPTA)*\n* **Índice de Rentabilidad (IR)**: `IR = VA de Flujos / Inversión Inicial` *(Si IR > 1, se acepta)*\n\n### Bonos y Acciones\n* **Precio de un Bono**: `P = Σ [ Cupón / (1+r)^t ] + [ ValorNominal / (1+r)^n ]`\n* **Gordon-Shapiro (Precio Acción Dividendo Creciente)**: `P = D1 / (r - g)`\n  *(D1 = Div. próximo año; r = ret. exigido; g = crec. constante)*\n* **CAPM (Costo de Capital Propio)**: `Ke = Rf + Beta * (Rm - Rf)`\n* **WACC (Costo Promedio Ponderado de Capital)**: `WACC = Kd * (1 - T) * (D/V) + Ke * (E/V)`\n\n> *(Hack)* Si dos proyectos son mutuamente excluyentes, ¡SIEMPRE se elige el del mayor VAN, sin importar si el otro tiene mayor TIR!\n\n---MEDIA---\n{}"
        },
        {
            "modulo_id": modulo_id,
            "tipo": "teoria",
            "orden": 6,
            "titulo": "Contabilidad y Análisis Financiero",
            "contenido": "### Ecuación Contable Básica\n* **Partida Doble**: `Activo = Pasivo + Capital Contable`\n* **Capital de Trabajo Neto**: `CTN = Activo Circulante - Pasivo Circulante`\n* **Flujo de Efectivo Operativo**: `FEO = Utilidad Neta + Depreciación`\n\n### Depreciación y Punto de Equilibrio\n* **Punto de Equilibrio en Unidades (Pe_u)**: `Pe_u = Costos Fijos / (Precio - Costo Variable Unitario)`\n* **Punto de Equilibrio en Efectivo (Pe_$)**: `Pe_$ = Pe_u * Precio`\n* **Margen de Contribución Unitario**: `Precio - CVU`\n* **Depreciación Línea Recta**: `D = (Costo de Adquisición - Valor de Salvamento) / Vida Útil`\n\n### Razones Financieras Clave\n* **Prueba Ácida (Liquidez severa)**: `(Activo Circulante - Inventarios) / Pasivo Circulante`\n* **ROE (Retorno sobre Capital)**: `Utilidad Neta / Capital Contable`\n* **ROA (Retorno sobre Activos)**: `Utilidad Neta / Activos Totales`\n* **Sistema DuPont**: `ROE = (Margen Neto) * (Rotación de Activos) * (Multiplicador de Capital)`\n  *Margen = (Utilidad Neta/Ventas); Rotación = (Ventas/Activos); Multiplicador = (Activos/Capital)*\n\n> *(Hack)* Si la rotación de inventarios cae dramáticamente, puede que estés pasando mercancía obsoleta sin rebajar.\n\n---MEDIA---\n{}"
        }
    ]

    print("Insertando mega lista de formulas...")
    inserted = request_supabase('contenido_clase', method='POST', data=mega_formulas)
    if inserted:
        print("Insertados exitosamente.")
    else:
        print("Problema al insertar las nuevas formulas.")

if __name__ == '__main__':
    main()
