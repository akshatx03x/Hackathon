import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'

import Login from './components/Login.jsx'
import Homepage from './components/Homepage.jsx'
import Register from './components/Register.jsx'
import Role from './components/Role.jsx'
import User from './components/User.jsx'
import Driver from './components/driver.jsx'
import SuperAdminDashboard from './components/SuperAdmin.jsx'
import MapView from './components/MapView.jsx'

// ✅ Replace with your real client ID
const GOOGLE_CLIENT_ID = "484107455321-21p2gog5t9bs2so07ka3tbffk6mha2m3.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role" element={<Role />} />
        <Route path="/user" element={<User />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/map" element={<MapView/>} />
        <Route path="/SuperAdmin" element={<SuperAdminDashboard />} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
)
