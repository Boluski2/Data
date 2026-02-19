import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const lagosAreas = [
  { lat: 6.4698, lng: 3.5852, label: "Lekki", count: 342 },
  { lat: 6.4281, lng: 3.4219, label: "Victoria Island", count: 187 },
  { lat: 6.4520, lng: 3.4350, label: "Ikoyi", count: 110 },
  { lat: 6.6018, lng: 3.3515, label: "Ikeja", count: 95 },
  { lat: 6.5059, lng: 3.3509, label: "Surulere", count: 120 },
  { lat: 6.4667, lng: 3.6000, label: "Ajah", count: 78 },
  { lat: 6.4488, lng: 3.3590, label: "Apapa", count: 156 },
];

export default function HeroMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [9.0820, 8.6753],
      zoom: 6,
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    L.control.attribution({ prefix: false, position: "bottomright" })
      .addAttribution('© <a href="https://www.openstreetmap.org/copyright" style="color:#60a5fa">OpenStreetMap</a>')
      .addTo(map);

    // Fetch accurate Nigeria boundary GeoJSON from OSM/Nominatim
    fetch(
      "https://nominatim.openstreetmap.org/search?q=Nigeria&format=geojson&polygon_geojson=1&limit=1",
      { headers: { "Accept-Language": "en" } }
    )
      .then((r) => r.json())
      .then((data) => {
        if (!data.features?.length) return;
        L.geoJSON(data, {
          style: {
            color: "#0ea5e9",
            weight: 4,
            opacity: 0.9,
            fillColor: "#0ea5e9",
            fillOpacity: 0.07,
          },
        }).addTo(map);
      })
      .catch(() => {/* silently ignore if fetch fails */});

    // Lagos area markers
    lagosAreas.forEach((area) => {
      const marker = L.circleMarker([area.lat, area.lng], {
        radius: 8,
        fillColor: "#0ea5e9",
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      }).addTo(map);

      marker.bindTooltip(
        `<strong>${area.label}</strong><br/>${area.count} objects mapped`,
        { direction: "top", offset: [0, -10] }
      );
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
}
