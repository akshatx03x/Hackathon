import L from 'leaflet';

/**
 * Fetches a route from the OSRM API.
 * @param {object} start An object with lat and lng properties.
 * @param {object} end An object with lat and lng properties.
 * @returns {Promise<object>} The route geometry and properties.
 */
export const getRoute = async (start, end) => {
    try {
        const url = `http://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.routes && data.routes.length > 0) {
            const route = data.routes[0];
            const geometry = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
            const distance = route.distance / 1000; // in km
            const duration = route.duration / 60; // in minutes

            return {
                geometry: geometry,
                distance: distance.toFixed(2),
                duration: Math.ceil(duration),
            };
        } else {
            throw new Error('No routes found.');
        }
    } catch (error) {
        console.error("Failed to get OSRM route:", error);
        throw error;
    }
};