require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Public Route
app.get("/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

// Login Route (Generate JWT Token)
app.post("/login", (req, res) => {
  const user = { id: 1, username: "testuser" }; // Dummy user
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Token required" });

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
}

// Protected Route
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

module.exports = app;
