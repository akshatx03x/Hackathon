// const { OAuth2Client } = require("google-auth-library");
// const User = require("../model/userSchema.js");
// const jwt = require("jsonwebtoken");
import { OAuth2Client } from "google-auth-library";
import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

 const googleLogin = async (req, res) => {
  try {
    const { token } = req.body; // from frontend Google sign-in
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { sub, email, name } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        username: name,
        email,
        googleId: sub,
        provider: "google",
      });
    }

    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.json({
      success: true,
      message: "Google login successful",
      token: jwtToken,
      user,
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ success: false, message: "Google login failed" });
  }
};

// module.exports = { googleLogin };
 export default googleLogin;
