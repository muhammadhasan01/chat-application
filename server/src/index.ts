import {Server, Socket} from "socket.io";
import express from "express";
import {createServer} from "http";
import router from "./router";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket: Socket) => {
  console.log(`We have a new connection ${socket}`);
  socket.on("disconnect", () => {
    console.log("User have been disconnected...");
  })
})

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

export {};
