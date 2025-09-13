import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { app } from '../context/firebase';

// ---------- Global Styles ----------
const GlobalStyles = () => (
  <style>{`
    body {
        font-family: 'Inter', sans-serif;
        background-color: #f8f9fa;
        color: #212529;
    }
    .card {
        background-color: white;
        border-radius: 1rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        border: 1px solid #dee2e6;
    }
    .radio-card:checked + label {
        border-color: #14b8a6;
        --tw-ring-color: #14b8a6;
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
        background-color: #f0fdfa;
    }
  `}</style>
);

// ---------- Icons ----------
const UserIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SteeringWheelIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12h-3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12H3" />
  </svg>
);

const GoogleIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.902,36.638,44,30.833,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

// ---------- Component ----------
const Register = () => {
  const [role, setRole] = useState('rider');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Correct way to read form values
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username').trim();
    const email = formData.get('email').trim();
    const password = formData.get('password');

    const backendRole = role === 'rider' ? 'commutator' : 'driver';

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role: backendRole })
      });
const text = await res.text();
const data = text ? JSON.parse(text) : {};

if (!res.ok) throw new Error(data.message || 'Registration failed');

      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const googleLogin = async () => {
    try {
      setError('');
      const response = await signInWithPopup(auth, googleProvider);
      const user = response.user;
      localStorage.setItem('token', await user.getIdToken());
      navigate('/role');
    } catch (err) {
      console.error(err);
      setError('Failed to log in with Google.');
    }
  };

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full">
          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">

              {/* Left Side */}
              <div className="relative hidden lg:block lg:col-span-2">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1887&auto=format&fit=crop"
                  alt="A bus on a bridge in a city"
                />
                <div className="absolute inset-0 bg-teal-800 opacity-25"></div>
                <div className="relative p-12 flex flex-col justify-end h-full">
                  <h2 className="text-3xl font-bold text-white leading-tight">
                    Join the Network.
                  </h2>
                  <p className="text-white text-base mt-3 opacity-90">
                    Help make your city's transit smarter and more reliable for everyone.
                  </p>
                </div>
              </div>

              {/* Right Side: Registration Form */}
              <div className="p-12 md:p-16 col-span-1 lg:col-span-3">
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
                  <p className="text-base text-gray-600 mt-2">
                    Get started with City-Connect today.
                  </p>
                  {error && <p className="text-red-600 mt-2">{error}</p>}
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="e.g., jane_doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Role</label>
                      <fieldset className="mt-2">
                        <legend className="sr-only">Choose your role</legend>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <input type="radio" id="role-rider" name="role" value="rider"
                                   className="sr-only radio-card"
                                   checked={role === 'rider'}
                                   onChange={() => setRole('rider')} />
                            <label htmlFor="role-rider"
                                   className="flex flex-col items-center justify-center text-center rounded-md p-4 border border-gray-300 cursor-pointer hover:bg-gray-50">
                              <UserIcon className="h-7 w-7 text-gray-500 mb-2"/>
                              <span className="text-sm font-medium text-gray-800">Register as a Rider</span>
                            </label>
                          </div>

                          <div>
                            <input type="radio" id="role-driver" name="role" value="driver"
                                   className="sr-only radio-card"
                                   checked={role === 'driver'}
                                   onChange={() => setRole('driver')} />
                            <label htmlFor="role-driver"
                                   className="flex flex-col items-center justify-center text-center rounded-md p-4 border border-gray-300 cursor-pointer hover:bg-gray-50">
                              <SteeringWheelIcon className="h-7 w-7 text-gray-500 mb-2"/>
                              <span className="text-sm font-medium text-gray-800">Register as a Driver</span>
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                      Create Account
                    </button>
                  </div>
                </form>

                <div className="mt-6 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={googleLogin}
                    type="button"
                    className="group w-full flex justify-center items-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    <GoogleIcon className="h-5 w-5 mr-3" />
                    Sign up with Google
                  </button>
                </div>

                <p className="mt-8 text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium underline text-teal-400 hover:underline">
                    Login
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
