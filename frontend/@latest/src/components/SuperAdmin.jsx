import React, { useState } from 'react';
import { 
  Users, Navigation, BarChart3, Settings, Bell, Search, Filter, 
  MapPin, Clock, AlertTriangle, CheckCircle, XCircle, Eye, Edit,
  Download, Calendar, TrendingUp, Activity, Shield, Database,
  UserCheck, UserX, Car, Route, MessageSquare, Star, Phone,
  Mail, MoreVertical, Plus, Trash2, RefreshCw, Power
} from 'lucide-react';

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const stats = {
    totalDrivers: 142,
    activeDrivers: 98,
    totalPassengers: 3247,
    activeRoutes: 23,
    totalTrips: 1847,
    revenue: 52840,
    avgRating: 4.7,
    systemHealth: 96
  };

  const drivers = [
    {
      id: 1, name: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh@email.com',
      vehicle: 'DL-8C-A-1234', route: 'Route 7A', status: 'active', 
      rating: 4.8, trips: 156, earnings: 12400, lastSeen: '2 min ago',
      location: { lat: 28.6139, lng: 77.2090 }, passengers: 12
    },
    {
      id: 2, name: 'Priya Sharma', phone: '+91 87654 32109', email: 'priya@email.com',
      vehicle: 'DL-7B-C-5678', route: 'Route 3B', status: 'offline', 
      rating: 4.6, trips: 143, earnings: 11200, lastSeen: '1 hr ago',
      location: { lat: 28.5355, lng: 77.3910 }, passengers: 0
    },
    {
      id: 3, name: 'Mohammed Ali', phone: '+91 76543 21098', email: 'mohammed@email.com',
      vehicle: 'DL-9A-B-9012', route: 'Route 12C', status: 'active', 
      rating: 4.9, trips: 189, earnings: 15600, lastSeen: 'Just now',
      location: { lat: 28.7041, lng: 77.1025 }, passengers: 8
    },
    {
      id: 4, name: 'Sunita Devi', phone: '+91 65432 10987', email: 'sunita@email.com',
      vehicle: 'DL-6D-E-3456', route: 'Route 5A', status: 'busy', 
      rating: 4.5, trips: 134, earnings: 10800, lastSeen: '5 min ago',
      location: { lat: 28.6692, lng: 77.4538 }, passengers: 15
    },
    {
      id: 5, name: 'Vikash Singh', phone: '+91 54321 09876', email: 'vikash@email.com',
      vehicle: 'DL-4F-G-7890', route: 'Route 9B', status: 'maintenance', 
      rating: 4.3, trips: 98, earnings: 8900, lastSeen: '2 days ago',
      location: null, passengers: 0
    }
  ];

  const recentActivities = [
    { time: '2 min ago', action: 'Driver Rajesh started Route 7A', type: 'info' },
    { time: '5 min ago', action: 'Emergency alert from Route 3B resolved', type: 'success' },
    { time: '12 min ago', action: 'New passenger complaint received', type: 'warning' },
    { time: '18 min ago', action: 'Route 12C completed successfully', type: 'success' },
    { time: '25 min ago', action: 'Driver Mohammed reported vehicle issue', type: 'warning' }
  ];

  const routes = [
    { id: '7A', name: 'Central Station - Airport', drivers: 3, passengers: 45, status: 'active' },
    { id: '3B', name: 'Mall Road - University', drivers: 2, passengers: 32, status: 'delayed' },
    { id: '12C', name: 'Bus Stand - IT Park', drivers: 4, passengers: 67, status: 'active' },
    { id: '5A', name: 'Railway Station - Hospital', drivers: 2, passengers: 28, status: 'active' },
    { id: '9B', name: 'Market - Residential Area', drivers: 1, passengers: 19, status: 'maintenance' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'busy': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredDrivers = filterStatus === 'all' ? drivers : drivers.filter(d => d.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Super Admin</h1>
                <p className="text-sm text-gray-500">City Connect Control Panel</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">SA</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Super Admin</p>
                <p className="text-xs text-gray-500">Full Access</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'overview' ? 'bg-red-50 text-red-600 border border-red-200' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </button>
            
            <button
              onClick={() => setActiveTab('drivers')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'drivers' ? 'bg-red-50 text-red-600 border border-red-200' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="h-5 w-5" />
              Drivers Management
            </button>
            
            <button
              onClick={() => setActiveTab('passengers')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'passengers' ? 'bg-red-50 text-red-600 border border-red-200' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <UserCheck className="h-5 w-5" />
              Passengers
            </button>
            
            <button
              onClick={() => setActiveTab('routes')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'routes' ? 'bg-red-50 text-red-600 border border-red-200' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Route className="h-5 w-5" />
              Routes & Schedules
            </button>
            
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'analytics' ? 'bg-red-50 text-red-600 border border-red-200' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <TrendingUp className="h-5 w-5" />
              Analytics & Reports
            </button>
            
            <button
              onClick={() => setActiveTab('system')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'system' ? 'bg-red-50 text-red-600 border border-red-200' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Settings className="h-5 w-5" />
              System Settings
            </button>
            
            <button
              onClick={() => setActiveTab('support')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'support' ? 'bg-red-50 text-red-600 border border-red-200' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              Support & Complaints
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Last updated: 2 min ago</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Drivers</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalDrivers}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-green-600 text-sm">+12 this month</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Now</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeDrivers}</p>
                    </div>
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-gray-600 text-sm">{Math.round((stats.activeDrivers/stats.totalDrivers)*100)}% online</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Passengers</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalPassengers.toLocaleString()}</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-green-600 text-sm">+89 today</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">System Health</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.systemHealth}%</p>
                    </div>
                    <Shield className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-green-600 text-sm">All systems operational</span>
                  </div>
                </div>
              </div>

              {/* Live Map and Activity */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Transit Map</h3>
                  <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Interactive map showing real-time vehicle locations</p>
                      <p className="text-sm text-gray-500 mt-1">{stats.activeDrivers} vehicles currently tracked</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'success' ? 'bg-green-500' : 
                          activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                        <div>
                          <p className="text-sm text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Drivers Tab */}
          {activeTab === 'drivers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Drivers Management</h2>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Driver
                </button>
              </div>

              {/* Filters and Search */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search drivers by name, phone, or vehicle..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="offline">Offline</option>
                    <option value="busy">Busy</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              {/* Drivers Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Driver</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Vehicle & Route</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Performance</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Seen</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredDrivers.map((driver) => (
                        <tr key={driver.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-gray-700">
                                  {driver.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{driver.name}</p>
                                <p className="text-sm text-gray-500">{driver.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-900">{driver.vehicle}</p>
                              <p className="text-sm text-gray-500">{driver.route}</p>
                              {driver.passengers > 0 && (
                                <p className="text-xs text-blue-600">{driver.passengers} passengers</p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(driver.status)}`}>
                              {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{driver.rating}</span>
                              </div>
                              <p className="text-sm text-gray-500">{driver.trips} trips</p>
                              <p className="text-sm text-green-600">₹{driver.earnings.toLocaleString()}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {driver.lastSeen}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedDriver(driver)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Power className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Routes Tab */}
          {activeTab === 'routes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Routes & Schedules</h2>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Route
                </button>
              </div>

              <div className="grid gap-6">
                {routes.map((route) => (
                  <div key={route.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <span className="font-bold text-red-600">{route.id}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{route.name}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-500">{route.drivers} drivers</span>
                            <span className="text-sm text-gray-500">{route.passengers} passengers</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              route.status === 'active' ? 'bg-green-100 text-green-800' :
                              route.status === 'delayed' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {route.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Report
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Revenue chart visualization</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Statistics</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Usage trends visualization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
              
              <div className="grid gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium text-green-900">API Server</p>
                      <p className="text-sm text-green-600">Online</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium text-green-900">Database</p>
                      <p className="text-sm text-green-600">Connected</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <p className="font-medium text-yellow-900">GPS Service</p>
                      <p className="text-sm text-yellow-600">Minor Issues</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Automatic backups</span>
                      <div className="w-12 h-6 bg-green-500 rounded-full p-1">
                        <div className="w-4 h-4 bg-white rounded-full ml-6 transition-all"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Real-time notifications</span>
                      <div className="w-12 h-6 bg-green-500 rounded-full p-1">
                        <div className="w-4 h-4 bg-white rounded-full ml-6 transition-all"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">GPS tracking precision</span>
                      <select className="border border-gray-300 rounded-md px-3 py-1">
                        <option>High (5m accuracy)</option>
                        <option>Medium (10m accuracy)</option>
                        <option>Low (20m accuracy)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Support & Complaints</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Filter
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    New Ticket
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <div className="text-2xl font-bold text-red-600">23</div>
                  <div className="text-sm text-gray-600">Open Tickets</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <div className="text-2xl font-bold text-yellow-600">15</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <div className="text-2xl font-bold text-green-600">89</div>
                  <div className="text-sm text-gray-600">Resolved Today</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <div className="text-2xl font-bold text-blue-600">4.2</div>
                  <div className="text-sm text-gray-600">Avg Response (hrs)</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Support Tickets</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {[
                    { id: '#T001', user: 'Rahul Gupta', issue: 'Bus not showing on map', priority: 'high', status: 'open', time: '2 hours ago' },
                    { id: '#T002', user: 'Priya Singh', issue: 'Wrong arrival time displayed', priority: 'medium', status: 'in-progress', time: '4 hours ago' },
                    { id: '#T003', user: 'Mohammed Khan', issue: 'Payment issue with trip fare', priority: 'high', status: 'open', time: '6 hours ago' },
                    { id: '#T004', user: 'Sunita Devi', issue: 'Account verification problem', priority: 'low', status: 'resolved', time: '1 day ago' },
                    { id: '#T005', user: 'Vikash Kumar', issue: 'App crashes on route selection', priority: 'high', status: 'in-progress', time: '1 day ago' }
                  ].map((ticket, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-sm font-semibold text-gray-700">
                                {ticket.user.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">{ticket.id}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                                ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {ticket.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{ticket.issue}</p>
                            <p className="text-sm text-gray-500">by {ticket.user} • {ticket.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                            ticket.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {ticket.status.replace('-', ' ')}
                          </span>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Passengers Tab */}
          {activeTab === 'passengers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Passengers Management</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Passenger
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">3,247</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Today</p>
                      <p className="text-2xl font-bold text-gray-900">892</p>
                    </div>
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">New This Week</p>
                      <p className="text-2xl font-bold text-gray-900">156</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Trips/Day</p>
                      <p className="text-2xl font-bold text-gray-900">2.4</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Passenger Directory</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search passengers..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Passenger</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Usage Stats</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Active</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { name: 'Anil Sharma', phone: '+91 98765 43210', email: 'anil@email.com', trips: 45, lastActive: '2 hours ago', status: 'active' },
                        { name: 'Meera Patel', phone: '+91 87654 32109', email: 'meera@email.com', trips: 32, lastActive: '1 day ago', status: 'inactive' },
                        { name: 'Rohit Kumar', phone: '+91 76543 21098', email: 'rohit@email.com', trips: 67, lastActive: 'Just now', status: 'active' },
                        { name: 'Kavya Singh', phone: '+91 65432 10987', email: 'kavya@email.com', trips: 23, lastActive: '5 hours ago', status: 'active' },
                        { name: 'Arjun Gupta', phone: '+91 54321 09876', email: 'arjun@email.com', trips: 89, lastActive: '3 days ago', status: 'inactive' }
                      ].map((passenger, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-purple-600">
                                  {passenger.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{passenger.name}</p>
                                <p className="text-sm text-gray-500">Passenger ID: P{String(index + 1).padStart(4, '0')}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm text-gray-900">{passenger.phone}</p>
                              <p className="text-sm text-gray-500">{passenger.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{passenger.trips} trips</p>
                              <p className="text-sm text-gray-500">This month</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {passenger.lastActive}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              passenger.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' :
                              'bg-gray-100 text-gray-800 border-gray-200'
                            }`}>
                              {passenger.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <MessageSquare className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <UserX className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Driver Detail Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Driver Details</h3>
                <button
                  onClick={() => setSelectedDriver(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-700">
                    {selectedDriver.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{selectedDriver.name}</h4>
                  <p className="text-gray-600">Driver ID: D{String(selectedDriver.id).padStart(4, '0')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Contact Information</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{selectedDriver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{selectedDriver.email}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Vehicle Details</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{selectedDriver.vehicle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Route className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{selectedDriver.route}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedDriver.trips}</div>
                  <div className="text-sm text-blue-800">Total Trips</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹{selectedDriver.earnings.toLocaleString()}</div>
                  <div className="text-sm text-green-800">Earnings</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{selectedDriver.rating}</div>
                  <div className="text-sm text-yellow-800">Rating</div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Current Status</h5>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedDriver.status)}`}>
                    {selectedDriver.status.charAt(0).toUpperCase() + selectedDriver.status.slice(1)}
                  </span>
                  <span className="text-sm text-gray-600">Last seen: {selectedDriver.lastSeen}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                  Send Message
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}