const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });
});

server.listen(3001, () => {
  console.log("server is running");
});
