// controller/authController.js (updated loginUser to use email)
import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    
      role: role || 'commutator'
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { username: newUser.username, email: newUser.email, role: newUser.role }
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// LOGIN (updated to use email instead of username)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid User" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return res.status(400).json({ success: false, message: "Invalid Password" });

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.status(200).json({ success: true, message: "Login successful", token });

  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Server error" });
  }
};