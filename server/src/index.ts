import {Socket} from "socket.io";

const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const socketio = require('socket.io');
const router = require('./router');

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket: Socket) => {
  console.log(`We have a new connection ${socket}`);
  socket.on("disconnect", () => {
    console.log("User have been disconnected...");
  })
})

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

export {};
