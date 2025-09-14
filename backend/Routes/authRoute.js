// Routes/authRoute.js (removed unused import)
import express from "express";
import { registerUser, loginUser } from "../controller/authController.js";
import googleAuthController from '../controller/googleAuthController.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/google', googleAuthController);

export default router;