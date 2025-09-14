// LocationTracker.jsx
import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // backend server

export default function LocationTracker({ userId }) {
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported!");
      return;
    }

    const sendLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          socket.emit("updateLocation", { userId, latitude, longitude });
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    };

    // Send immediately
    sendLocation();

    // Send every 30s
    const interval = setInterval(sendLocation, 30000);

    return () => clearInterval(interval);
  }, [userId]);

  return <p>Location tracking started...</p>;
}
