import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Shield, Users, Bell, Navigation, BarChart3, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const navigate = useNavigate()


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white antialiased">
      {/* Enhanced Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Navigation className={`h-7 w-7 transition-colors duration-300 ${
                  scrollY > 50 ? 'text-gray-900' : 'text-white'
                }`} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full animate-pulse" />
              </div>
              <span className={`text-xl font-bold transition-colors duration-300 ${
                scrollY > 50 ? 'text-gray-900' : 'text-white'
              }`}>City-Connect</span>
            </div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className={`font-medium transition-all duration-300 hover:scale-105 ${
                scrollY > 50 ? 'text-gray-700 hover:text-teal-600' : 'text-white/90 hover:text-white'
              }`}>Features</a>
              <a href="#" className={`font-medium transition-all duration-300 hover:scale-105 ${
                scrollY > 50 ? 'text-gray-700 hover:text-teal-600' : 'text-white/90 hover:text-white'
              }`}>About</a>
              <a href="#" className={`font-medium transition-all duration-300 hover:scale-105 ${
                scrollY > 50 ? 'text-gray-700 hover:text-teal-600' : 'text-white/90 hover:text-white'
              }`}>Contact</a>
              <button className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                scrollY > 50 ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
              }`} onClick={()=>navigate("/login")}>Login</button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrollY > 50 ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#" className="block px-3 py-2 text-gray-900 font-medium hover:bg-gray-100 rounded-lg">Features</a>
                <a href="#" className="block px-3 py-2 text-gray-900 font-medium hover:bg-gray-100 rounded-lg">About</a>
                <a href="#" className="block px-3 py-2 text-gray-900 font-medium hover:bg-gray-100 rounded-lg">Contact</a>
                <a href="#" className="block px-3 py-2 text-gray-900 font-medium hover:bg-gray-100 rounded-lg">Login</a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1887&auto=format&fit=crop)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-teal-900/40" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse delay-300" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-teal-400/10 rounded-full blur-2xl animate-pulse delay-700" />
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Your City's Transit,
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                in Real-Time.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Track your bus, reduce your wait, and travel smarter with City-Connect. 
              Built for small cities, designed for everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              onClick={()=>navigate("/register")}>
                <span className="flex items-center gap-2">
                  Get Started Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced User Selection Cards */}
      <section className="relative -mt-24 z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Commuter Card */}
            <div className="group bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 lg:p-10 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">For Commuters</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  See live bus locations, get accurate arrival times, and plan your journey with confidence. 
                  Never miss your ride again.
                </p>
                
                {/* Feature highlights */}
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-teal-500 flex-shrink-0" />
                    <span>Real-time bus tracking</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-teal-500 flex-shrink-0" />
                    <span>Accurate arrival predictions</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-teal-500 flex-shrink-0" />
                    <span>Route planning & notifications</span>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group-hover:from-teal-600 group-hover:to-teal-700">
                  Find Your Ride
                </button>
              </div>
            </div>

            {/* Driver Card */}
            <div className="group bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 lg:p-10 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Navigation className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">For Drivers</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Share your location, update your status, and help make public transport more reliable 
                  for your community.
                </p>
                
                {/* Feature highlights */}
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-gray-600 flex-shrink-0" />
                    <span>Easy location sharing</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-gray-600 flex-shrink-0" />
                    <span>Route management tools</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-gray-600 flex-shrink-0" />
                    <span>Passenger insights</span>
                  </div>
                </div>
                
                <button className="w-full border-2 border-gray-300 text-gray-800 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:-translate-y-0.5">
                  Start Your Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              A Smarter Way to Travel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our platform is designed for everyone, ensuring a seamless experience 
              even in low-connectivity areas. Built specifically for small and mid-size cities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="group text-center">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-3xl mb-8 group-hover:scale-110 transition-all duration-300">
                <MapPin className="h-10 w-10 text-teal-600" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Vehicle Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Watch your bus move on the map in real-time with GPS precision. 
                No more guessing or waiting in uncertainty.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl mb-8 group-hover:scale-110 transition-all duration-300">
                <Clock className="h-10 w-10 text-blue-600" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Accurate ETAs</h3>
              <p className="text-gray-600 leading-relaxed">
                Get reliable estimated arrival times based on real traffic conditions 
                and historical data to plan your schedule perfectly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center md:col-span-2 lg:col-span-1">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl mb-8 group-hover:scale-110 transition-all duration-300">
                <Shield className="h-10 w-10 text-green-600" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-700" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Reliable & Efficient</h3>
              <p className="text-gray-600 leading-relaxed">
                We help municipal corporations optimize routes and improve service quality 
                for better public transportation experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Complete Transit Solution</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for modern public transportation management and usage
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
              <Bell className="h-8 w-8 text-gray-700 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Smart Alerts</h3>
              <p className="text-gray-600 text-sm">Get notified about delays, route changes, and arrival updates.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
              <BarChart3 className="h-8 w-8 text-gray-700 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600 text-sm">Comprehensive insights into usage patterns and efficiency.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
              <Users className="h-8 w-8 text-gray-700 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Capacity Monitor</h3>
              <p className="text-gray-600 text-sm">Track bus occupancy levels for better journey planning.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
              <Navigation className="h-8 w-8 text-gray-700 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Route Optimization</h3>
              <p className="text-gray-600 text-sm">Dynamic route updates and efficient stop management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Commute?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of commuters and drivers who are already experiencing 
            smarter, more reliable public transportation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              Start Your Journey
            </button>
            <button className="border-2 border-gray-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-500 hover:bg-white/5 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Navigation className="h-6 w-6 text-teal-500" />
                <span className="text-xl font-bold">City-Connect</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Making public transport better for small cities. Connect, track, and travel smarter 
                with our comprehensive transit solution.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="w-5 h-5 bg-gray-400 rounded" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="w-5 h-5 bg-gray-400 rounded" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">For Commuters</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Drivers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} City-Connect. All Rights Reserved.</p>
            <p className="text-sm mt-1">Making public transport better for small cities.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}