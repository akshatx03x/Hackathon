

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Users, 
  Clock, 
  DollarSign, 
  Bell, 
  Play, 
  Square, 
  AlertTriangle,
  Sun,
  Car,
  Award,
  Navigation,
  User,
  LogOut,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const Driver = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [occupancyLevel, setOccupancyLevel] = useState(68);
  const [completedTrips, setCompletedTrips] = useState(4);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTrip, setActiveTrip] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate occupancy changes
      setOccupancyLevel(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const getOccupancyStatus = (level) => {
    if (level < 40) return { label: 'Comfortable', color: 'bg-green-500', textColor: 'text-green-700' };
    if (level < 70) return { label: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    return { label: 'Crowded', color: 'bg-red-500', textColor: 'text-red-700' };
  };

  const occupancyStatus = getOccupancyStatus(occupancyLevel);

  const todaysTrips = [
    { id: 1, pickup: 'Central Station', drop: 'Mall Plaza', time: '08:30', status: 'completed' },
    { id: 2, pickup: 'Mall Plaza', drop: 'University', time: '09:15', status: 'completed' },
    { id: 3, pickup: 'University', drop: 'Airport', time: '10:45', status: 'completed' },
    { id: 4, pickup: 'Airport', drop: 'Downtown', time: '12:30', status: 'completed' },
    { id: 5, pickup: 'Downtown', drop: 'Central Station', time: '14:15', status: 'active' },
    { id: 6, pickup: 'Central Station', drop: 'Suburbs', time: '15:45', status: 'pending' },
    { id: 7, pickup: 'Suburbs', drop: 'Hospital', time: '16:30', status: 'pending' },
  ];

  const notifications = [
    { id: 1, type: 'alert', message: 'Traffic delay on Route 45 - 15 min delay expected', time: '10 min ago' },
    { id: 2, type: 'info', message: 'Passenger requested wheelchair accessibility at next stop', time: '5 min ago' },
    { id: 3, type: 'success', message: 'On-time performance: 95% today', time: '1 hour ago' },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const handleStartTrip = () => {
    setActiveTrip(true);
  };

  const handleEndTrip = () => {
    setActiveTrip(false);
    setCompletedTrips(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Navigation className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">TransitPro</h1>
                  <p className="text-sm text-gray-500">Driver Dashboard</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Routes</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Schedule</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Reports</a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="w-8 h-8 text-gray-400 bg-gray-100 rounded-full p-1" />
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">John Driver</p>
                    <p className="text-xs text-gray-500">ID: BD001</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-gray-400 hover:text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700">Dashboard</a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-500">Routes</a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-500">Schedule</a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-500">Reports</a>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex items-center px-3 py-2">
                  <User className="w-8 h-8 text-gray-400 bg-gray-100 rounded-full p-1 mr-3" />
                  <div>
                    <p className="text-base font-medium text-gray-900">John Driver</p>
                    <p className="text-sm text-gray-500">ID: BD001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Status Bar */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Good afternoon, John!</h2>
              <p className="text-blue-100">Route 42 • Bus #2847 • {currentTime.toLocaleDateString()}</p>
            </div>
            <div className="mt-2 sm:mt-0 text-right">
              <p className="text-2xl font-bold">{currentTime.toLocaleTimeString()}</p>
              <p className="text-blue-100">Current Time</p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Map */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Live Route Map</h3>
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Live</span>
                </div>
              </div>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Simulated map background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="absolute top-12 right-8 w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div className="absolute bottom-8 left-12 w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-3 h-3 bg-red-500 rounded-full"></div>
                  {/* Route line */}
                  <div className="absolute top-6 left-6 w-0.5 h-32 bg-blue-300 transform rotate-45"></div>
                </div>
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-2 animate-bounce" />
                  <p className="text-gray-600 font-medium">Current Location: Downtown & 5th Ave</p>
                  <p className="text-sm text-gray-500">Next Stop: Central Station (0.8 mi)</p>
                </div>
              </div>
            </div>

            {/* Today's Trips */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Assigned Trips</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {todaysTrips.map((trip) => (
                  <div key={trip.id} className={`p-3 rounded-lg border-l-4 ${
                    trip.status === 'completed' ? 'border-green-500 bg-green-50' :
                    trip.status === 'active' ? 'border-blue-500 bg-blue-50' :
                    'border-gray-300 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{trip.pickup}</span>
                          <span className="text-gray-400">→</span>
                          <span className="font-medium text-gray-900">{trip.drop}</span>
                        </div>
                        <div className="flex items-center mt-1 space-x-3">
                          <span className="text-sm text-gray-600 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {trip.time}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            trip.status === 'completed' ? 'bg-green-100 text-green-800' :
                            trip.status === 'active' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Passenger Occupancy */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Passenger Occupancy</h3>
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      stroke={occupancyStatus.color.replace('bg-', '#')} 
                      strokeWidth="8" 
                      fill="transparent"
                      strokeDasharray={`${occupancyLevel * 2.51}, 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{Math.round(occupancyLevel)}%</span>
                  </div>
                </div>
                <p className={`font-semibold ${occupancyStatus.textColor}`}>{occupancyStatus.label}</p>
                <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span>~{Math.round(occupancyLevel * 0.5)} passengers</span>
                </div>
              </div>
            </div>

            {/* Trip Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Trips Today</span>
                  <span className="font-semibold text-2xl text-gray-900">{todaysTrips.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Completed Trips</span>
                  <span className="font-semibold text-2xl text-green-600">{completedTrips}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Today's Earnings</span>
                  <span className="font-semibold text-2xl text-blue-600 flex items-center">
                    <DollarSign className="w-5 h-5 mr-1" />
                    247
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleStartTrip}
                  disabled={activeTrip}
                  className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium ${
                    activeTrip 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Trip
                </button>
                <button 
                  onClick={handleEndTrip}
                  disabled={!activeTrip}
                  className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium ${
                    !activeTrip 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Square className="w-5 h-5 mr-2" />
                  End Trip
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Emergency Alert
                </button>
              </div>
            </div>

            {/* Small Widgets */}
            <div className="grid grid-cols-2 gap-4">
              {/* Weather Widget */}
              <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-white p-4 rounded-lg">
                <Sun className="w-6 h-6 mb-2" />
                <p className="text-sm opacity-90">Weather</p>
                <p className="font-bold text-lg">72°F</p>
                <p className="text-xs opacity-75">Clear</p>
              </div>

              {/* Traffic Widget */}
              <div className="bg-gradient-to-br from-orange-400 to-orange-500 text-white p-4 rounded-lg">
                <Car className="w-6 h-6 mb-2" />
                <p className="text-sm opacity-90">Traffic</p>
                <p className="font-bold text-lg">Light</p>
                <p className="text-xs opacity-75">No delays</p>
              </div>
            </div>

            {/* Driver Performance Badge */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg text-center">
              <Award className="w-8 h-8 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Driver Performance</h4>
              <p className="text-2xl font-bold mb-1">A+</p>
              <p className="text-sm opacity-90">Excellent Rating</p>
              <div className="mt-2 text-xs opacity-75">
                <p>On-time: 98% • Safety: 100%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            <Bell className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Driver;