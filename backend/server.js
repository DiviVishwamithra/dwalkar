require("dotenv").config({
  override: true,
});

const express = require("express");
const cors = require("cors");
const http = require("http");

const aiRoutes = require("./routes/ai");
const generateRoutes = require("./routes/generate");

const { Server } = require("socket.io");
const socketService = require("./services/socket/socketService");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketService.initialize(io);

io.on("connection", (socket) => {
  console.log("Socket Connected:", socket.id);

  socket.on("join-job", (jobId) => {
    socket.join(jobId);

    console.log(`Socket joined job ${jobId}`);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", aiRoutes);
app.use("/api/generate", generateRoutes);

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
