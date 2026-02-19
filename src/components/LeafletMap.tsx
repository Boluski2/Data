import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { GeoObject } from "@/lib/mockData";

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const typeColors: Record<string, string> = {
  Tree: "#22c55e",
  "Light Pole": "#f59e0b",
  Dustbin: "#8b5cf6",
  "Road Sign": "#ef4444",
  "Fire Hydrant": "#ec4899",
  Bench: "#06b6d4",
  "Utility Box": "#64748b",
  "Manhole Cover": "#78716c",
  "Traffic Signal": "#f97316",
  "Bus Stop": "#3b82f6",
};

interface LeafletMapProps {
  objects: GeoObject[];
  onSelectObject?: (obj: GeoObject) => void;
  className?: string;
  center?: [number, number];
  zoom?: number;
}

export default function LeafletMap({
  objects,
  onSelectObject,
  className = "",
  center = [6.5244, 3.3792],
  zoom = 12,
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center,
      zoom,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!markersRef.current || !mapInstanceRef.current) return;

    markersRef.current.clearLayers();

    objects.forEach((obj) => {
      const color = typeColors[obj.type] || "#3b82f6";
      const marker = L.circleMarker([obj.latitude, obj.longitude], {
        radius: 6,
        fillColor: color,
        color: "#fff",
        weight: 1.5,
        opacity: 1,
        fillOpacity: 0.85,
      });

      marker.bindTooltip(
        `<strong>${obj.type}</strong><br/>ID: ${obj.id}<br/>Area: ${obj.area}`,
        { direction: "top", offset: [0, -8] }
      );

      if (onSelectObject) {
        marker.on("click", () => onSelectObject(obj));
      }

      markersRef.current!.addLayer(marker);
    });

    if (objects.length > 0) {
      const bounds = L.latLngBounds(objects.map((o) => [o.latitude, o.longitude]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [30, 30], maxZoom: 14 });
    }
  }, [objects, onSelectObject]);

  return <div ref={mapRef} className={`w-full h-full ${className}`} />;
}
