// controller/googleAuthController.js (fixed: added provider, role handling, removed password: null)
import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuthController = async (req, res) => {
  try {
    const { token, role } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, message: "No Google token provided" });
    }

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    // Check if user already exists by email
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = new User({
        username: name,
        email,
        googleId,
        provider: "google",
        role: role || 'commutator'
      });
      await user.save();
    } else {
      // If user exists (e.g., local), link Google ID if not already set
      if (!user.googleId) {
        user.googleId = googleId;
        user.provider = "google"; // Update provider to google for this login method
        await user.save();
      }
    }

    // Generate JWT
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      success: true,
      message: "Google login successful",
      token: accessToken,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};

export default googleAuthController;