import React from 'react';

// A simple component to inject the necessary global styles.
const GlobalStyles = () => (
  <style>{`
    body {
        font-family: 'Inter', sans-serif;
        background-color: #f8f9fa;
        color: #212529;
    }
    .hero-bg {
        background-image: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1887&auto=format&fit=crop');
        background-size: cover;
        background-position: center;
    }
  `}</style>
);

// SVG Icon components for clarity
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);


const App = () => {
  return (
    <>
      <GlobalStyles />
      <div className="antialiased">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-10 py-4 px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">City-Connect</div>
                <div className="space-x-4">
                    <a href="#" className="text-white opacity-80 hover:opacity-100 transition">About</a>
                    <a href="#" className="text-white opacity-80 hover:opacity-100 transition">Contact</a>
                </div>
            </nav>
        </header>

        {/* Hero Section */}
        <main>
          <div className="relative hero-bg">
            <div className="min-h-[60vh] md:min-h-[70vh] flex items-center justify-center">
              <div className="text-center text-white p-4">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                  Your City's Transit, in Real-Time.
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                  Track your bus, reduce your wait, and travel smarter with City-Connect.
                </p>
              </div>
            </div>
          </div>

          {/* Login Selection Section */}
          <div className="bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Commuter Card */}
                <div className="bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center">
                  <h2 className="text-2xl font-bold text-gray-800">For Commuters</h2>
                  <p className="mt-2 text-gray-600">
                    See live bus locations, get accurate arrival times, and plan your journey with confidence.
                  </p>
                  <a href="#" className="mt-6 w-full max-w-xs inline-block py-3 px-6 border border-transparent rounded-md text-center text-white font-medium bg-teal-600 hover:bg-teal-700 transition-colors">
                    Find Your Ride
                  </a>
                </div>

                {/* Driver Card */}
                <div className="bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center">
                  <h2 className="text-2xl font-bold text-gray-800">For Drivers</h2>
                  <p className="mt-2 text-gray-600">
                    Share your location, update your status, and help make public transport more reliable.
                  </p>
                   <a href="#" className="mt-6 w-full max-w-xs inline-block py-3 px-6 border border-gray-300 rounded-md text-center text-gray-700 font-medium bg-gray-50 hover:bg-gray-100 transition-colors">
                    Start Your Trip
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features Section */}
          <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">A smarter way to travel</h2>
                    <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                        Our platform is designed for everyone, ensuring a seamless experience even in low-connectivity areas.
                    </p>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center">
                            <div className="flex-shrink-0 bg-teal-100 rounded-full p-4">
                               <MapPinIcon />
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">Live Vehicle Tracking</h3>
                            <p className="mt-2 text-gray-600">
                                Watch your bus or taxi move on the map in real-time. No more guessing.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                             <div className="flex-shrink-0 bg-teal-100 rounded-full p-4">
                               <ClockIcon />
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">Accurate ETAs</h3>
                            <p className="mt-2 text-gray-600">
                                Get reliable estimated arrival times for your stop to plan your schedule perfectly.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex-shrink-0 bg-teal-100 rounded-full p-4">
                               <ShieldCheckIcon />
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">Reliable & Efficient</h3>
                            <p className="mt-2 text-gray-600">
                                We help municipal corporations optimize routes and improve service for everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white">
            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
                <p>&copy; {new Date().getFullYear()} City-Connect. All Rights Reserved.</p>
                <p className="text-sm text-gray-400 mt-1">Making public transport better for small cities.</p>
            </div>
        </footer>
      </div>
    </>
  );
};

export default App;
