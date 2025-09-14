import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const GoogleIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.902,36.638,44,30.833,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setError("");
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      console.error("AxiosError:", err.response?.data);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const res = await axios.post("http://localhost:5000/api/auth/google", { token });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Google login failed.");
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed.");
  };

  return (
    <div className="bg-gray-50 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl">
        <div className="overflow-hidden rounded-xl bg-white shadow-lg shadow-gray-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="relative hidden lg:col-span-2 lg:block">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1887&auto=format&fit=crop"
                alt="City transit"
              />
              <div className="absolute inset-0 bg-teal-800 opacity-25"></div>
              <div className="relative flex h-full flex-col justify-end p-12">
                <h2 className="text-3xl font-bold text-white">Join the Network.</h2>
                <p className="mt-3 text-base text-white opacity-90">
                  Help make your city's transit smarter and more reliable for everyone.
                </p>
              </div>
            </div>
            <div className="col-span-1 p-8 md:p-12 lg:col-span-3">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900">Log in to your Account</h1>
                <p className="mt-2 text-base text-gray-600">Welcome back! Please log in to continue.</p>
              </div>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email-address" className="text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-teal-600 px-4 py-3 text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500"
                  >
                    Log in
                  </button>
                </div>
              </form>
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-3 text-gray-500">Or</span>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  text="signin_with"
                />
              </div>
              {error && <p className="mt-4 text-red-500">{error}</p>}
              <p className="mt-2 flex justify-center">
                Don&apos;t have an account?
                <Link className="font-medium underline text-teal-400 ml-2 text-sm" to="/register">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;