export default function SearchControls({
  radius,
  setRadius,
  loading,
  onSearch,
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      {/* SELECTOR DE DISTANCIA */}
      <select
        value={radius}
        onChange={(e) => setRadius(Number(e.target.value))}
        className="
          bg-white dark:bg-slate-800 
          text-slate-900 dark:text-white 
          border border-slate-300 dark:border-slate-600 
          rounded-lg px-4 py-2 outline-none 
          transition-colors duration-300
          cursor-pointer
        "
      >
        <option value="1000">1 km</option>
        <option value="3000">3 km</option>
        <option value="5000">5 km</option>
        <option value="10000">10 km</option>
      </select>

      {/* BOTÓN DE BÚSQUEDA */}
      <button
        onClick={onSearch}
        disabled={loading}
        className={`
          px-6 py-2 rounded-lg font-semibold text-white 
          transition-all duration-300 transform active:scale-95
          ${loading 
            ? "bg-slate-400 cursor-not-allowed" 
            : "bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg"
          }
        `}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">🌀</span> Buscando...
          </span>
        ) : (
          "Buscar"
        )}
      </button>
    </div>
  );
}