import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { districts } from "../../../src/data/districts";

const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Helper to fly to first match
const FlyToFirstMatch = ({ position }) => {
  const map = useMap();
  if (position) {
    map.flyTo(position, 10, { duration: 1 });
  }
  return null;
};

const Coverage = () => {
  const [query, setQuery] = useState("");

  // Filter districts live
  const filteredDistricts = districts.filter((district) =>
    district.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center">
        We are available in 64 districts
      </h2>

      {/* Search Box */}
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Search district..."
          className="input input-bordered w-full max-w-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Second Title */}
      <h2 className="text-2xl font-bold text-center">
        We deliver almost all over Bangladesh
      </h2>

      {/* Map */}
      <div className="w-full h-[500px] rounded-lg overflow-hidden border">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {filteredDistricts.length > 0 ? (
            <>
              {filteredDistricts.map((district) => (
                <Marker
                  key={district.name}
                  position={[district.lat, district.lng]}
                  icon={customIcon}
                >
                  <Popup>{district.name}</Popup>
                </Marker>
              ))}
              <FlyToFirstMatch
                position={[
                  filteredDistricts[0].lat,
                  filteredDistricts[0].lng,
                ]}
              />
            </>
          ) : (
            // If nothing typed, show all
            query === "" &&
            districts.map((district) => (
              <Marker
                key={district.name}
                position={[district.lat, district.lng]}
                icon={customIcon}
              >
                <Popup>{district.name}</Popup>
              </Marker>
            ))
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;

