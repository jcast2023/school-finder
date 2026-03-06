// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ResultsList({ places, hasSearched, userLocation }) {

  if (!hasSearched) return null;

  const openGoogleMaps = (lat, lon) => {

    if (!userLocation) {
      alert("Esperando ubicación GPS...");
      return;
    }

    const url =
      `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lon}&travelmode=driving&dir_action=navigate`;

    window.open(url, "_blank");

  };

  return (
    <div className="mt-10">

      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        Resultados ({places.length})
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        {places.map((place, index) => (

          <div
            key={index}
            className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md border border-transparent hover:border-blue-500/50"
          >

            <h3 className="font-semibold dark:text-white">
              🏫 {place.name}
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              📏 {Number(place.distance).toFixed(2)} km de distancia
            </p>

            <button
              onClick={() => openGoogleMaps(place.lat, place.lon)}
              className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              🚗 Cómo llegar (Ruta Exacta)
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}
