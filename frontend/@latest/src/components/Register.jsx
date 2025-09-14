// Register.jsx (added GoogleOAuthProvider wrapper, fixed import)
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // Added GoogleOAuthProvider

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

const Register = () => {
  const [role, setRole] = useState("rider");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Manual register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password");
    const backendRole = role === "rider" ? "commutator" : "driver";

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role: backendRole }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      localStorage.setItem("token", data.token); // Add token storage for consistency
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Registration successful! Redirecting...");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Google OAuth
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const backendRole = role === "rider" ? "commutator" : "driver";

      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token,
        role: backendRole,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/"); // Changed to "/" for consistency; adjust if /role is needed for further setup
    } catch (err) {
      console.error(err);
      setError("Google signup failed.");
    }
  };

  const handleGoogleError = () => {
    setError("Google signup failed.");
  };

  return (
    <GoogleOAuthProvider clientId="484107455321-21p2gog5t9bs2so07ka3tbffk6mha2m3.apps.googleusercontent.com">
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl overflow-hidden grid lg:grid-cols-5">
          {/* Left image */}
          <div className="relative hidden lg:block lg:col-span-2">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1887&auto=format&fit=crop"
              alt="Transit"
            />
            <div className="absolute inset-0 bg-teal-800 opacity-25"></div>
          </div>

          {/* Right form */}
          <div className="p-10 col-span-3">
            <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
            <p className="mt-2 text-gray-600">Join the network today.</p>
            {error && <p className="text-red-600 mt-2">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Username</label>
                <input name="username" type="text" required className="w-full px-4 py-3 border rounded-md mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input name="email" type="email" required className="w-full px-4 py-3 border rounded-md mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input name="password" type="password" required className="w-full px-4 py-3 border rounded-md mt-1" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Role</label>
                <div className="flex gap-4 mt-2">
                  <label>
                    <input type="radio" name="role" value="rider" checked={role==='rider'} onChange={() => setRole('rider')} />
                    Rider
                  </label>
                  <label>
                    <input type="radio" name="role" value="driver" checked={role==='driver'} onChange={() => setRole('driver')} />
                    Driver
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full bg-teal-600 text-white py-3 rounded-md">
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">Or</div>

            {/* GoogleLogin component directly */}
            <div className="mt-4 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>

            <p className="mt-6 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-500 underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;