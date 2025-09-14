import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView() {
  const [locations, setLocations] = useState({});

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch("http://localhost:5000/api/locations");
      const data = await res.json();
      setLocations(data);
    };

    fetchLocations();
    const interval = setInterval(fetchLocations, 30000); // refresh every 30s

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[28.6, 77.2]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {Object.entries(locations).map(([userId, loc]) => (
        <Marker key={userId} position={[loc.latitude, loc.longitude]}>
          <Popup>User: {userId}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
