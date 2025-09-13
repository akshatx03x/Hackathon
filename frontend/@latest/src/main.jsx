import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Login from './components/Login.jsx'
import Homepage from './components/Homepage.jsx'
import Register from './components/Register.jsx'
import Role from './components/Role.jsx'
import User from './components/User.jsx'
import Driver from './components/driver.jsx'
import SuperAdminDashboard from './components/SuperAdmin.jsx'  

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/role" element={<Role/>}/>
      <Route path="/user" element={<User/>}/>
      <Route path="/driver" element={<Driver/>}/>
       <Route path="/SuperAdmin" element={<SuperAdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
)
