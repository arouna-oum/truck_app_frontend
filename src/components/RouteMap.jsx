import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline
} from "react-leaflet";

const RouteMap = ({ geometry }) => {

  if (!geometry) return null;

  const positions = geometry.coordinates.map(coord => [
    coord[1],
    coord[0]
  ]);

  return (
    <MapContainer
      center={positions[0]}
      zoom={5}
      scrollWheelZoom={true}
      style={{
        height: "320px",
        width: "100%",
        borderRadius: "16px"
      }}
    >

      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={positions[0]} />

      <Marker position={positions[positions.length - 1]} />

      <Polyline
        positions={positions}
        pathOptions={{
          color: "#2563eb",
          weight: 5
        }}
      />

    </MapContainer>
  );
};

export default RouteMap;