require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const aiRoutes = require("./routes/ai");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", aiRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Dwalkar Backend is running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Dwalkar Backend running on port ${PORT}`);
});
