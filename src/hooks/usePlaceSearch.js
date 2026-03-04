import { useState } from "react";
import { calculateDistance } from "../utils/distance";

export default function usePlaceSearch(type = "school") {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchPlaces = (radius, mapRef, clearMap, L) => {
    if (!mapRef.current) return;

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          clearMap();
          mapRef.current.setView([latitude, longitude], 14);

          const userMarker = L.marker([latitude, longitude])
            .addTo(mapRef.current)
            .bindPopup("📍 Estás aquí")
            .openPopup();

          const circle = L.circle([latitude, longitude], {
            radius,
            color: "blue",
            fillColor: "#4da6ff",
            fillOpacity: 0.2,
          }).addTo(mapRef.current);

          const response = await fetch(
            `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="${type}"](around:${radius},${latitude},${longitude});out;`
          );

          const data = await response.json();

          const newMarkers = [userMarker, circle];
          const list = [];

          data.elements.forEach((place) => {
            if (!place.tags) return;

            const distance = calculateDistance(
              latitude,
              longitude,
              place.lat,
              place.lon
            );

            const marker = L.marker([place.lat, place.lon])
              .addTo(mapRef.current)
              .bindPopup(
                `🏫 ${place.tags.name || "Colegio sin nombre"} <br/> 📏 ${distance} km`
              );

            newMarkers.push(marker);

            list.push({
              name: place.tags.name || "Colegio sin nombre",
              lat: place.lat,
              lon: place.lon,
              distance: distance,
            });
          });

          setPlaces(list);
          setHasSearched(true);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );
  };

  return {
    places,
    loading,
    hasSearched,
    searchPlaces,
  };
}
