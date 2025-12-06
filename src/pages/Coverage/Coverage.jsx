//src/pages/Coverages
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData} from 'react-router';

const Coverage = () => {
    const position = [23.6850, 90.3563];
    const serviceCenters = useLoaderData() || [];

    return (
        <div className="relative pt-24">
            <div>
                <h1>We are available all over Bangladesh</h1>
            </div>

            <div>search</div>

            <div className='border w-full h-[800px] relative z-0'>
                <MapContainer 
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='h-[800px] z-0'
                >
                    <TileLayer
                        attribution='&copy;OpenStreetMap'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {serviceCenters.map(center => 
                        <Marker 
                          key={center.id}
                          position={[center.latitude, center.longitude]}
                        >
                            <Popup>
                                {center.name || "Service Center"} <br /> Location 
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;
