import { useRef, useState, useEffect } from "react";
import L from "leaflet";
import MapView from "./components/MapView";
import SearchControls from "./components/SearchControls";
import ResultsList from "./components/ResultsList";
import usePlaceSearch from "./hooks/usePlaceSearch";

function App() {

  const mapRef = useRef(null);

  const [radius, setRadius] = useState(3000);
  const [userLocation, setUserLocation] = useState(null);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const { places, loading, hasSearched, searchPlaces } =
    usePlaceSearch("school");

  // 🌙 Control de dark mode
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


  // 📍 GPS en tiempo real
  useEffect(() => {

    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(

      (pos) => {

        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setUserLocation(coords);

        if (mapRef.current) {
          mapRef.current.setView([coords.lat, coords.lng], 15);
        }

      },

      (err) => {
        console.error("Error GPS:", err);
      },

      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }

    );

    return () => navigator.geolocation.clearWatch(watchId);

  }, []);


  // 🧹 limpiar mapa
  const clearMap = () => {

    if (!mapRef.current) return;

    mapRef.current.eachLayer((layer) => {

      if (layer instanceof L.Marker || layer instanceof L.Circle) {
        mapRef.current.removeLayer(layer);
      }

    });

  };


  // 🔎 búsqueda
  const handleSearch = () => {

    if (!mapRef.current || !userLocation) {
      alert("Esperando ubicación GPS...");
      return;
    }

    clearMap();

    searchPlaces(
      radius,
      mapRef,
      clearMap,
      L,
      userLocation.lat,
      userLocation.lng
    );

  };


  return (

    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">

      <header className="bg-white dark:bg-slate-800 shadow-md p-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold dark:text-white">
          🗺 School Finder
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg dark:text-white"
        >
          {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
        </button>

      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">

        <SearchControls
          radius={radius}
          setRadius={setRadius}
          loading={loading}
          onSearch={handleSearch}
        />

        <MapView
          mapRef={mapRef}
          darkMode={darkMode}
          loading={loading}
        />

        <ResultsList
          places={places}
          hasSearched={hasSearched}
          userLocation={userLocation}
        />

      </main>

    </div>

  );
}

export default App;
