# Smart Wall Dashboard · iPad Mini 2
### Pantalla Inteligente para Temuco, Chile (Música, Reloj, Clima y Hogar)

Este proyecto convierte tu **iPad Mini 2** en una pantalla de pared moderna con:
- **Reloj digital & Fecha en tiempo real** (con saludo dinámico).
- **Clima de Temuco, Chile** (temperatura, sensación térmica, humedad, viento y pronóstico de 3 días vía Open-Meteo).
- **Apple Music & Audio Bluetooth** (acceso directo a la app nativa y sonidos ambientales).
- **Control de Hogar Inteligente** (botones interactivos listos para vincular luces y enchufes).

---

## 🚀 Cómo probarlo en tu iPad Mini 2 ahora mismo

### Paso 1: Iniciar el servidor en tu Mac
Abre una terminal en esta carpeta y ejecuta:
```bash
./iniciar_servidor.sh
```
O simplemente:
```bash
python3 -m http.server 8080
```

### Paso 2: Abrir en el iPad
1. Asegúrate de que el iPad y tu Mac estén conectados al **mismo Wi-Fi**.
2. Abre **Safari** en el iPad Mini 2 e ingresa:
   ```
   http://TU_IP_LOCAL:8080
   ```
   *(El script `iniciar_servidor.sh` te mostrará tu dirección IP exacta en pantalla, por ejemplo: `http://192.168.1.85:8080`)*

### Paso 3: Dejarlo en Pantalla Completa (Estilo App)
1. En Safari, toca el botón **Compartir** (icono de cuadrado con flecha hacia arriba).
2. Toca **"Agregar a pantalla de inicio"**.
3. Se creará un icono llamado **Smart Wall**. Ábrelo desde ahí: **se abrirá a pantalla completa sin barra de direcciones**.

---

## 🌐 Opción 2: Dejarlo en la nube gratis (Sin depender de tu Mac encendido)

Si quieres que el iPad funcione las 24 horas sin necesidad de que tu Mac esté encendido, puedes subir estos 3 archivos (`index.html`, `style.css`, `app.js`, `icon.svg`) a cualquier servicio gratuito:
- **GitHub Pages** (gratis y para siempre).
- **Vercel** o **Netlify** (arrastras la carpeta y te da un enlace tipo `https://tu-dashboard.vercel.app`).
Así en tu iPad solo abres ese enlace web público y listo.
