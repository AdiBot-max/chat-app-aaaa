import express from "express";
import { WebSocketServer } from "ws";
import http from "http";

const app = express();

app.use(express.static("public"));

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (data) => {
    const message = data.toString();

    // Send message to ALL clients
    wss.clients.forEach((client) => {
      client.send(message);
    });
  });

  socket.on("close", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
