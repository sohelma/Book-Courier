//src/pages/Coverages
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData} from 'react-router';

const Coverage = () => {
    const position = [23.6850, 90.3563];

    const serviceCenters = useLoaderData() || [];

  
    console.log (serviceCenters);
    return (
        <div>
            <div>
                <h1>We are availavle in all over Bangladesh </h1>
            </div>
            <div>search</div>
            <div className='border w-full h-[800px]'>
                <MapContainer center={position}
                 zoom={8} 
                 scrollWheelZoom={false}
                 className='h-[800px]'
                 >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                   {
                    serviceCenters.map(center=> <Marker 
                    position={[center.latitude,center.longitude]}>
                    <Popup>  A pretty CSS3 popup. <br /> Easily customizable. </Popup>
                    </Marker>)
                   }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;