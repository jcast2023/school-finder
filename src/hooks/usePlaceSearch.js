import { useState } from "react";
import { calculateDistance } from "../utils/distance";

export default function usePlaceSearch(type = "school") {

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 🔎 búsqueda de lugares
  const searchPlaces = async (radius, mapRef, clearMap, L, lat, lng) => {

    if (!mapRef.current) return;

    setLoading(true);

    try {

      console.log("GPS exacto:", lat, lng);

      clearMap();

      mapRef.current.setView([lat, lng], 15);

      // 📍 marcador usuario
      L.marker([lat, lng])
        .addTo(mapRef.current)
        .bindPopup("📍 Estás aquí")
        .openPopup();

      // 🔵 círculo de búsqueda
      L.circle([lat, lng], {
        radius,
        color: "blue",
        fillColor: "#4da6ff",
        fillOpacity: 0.2,
      }).addTo(mapRef.current);

      // 🔎 consulta a Overpass API
      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="${type}"](around:${radius},${lat},${lng});out;`
      );

      const data = await response.json();

      const list = [];

      data.elements.forEach((place) => {

        // evitar datos inválidos
        if (!place.tags || !place.lat || !place.lon) return;

        const distance = calculateDistance(
          lat,
          lng,
          place.lat,
          place.lon
        );

        const name = place.tags.name || "Colegio sin nombre";

        // marcador colegio
        L.marker([place.lat, place.lon])
          .addTo(mapRef.current)
          .bindPopup(
            `🏫 ${name} <br/> 📏 ${distance.toFixed(2)} km`
          );

        list.push({
          name,
          lat: place.lat,
          lon: place.lon,
          distance
        });

      });

      // ordenar por distancia (más cercano primero)
      list.sort((a, b) => a.distance - b.distance);

      setPlaces(list);
      setHasSearched(true);

    } catch (error) {

      console.error("Error buscando lugares:", error);

    } finally {

      setLoading(false);

    }
  };

  return {
    places,
    loading,
    hasSearched,
    searchPlaces,
  };
}
