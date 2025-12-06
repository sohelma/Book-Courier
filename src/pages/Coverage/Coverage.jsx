// src/pages/Coverages/Coverage.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet default marker issue in Vite + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Coverage = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const defaultPosition = [23.685, 90.3563]; // Bangladesh center

  useEffect(() => {
    // Load JSON from public folder
    fetch('/serviceCenters.json')
      .then(res => res.json())
      .then(data => setServiceCenters(Array.isArray(data) ? data : [data]))
      .catch(err => console.error('Failed to load service centers:', err));
  }, []);

  return (
    <div className="relative pt-24">
      <h1 className="text-2xl font-semibold mb-4 text-center">We are available all over Bangladesh</h1>

      <div className="border w-full h-[800px] relative z-0">
        <MapContainer
          center={defaultPosition}
          zoom={7}
          scrollWheelZoom={false}
          className="h-[800px] w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map(center => (
            <Marker
              key={center.city + center.latitude}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <strong>{center.city}</strong> <br />
                District: {center.district} <br />
                Covered Areas: {center.covered_area.join(', ')}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
