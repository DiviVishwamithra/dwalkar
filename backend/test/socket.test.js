const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected");

  socket.emit("join-job", "job-001");
});

socket.on("planner", (data) => {
  console.log(data);
});
