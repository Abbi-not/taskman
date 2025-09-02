const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");

dotenv.config();
const app = express();

// CORS setup to allow requests from React frontend
app.use(cors({ origin: "http://localhost:3000" }));

// Parse JSON
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

// Test route
app.get("/", (req, res) => res.send("Task Manager API is running ✅"));

module.exports = app;
