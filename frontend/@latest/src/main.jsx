import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Login from './components/Login.jsx'
import Homepage from './components/Homepage.jsx'
import Register from './components/Register.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
)
