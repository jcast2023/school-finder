import { useRef, useState, useEffect } from "react";
import L from "leaflet";

import MapView from "./components/MapView";
import SearchControls from "./components/SearchControls";
import ResultsList from "./components/ResultsList";
import usePlaceSearch from "./hooks/usePlaceSearch";

function App() {
  const mapRef = useRef(null);
  const [radius, setRadius] = useState(3000);

  // 🔥 Inicializa leyendo localStorage correctamente
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 🔥 Este effect es el único que controla la clase
  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  const {
    places,
    loading,
    hasSearched,
    searchPlaces,
  } = usePlaceSearch("school");

  const clearMap = () => {
    if (!mapRef.current) return;

    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Circle) {
        mapRef.current.removeLayer(layer);
      }
    });
  };
console.log("DarkMode:", darkMode);
useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      if (mapRef.current) {
        mapRef.current.setView([latitude, longitude], 15);
      }
    });
  }
}, [mapRef]);
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">

      {/* HEADER */}
      <header className="bg-white dark:bg-slate-800 shadow-md transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            🗺 School Finder
          </h1>

          {/* SWITCH */}
          <button
            onClick={toggleTheme}
            className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${
              darkMode ? "bg-slate-700" : "bg-slate-300"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                darkMode ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>

        </div>
      </header>

      {/* CONTENIDO */}
      <main className="max-w-4xl mx-auto px-4 py-8 text-slate-800 dark:text-white transition-colors duration-300">

        <SearchControls
          radius={radius}
          setRadius={setRadius}
          loading={loading}
          onSearch={() => {
  clearMap(); // 1. Primero limpia lo viejo
  // Agregamos un pequeñísimo delay o aseguramos que el mapRef esté listo
  setTimeout(() => {
    searchPlaces(radius, mapRef, clearMap, L); // 2. Luego busca lo nuevo
  }, 100); 
}}
        />

        <MapView mapRef={mapRef} darkMode={darkMode} loading={loading} />

        <ResultsList
          places={places}
          hasSearched={hasSearched}
        />

      </main>
    </div>
  );
}

export default App;
