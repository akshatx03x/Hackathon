const express = require("express")
const mongoose = require('mongoose');
import { PORT, MONGO_URI } from "./config.js"
const dotenv = require("dotenv")
const authRoutes =require("./Routes/authRoute.js")

const app = express(  )
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use("/api/auth",authRoutes)
  
app.listen(PORT , ()=>{
    console.log("Server running on 5000");
})