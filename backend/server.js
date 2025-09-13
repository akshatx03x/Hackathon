const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./Routes/authRoute.js");
const driverRoutes = require("./Routes/driverroute.js");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

dotenv.config();                       // <-- must run before using process.env

const PORT = process.env.PORT || 5000;  // <-- read from .env
const MONGO_URI = process.env.MONGO_URI;


app.use(express.json());

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api", driverroute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
