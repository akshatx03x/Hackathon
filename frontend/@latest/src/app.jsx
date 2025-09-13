import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, 
    getDoc,
    collection,
    query,
    where,
    getDocs
} from 'firebase/firestore';


const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';




const DriverDashboard = ({ user, db, onLogout }) => {
    const [routes, setRoutes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!db || !user?.uid) {
            setIsLoading(false);
            return;
        }

        const fetchRoutes = async () => {
            try {
                const routesCollectionRef = collection(db, `/artifacts/${appId}/public/data/routes`);
                const q = query(routesCollectionRef, where("driverId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const fetchedRoutes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setRoutes(fetchedRoutes);
            } catch (err) {
                console.error("Error fetching routes: ", err);
                setError("Could not load assigned routes.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoutes();
    }, [db, user]);

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 animate-fade-in">
            <div className="max-w-5xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Driver Dashboard</h1>
                    <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Logout</button>
                </header>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Assigned Routes</h2>
                    <div className="space-y-4">
                        {isLoading && <p>Loading routes...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {!isLoading && routes.length === 0 && <p>No routes assigned for today.</p>}
                        {!isLoading && routes.map(route => (
                            <div key={route.id} className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <div>
                                    <p className="font-bold text-lg text-gray-900">{route.from} ➔ {route.to}</p>
                                    <p className="text-sm text-gray-500">Route ID: {route.id} | Platform: {route.platform}</p>
                                </div>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${route.status === 'On Time' ? 'bg-green-100 text-green-800' : route.status === 'Delayed' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>{route.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CommutatorDashboard = ({ onLogout }) => {
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 animate-fade-in">
            <div className="max-w-5xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, Commutator!</h1>
                    <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Logout</button>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Find Nearest Bus</h3>
                        <p className="text-gray-600">See real-time locations of buses near you.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Book a Ride</h3>
                        <p className="text-gray-600">Schedule your trip in advance.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">View Ride History</h3>
                        <p className="text-gray-600">Check your past and upcoming trips.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RolePage = ({ user, db, onLogout }) => {
    const styles = `@keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }`;

    if (user.role === 'driver') {
        return <><style>{styles}</style><DriverDashboard user={user} db={db} onLogout={onLogout} /></>;
    }
    
    if (user.role === 'commutator') {
        return <><style>{styles}</style><CommutatorDashboard onLogout={onLogout} /></>;
    }

    return (
        <div className="min-h-screen flex justify-center items-center text-center p-4">
            <div>
                <p className="text-lg text-red-600 font-semibold">Your user profile does not have a valid role assigned.</p>
            </div>
        </div>
    );
};


const LoginScreen = ({ onLogin, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center p-4">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800">Transport Management Portal</h1>
                <p className="text-gray-600">Please log in to continue</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="user@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="password" />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default function App() {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(null);
    const [db, setDb] = useState(null);
    const [status, setStatus] = useState('authenticating');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        if (Object.keys(firebaseConfig).length === 0) {
            console.error("Firebase config is missing.");
            setStatus('error');
            return;
        }

        const app = initializeApp(firebaseConfig);
        const authInstance = getAuth(app);
        const dbInstance = getFirestore(app);
        setAuth(authInstance);
        setDb(dbInstance);

        const unsubscribe = onAuthStateChanged(authInstance, async (authUser) => {
            if (authUser && !authUser.isAnonymous) {
                const userDocRef = doc(dbInstance, `/artifacts/${appId}/public/data/users`, authUser.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUser({ uid: authUser.uid, ...userDoc.data() });
                    setStatus('logged-in');
                } else {
                    console.error("User document not found for UID:", authUser.uid);
                    await signOut(authInstance);
                }
            } else {
                setUser(null);
                setStatus('logged-out');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async (email, password) => {
        setLoginError('');
        if (!auth) return;
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setLoginError('Invalid email or password.');
            console.error("Login error:", error);
        }
    };

    const handleLogout = async () => {
        if (!auth) return;
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (status === 'authenticating') {
        return <div className="min-h-screen flex justify-center items-center"><p>Loading Application...</p></div>;
    }

    if (user && db) {
        return <RolePage user={user} db={db} onLogout={handleLogout} />;
    }
    
    return <LoginScreen onLogin={handleLogin} error={loginError} />;
}

