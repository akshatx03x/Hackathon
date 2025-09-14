import React, { useState, useEffect, useRef } from 'react';
import { 
    User, 
    MapPin, 
    Clock, 
    Share2, 
    Navigation, 
    Bell, 
    Menu, 
    X, 
    LogOut,
    Route,
    Users,
    TrendingUp,
    Activity,
    Calendar,
    ArrowRight
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getRoute } from '../context/OsrmClient.js';

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

// Component to fetch routes and draw polylines on the map
const RouteFetcher = ({ origin, destinations }) => {
    const map = useMap();
    const [layers, setLayers] = useState([]);

    useEffect(() => {
        const fetchRoutes = async () => {
            const newLayers = [];
            for (let i = 0; i < destinations.length; i++) {
                const destination = destinations[i];
                try {
                    // Use the imported getRoute function
                    const route = await getRoute(origin, destination.location);
                    if (route && route.geometry) {
                        newLayers.push({
                            polyline: route.geometry,
                            color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
                            destination: destination.name,
                            distance: route.distance,
                            duration: route.duration
                        });
                    }
                } catch (error) {
                    console.error(`Failed to get route for ${destination.name}:`, error);
                }
            }
            setLayers(newLayers);
        };

        if (origin && destinations.length > 0) {
            fetchRoutes();
        } else {
            setLayers([]); // Clear routes if no destinations
        }
    }, [destinations, map, origin]);

    return layers.map((layer, index) => (
        <Polyline
            key={index}
            positions={layer.polyline}
            color={layer.color}
            weight={6}
        >
            <Popup>
                Route to **{layer.destination}**<br/>
                Distance: {layer.distance} km<br/>
                Duration: {layer.duration} min
            </Popup>
        </Polyline>
    ));
};

// Component to handle map clicks and add new destinations
const MapClickHandler = ({ onAddDestination }) => {
    useMapEvents({
        click: (e) => {
            onAddDestination({
                lat: e.latlng.lat,
                lng: e.latlng.lng,
                name: `Clicked Destination`
            });
        },
    });
    return null;
};

// The main map component
const CommutesMap = ({ origin, destinations, onAddDestination }) => {
    return (
        <MapContainer
            center={origin || [0, 0]}
            zoom={12}
            scrollWheelZoom={false}
            className="w-full h-full rounded-2xl"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {origin && (
                <Marker position={origin} icon={originIcon}>
                    <Popup>Your Current Location</Popup>
                </Marker>
            )}

            {destinations.map((dest, index) => (
                <Marker key={index} position={dest.location} icon={destinationIcon}>
                    <Popup>{dest.name}</Popup>
                </Marker>
            ))}

            <RouteFetcher origin={origin} destinations={destinations} />
            <MapClickHandler onAddDestination={onAddDestination} />
        </MapContainer>
    );
};

const dummyDestinations = [
  { name: 'Downtown City Center', location: { lat: 34.0522, lng: -118.2437 } },
  { name: 'Beverly Hills', location: { lat: 34.0736, lng: -118.4004 } },
  { name: 'Santa Monica Pier', location: { lat: 34.0102, lng: -118.4912 } },
];

const UserDashboard = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [occupancyPercentage] = useState(45);
    const [userLocation, setUserLocation] = useState(null); // Initialize as null to handle loading state
    const [mapDestinations, setMapDestinations] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        // Get user's current location on component mount
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setUserLocation({ lat, lng });
                    // Set initial dummy destinations relative to the user's location
                    setMapDestinations([
                        { name: 'Downtown City Center', location: { lat: lat + 0.05, lng: lng + 0.05 } },
                        { name: 'Beverly Hills', location: { lat: lat - 0.02, lng: lng + 0.03 } },
                        { name: 'Santa Monica Pier', location: { lat: lat - 0.01, lng: lng - 0.04 } },
                    ]);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    // Fallback to a default location if geolocation fails
                    setUserLocation({ lat: 34.0522, lng: -118.2437 });
                    setMapDestinations([
                        { name: 'Downtown City Center', location: { lat: 34.10, lng: -118.20 } },
                        { name: 'Beverly Hills', location: { lat: 34.08, lng: -118.35 } },
                    ]);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
            // Fallback to a default location
            setUserLocation({ lat: 34.0522, lng: -118.2437 });
            setMapDestinations([
                { name: 'Downtown City Center', location: { lat: 34.10, lng: -118.20 } },
                { name: 'Beverly Hills', location: { lat: 34.08, lng: -118.35 } },
            ]);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAddDestination = (newLocation) => {
        setMapDestinations(prevDestinations => [
            ...prevDestinations,
            { name: `Clicked Destination`, location: { lat: newLocation.lat, lng: newLocation.lng } }
        ]);
    };

    const getOccupancyStatus = (percentage) => {
        if (percentage <= 40) return { status: 'Comfortable', color: 'text-emerald-500', strokeColor: 'stroke-emerald-500' };
        if (percentage <= 70) return { status: 'Moderate', color: 'text-amber-500', strokeColor: 'stroke-amber-500' };
        return { status: 'Crowded', color: 'text-rose-500', strokeColor: 'stroke-rose-500' };
    };

    const occupancyInfo = getOccupancyStatus(occupancyPercentage);

    const CircularProgress = ({ percentage, size = 120 }) => {
        const radius = (size - 16) / 2;
        const circumference = 2 * Math.PI * radius;
        const strokeDasharray = circumference;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
            <div className="relative inline-flex items-center justify-center">
                <svg width={size} height={size} className="transform -rotate-90">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="transparent"
                        className="text-slate-100"
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className={`transition-all duration-[2000ms] ease-out ${occupancyInfo.strokeColor}`}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-light text-slate-800">{percentage}%</span>
                    <span className={`text-xs font-medium mt-1 ${occupancyInfo.color}`}>
                        {occupancyInfo.status}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Premium Header */}
            <header className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
                isScrolled 
                  ? 'bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-900/5' 
                  : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900'
            }`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Minimal Logo */}
                        <div className="flex items-center space-x-3">
                            <div className={`relative w-10 h-10 rounded-xl transition-all duration-300 ${
                                isScrolled 
                                  ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25' 
                                  : 'bg-white/10 backdrop-blur-sm border border-white/20'
                            }`}>
                                <Route className={`w-5 h-5 absolute inset-0 m-auto transition-colors ${
                                    isScrolled ? 'text-white' : 'text-white'
                                }`} />
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-lg font-medium tracking-tight transition-colors ${
                                    isScrolled ? 'text-slate-900' : 'text-white'
                                }`}>
                                    City Connect
                                </span>
                                <span className={`text-xs tracking-wide transition-colors ${
                                    isScrolled ? 'text-slate-500' : 'text-white/60'
                                }`}>
                                    Transit Dashboard
                                </span>
                            </div>
                        </div>

                        {/* Minimal Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-1">
                            {['Dashboard', 'Routes', 'Analytics'].map((item, index) => (
                                <a 
                                    key={item}
                                    href="#" 
                                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                        index === 0
                                          ? (isScrolled 
                                              ? 'text-blue-600 bg-blue-50' 
                                              : 'text-white bg-white/10 backdrop-blur-sm')
                                          : (isScrolled 
                                              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' 
                                              : 'text-white/70 hover:text-white hover:bg-white/5')
                                    }`}
                                >
                                    {item}
                                </a>
                            ))}
                            <div className={`w-px h-6 mx-4 ${isScrolled ? 'bg-slate-200' : 'bg-white/20'}`} />
                            <button className={`p-2.5 rounded-xl transition-all duration-200 group ${
                                isScrolled 
                                  ? 'text-slate-400 hover:text-rose-500 hover:bg-rose-50' 
                                  : 'text-white/60 hover:text-white hover:bg-white/10'
                            }`}>
                                <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                            </button>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button 
                            className={`md:hidden p-2.5 rounded-xl transition-all ${
                                isScrolled 
                                  ? 'text-slate-600 hover:bg-slate-100' 
                                  : 'text-white hover:bg-white/10'
                            }`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200/50">
                            <div className="px-6 py-4 space-y-1">
                                {['Dashboard', 'Routes', 'Analytics'].map((item, index) => (
                                    <a 
                                        key={item}
                                        href="#" 
                                        className={`block px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                                            index === 0
                                              ? 'text-blue-600 bg-blue-50'
                                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                        }`}
                                    >
                                        {item}
                                    </a>
                                ))}
                                <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors">
                                    <LogOut className="w-4 h-4 mr-3" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="pt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                    <div className="flex flex-col xl:flex-row gap-8">
                        
                        {/* Enhanced Left Sidebar */}
                        <div className="xl:w-80 flex-shrink-0">
                            <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-900/5 p-8 sticky top-32 border border-white/20">
                                {/* User Profile */}
                                <div className="text-center mb-8">
                                    <div className="relative inline-block mb-6">
                                        <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-light shadow-2xl shadow-blue-500/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                                            JD
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-emerald-400 rounded-xl border-4 border-white shadow-lg"></div>
                                    </div>
                                    <h2 className="text-xl font-medium text-slate-900 mb-1">John Doe</h2>
                                    <p className="text-slate-500 text-sm">Premium Commuter</p>
                                    <div className="flex items-center justify-center mt-3 text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                                        Active Now
                                    </div>
                                </div>

                                {/* Enhanced Stats */}
                                <div className="space-y-4 mb-8">
                                    <div className="group">
                                        <div className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 rounded-2xl transition-all duration-200 cursor-pointer">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                                                    <Calendar className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">This Month</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-semibold text-slate-900">24</div>
                                                <div className="text-xs text-emerald-500">+12%</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="group">
                                        <div className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 rounded-2xl transition-all duration-200 cursor-pointer">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                                                    <Route className="w-4 h-4 text-purple-600" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">Saved Routes</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-semibold text-slate-900">3</div>
                                                <div className="text-xs text-slate-400">Active</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group">
                                        <div className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 rounded-2xl transition-all duration-200 cursor-pointer">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center mr-3">
                                                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">Distance</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-semibold text-slate-900">342km</div>
                                                <div className="text-xs text-slate-400">Total</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Premium Action Buttons */}
                                <div className="space-y-2">
                                    {[
                                        { icon: User, label: 'Profile Settings', color: 'blue' },
                                        { icon: Bell, label: 'Notifications', color: 'purple' },
                                        { icon: Activity, label: 'Trip Analytics', color: 'emerald' }
                                    ].map(({ icon: Icon, label, color }, index) => (
                                        <button 
                                            key={label}
                                            className="group w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 bg-slate-50/30 hover:bg-slate-50 rounded-2xl transition-all duration-200"
                                        >
                                            <div className="flex items-center">
                                                <Icon className="w-4 h-4 mr-3" />
                                                {label}
                                            </div>
                                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Right Main Area */}
                        <div className="flex-1 min-w-0">
                            {/* Premium Live Map */}
                            <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-900/5 mb-8 overflow-hidden border border-white/20">
                                <div className="p-8 pb-0">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-2xl font-medium text-slate-900 mb-2">Live Transit Map</h2>
                                            <p className="text-slate-500">Click on the map to add a new destination.</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                                                Live
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="relative h-96 mx-8 rounded-2xl mb-8">
                                    {userLocation ? (
                                        <CommutesMap 
                                            origin={userLocation} 
                                            destinations={mapDestinations}
                                            onAddDestination={handleAddDestination}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 rounded-2xl">
                                            Loading map and user location...
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Premium Information Cards */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                                
                                {/* Enhanced ETA Card */}
                                <div className="group bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-900/5 p-6 border border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                                            <Clock className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                            Route 42
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <h3 className="text-sm font-medium text-slate-500 mb-2">Next Arrival</h3>
                                        <div className="flex items-baseline">
                                            <span className="text-3xl font-light text-slate-900">5</span>
                                            <span className="text-lg text-slate-500 ml-1">minutes</span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">Express service • Low occupancy</p>
                                    </div>
                                    <button className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all duration-200 group-hover:scale-[1.02]">
                                        <Bell className="w-4 h-4 mr-2" />
                                        Set Reminder
                                    </button>
                                </div>

                                {/* Enhanced Nearest Stop Card */}
                                <div className="group bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-900/5 p-6 border border-white/20 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                                            120m away
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <h3 className="text-sm font-medium text-slate-500 mb-2">Nearest Stop</h3>
                                        <div className="text-xl font-medium text-slate-900 mb-1">Main Street Station</div>
                                        <p className="text-xs text-slate-400">Platform 2 • Accessible • WiFi</p>
                                    </div>
                                    <button className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-2xl transition-all duration-200 group-hover:scale-[1.02]">
                                        <Navigation className="w-4 h-4 mr-2" />
                                        Navigate
                                    </button>
                                </div>

                                {/* Enhanced Occupancy Card */}
                                <div className="group bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-900/5 p-6 border border-white/20 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">
                                            Live Data
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-sm font-medium text-slate-500 mb-4">Current Occupancy</h3>
                                        <div className="flex justify-center mb-4">
                                            <CircularProgress percentage={occupancyPercentage} size={110} />
                                        </div>
                                        <p className="text-xs text-slate-400">Updated 30 seconds ago</p>
                                    </div>
                                </div>
                            </div>

                            {/* Premium Share Button */}
                            <div className="flex justify-center">
                                <button className="group relative px-12 py-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 hover:from-blue-900 hover:via-indigo-900 hover:to-blue-900 text-white font-medium rounded-2xl shadow-2xl shadow-slate-900/25 hover:shadow-blue-900/30 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    <div className="relative flex items-center">
                                        <Share2 className="w-5 h-5 mr-3 transition-transform group-hover:rotate-12" />
                                        Share Live Location
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Premium Footer */}
            <footer className="bg-white/30 backdrop-blur-xl border-t border-slate-200/50 mt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-3 mb-6 md:mb-0">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                                <Route className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-medium text-slate-900">City Connect</span>
                                <span className="text-xs text-slate-500">Transit Solutions</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-8 text-sm">
                            {['Privacy Policy', 'Terms of Service', 'Support'].map((item) => (
                                <a key={item} href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                                    {item}
                                </a>
                            ))}
                            <span className="text-slate-400">© 2025</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UserDashboard;