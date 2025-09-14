import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getRoute } from '../context/OsrmClient.js'; // We'll create this in the next step

// Fix for default Leaflet marker icon issues with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// A custom marker icon for the origin
const originIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// A custom marker icon for destinations
const destinationIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/484/484167.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const CommutesMap = ({ origin, destinations }) => {
    const mapRef = useRef(null);
    const [routes, setRoutes] = useState([]);

    // This component will handle fetching and drawing the routes
    const RouteFetcher = () => {
        const map = useMap();
        const [layers, setLayers] = useState([]);

        useEffect(() => {
            const fetchRoutes = async () => {
                const newLayers = [];
                for (let i = 0; i < destinations.length; i++) {
                    const destination = destinations[i];
                    try {
                        const route = await getRoute(origin, destination.location);
                        if (route && route.geometry) {
                            newLayers.push({
                                polyline: route.geometry,
                                color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color for each route
                                destination: destination.name,
                            });
                        }
                    } catch (error) {
                        console.error(`Failed to get route for ${destination.name}:`, error);
                    }
                }
                setLayers(newLayers);
            };

            fetchRoutes();
        }, [destinations, map]);

        return layers.map((layer, index) => (
            <Polyline
                key={index}
                positions={layer.polyline}
                color={layer.color}
                weight={6}
            >
                <Popup>
                    Route to {layer.destination}
                </Popup>
            </Polyline>
        ));
    };

    return (
        <MapContainer
            center={origin}
            zoom={12}
            scrollWheelZoom={false}
            ref={mapRef}
            className="w-full h-full rounded-2xl"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Origin Marker */}
            <Marker position={origin} icon={originIcon}>
                <Popup>Your Location</Popup>
            </Marker>

            {/* Destination Markers */}
            {destinations.map((dest, index) => (
                <Marker key={index} position={dest.location} icon={destinationIcon}>
                    <Popup>{dest.name}</Popup>
                </Marker>
            ))}

            {/* Draw Routes on the map */}
            <RouteFetcher />

        </MapContainer>
    );
};

export default CommutesMap;