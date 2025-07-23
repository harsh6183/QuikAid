// components/MapPreview.jsx
"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Dynamically import React-Leaflet components
const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });

export default function MapPreview({ coordinates }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Optional: Fix for marker icon not showing
    import("leaflet").then((L) => {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    });
  }, []);

  if (!isClient) return null; // Prevent SSR issues

  return (
    coordinates.latitude &&
    coordinates.longitude && (
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <MapContainer
          center={[coordinates.latitude, coordinates.longitude]}
          zoom={16}
          scrollWheelZoom={false}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coordinates.latitude, coordinates.longitude]} />
        </MapContainer>
      </div>
    )
  );
}
