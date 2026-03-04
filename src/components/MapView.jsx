import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ mapRef, darkMode, loading }) {
  // 1. Inicialización del mapa
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([-12.11, -77.03], 13);
    }

    // Limpieza al desmontar
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapRef]);

  // 2. Cambio de Tiles (Fondo del mapa)
  useEffect(() => {
    const currentMap = mapRef.current;
    if (!currentMap) return;

    const tileUrl = darkMode
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

    currentMap.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        currentMap.removeLayer(layer);
      }
    });

    L.tileLayer(tileUrl, {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    }).addTo(currentMap);
  }, [darkMode, mapRef]);

  // 3. RETORNO ÚNICO
  return (
    <div className="relative w-full">
      {/* SPINNER OVERLAY */}
      {loading && (
        <div className="absolute inset-0 z-[1001] flex items-center justify-center bg-slate-900/40 rounded-xl backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white font-bold drop-shadow-md">Localizando colegios...</span>
          </div>
        </div>
      )}

      {/* CONTENEDOR DEL MAPA */}
      <div 
        id="map" 
        className="h-[500px] w-full rounded-xl shadow-lg border-4 border-white dark:border-slate-700 transition-colors duration-300 z-0"
      />
    </div>
  );
}