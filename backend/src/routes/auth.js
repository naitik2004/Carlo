import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    
    res.status(201).json({ message: "User created", user: { id: user._id, name, email } });
  } catch (error) {
    console.error("Signup error details:", error);
    if (error.name === "MongooseError" || error.name === "MongoNetworkError") {
      return res.status(503).json({ message: "Database connection error. Please try again later." });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return res.status(500).json({ message: "JWT_SECRET is missing in environment variables" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login error details:", error);
    if (error.name === "MongooseError" || error.name === "MongoNetworkError") {
      return res.status(503).json({ message: "Database connection error: " + error.message });
    }
    res.status(500).json({ message: "Internal server error: " + error.message });
  }
});

export default router;
