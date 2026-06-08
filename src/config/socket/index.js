const { Server } = require("socket.io");
let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      // pingTimeout: 60000,
      // pingInterval: 25000,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });

    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });

    socket.on("leave-room", (room) => {
      socket.leave(room);
      console.log(`Socket ${socket.id} left room ${room}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = { initSocket, getIO };
