// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ResultsList({ places, hasSearched }) {
  if (!hasSearched) return null;

  return (
    <div className="mt-10">
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-semibold mb-4 dark:text-white"
      >
        Resultados ({places.length})
      </motion.h2>

      {places.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700"
        >
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-slate-800 dark:text-white">
            No se encontraron colegios
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Intenta aumentar el radio de búsqueda o mover el mapa.
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {places.map((place, index) => {
            // ✅ CORRECCIÓN DE URL: Se agregó el '$' antes de {place.lat}
            // Esto permite que el navegador envíe las coordenadas reales a Google Maps
            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}&travelmode=driving`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md border border-transparent hover:border-blue-500/50 transition-colors"
              >
                <h3 className="font-semibold text-slate-800 dark:text-white">
                  🏫 {place.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-mono">
  📏 {Number(place.distance).toFixed(1)} km de distancia
</p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  🚗 Cómo llegar
                </a>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}