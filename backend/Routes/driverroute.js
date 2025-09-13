const express = require("express");
const router = express.Router();
const { getDriverDashboard } = require("../controllers/driverController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/driver/dashboard", authMiddleware, getDriverDashboard);

module.exports = router;
