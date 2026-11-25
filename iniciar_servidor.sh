#!/usr/bin/env bash
IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "localhost")
PORT=8080

echo "=========================================================="
echo "  🚀 INICIANDO DASHBOARD PARA TU IPAD MINI 2"
echo "=========================================================="
echo ""
echo "  1. Asegúrate de que tu iPad y este Mac estén en la misma red Wi-Fi."
echo "  2. Abre Safari en tu iPad Mini 2 e ingresa:"
echo ""
echo "     👉  http://$IP:$PORT"
echo ""
echo "  3. En Safari del iPad, toca el botón Compartir (cuadrado con flecha hacia arriba)"
echo "     y selecciona: 'Agregar a pantalla de inicio'."
echo "=========================================================="
echo ""
echo "Servidor corriendo... Presiona Ctrl + C para detenerlo."
python3 -m http.server $PORT
