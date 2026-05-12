// server.js

import express from "express";
import { WebSocketServer } from "ws";
import http from "http";

const app = express();

app.use(express.static("public"));

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {

  console.log("User connected");

  socket.on("message", (data) => {

    // Broadcast to everybody
    wss.clients.forEach((client) => {
      client.send(data.toString());
    });

  });

  socket.on("close", () => {
    console.log("User disconnected");
  });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
