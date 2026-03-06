# 🗺️ School Finder Pro

**School Finder** School Finder Pro es una aplicación web moderna desarrollada con React que permite localizar instituciones educativas cercanas utilizando geolocalización en tiempo real. La aplicación muestra resultados en un mapa interactivo y permite obtener rutas exactas hacia cada institución mediante Google Maps.

---

## ✨ Características Principales

📍 **Geolocalización en Tiempo Real**  
La aplicación obtiene la ubicación exacta del usuario mediante el GPS del navegador.

🗺 **Mapa Interactivo**  
Visualización de resultados utilizando OpenStreetMap y Leaflet.

🔎 **Búsqueda por Radio Personalizable**  
Permite buscar colegios cercanos dentro de un rango configurable.

📏 **Cálculo de Distancia**  
Se calcula automáticamente la distancia entre el usuario y cada institución encontrada.

🚗 **Rutas Exactas con Google Maps**  
Cada resultado permite abrir Google Maps con navegación desde la ubicación real del usuario.

🌓 **Modo Oscuro Integrado**  
Interfaz adaptable con persistencia en `localStorage`.

📱 **Diseño Responsive**  
Optimizado para computadoras, tablets y dispositivos móviles.

⚡ **Animaciones Modernas**  
Transiciones suaves y estados de carga utilizando Framer Motion.

---

## 🛠️ Tecnologías Utilizadas

**Frontend**
- React
- Vite

**Estilos**
- Tailwind CSS

**Mapas**
- Leaflet
- OpenStreetMap

**Geolocalización**
- Web Geolocation API

**Animaciones**
- Framer Motion

**Servicios externos**
- Overpass API (OpenStreetMap)
- Google Maps Directions

---

## 📦 Instalación y Configuración

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/jcast2023/school-finder.git
    ```
2.  **Instalar dependencias**:
    ```bash
    npm install
    ```
3.  **Ejecutar en modo desarrollo**:
    ```bash
    npm run dev
    ```
    
🚀 Deploy

La aplicación puede desplegarse fácilmente en:

Vercel

Netlify

GitHub Pages

Este proyecto está optimizado para despliegue automático con Vercel conectado al repositorio de GitHub.

📌 Funcionamiento

El usuario permite acceso a su ubicación.

La aplicación obtiene la posición GPS.

Se realiza una consulta a OpenStreetMap (Overpass API).

Se muestran las instituciones cercanas en el mapa.

El usuario puede abrir Google Maps para obtener la ruta exacta.

👨‍💻 Autor

Proyecto desarrollado por Julio Castillo como parte de un proyecto de desarrollo web con React.
