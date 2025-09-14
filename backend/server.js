// server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const authRoutes = require("./Routes/authRoute.js");
// const driverRoutes = require("./Routes/driverroute.js");
// const cors = require("cors");
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { createClient } from "redis";


import authRoutes from "./Routes/authRoute.js";
//import driverRoutes from "./Routes/driverroute.js";

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
//app.use("/api", driverRoutes);

// 🔴 Connect Redis
const redisClient = createClient();
await redisClient.connect();

// Save user location in Redis
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("updateLocation", async ({ userId, latitude, longitude }) => {
    const location = {
      latitude,
      longitude,
      lastUpdated: new Date().toISOString(),
    };

    // Save in Redis with expiry (e.g., 2 minutes)
    await redisClient.set(`location:${userId}`, JSON.stringify(location), {
      EX: 120,
    });

    console.log(`Updated location for ${userId}`);
  });
});

// Endpoint to fetch live location of all users
app.get("/api/locations", async (req, res) => {
  const keys = await redisClient.keys("location:*");
  const locations = {};

  for (let key of keys) {
    const userId = key.split(":")[1];
    const loc = await redisClient.get(key);
    locations[userId] = JSON.parse(loc);
  }

  res.json(locations);
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
