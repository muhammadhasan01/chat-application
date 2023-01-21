import {Server, Socket} from "socket.io";
import express from "express";
import cors from "cors";
import {createServer} from "http";
import router from "./router";
import dotenv from "dotenv";
import {ChatProp} from "./helper/interfaces";
import {addUser, getUser, getUserNamesInRoom, removeUser} from "./helper/users";

dotenv.config();

const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.ORIGIN || "http://localhost:5173/";

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ORIGIN,
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket: Socket) => {
  console.log(`We have a new connection with the id = ${socket.id}`);

  socket.on("join", ({name, room}: ChatProp, callback: Function) => {
    const {error, user} = addUser({id: socket.id, name, room});
    if (error || !user) {
      return callback(error);
    }

    console.log("joined with us is the user =", {user});

    socket.emit("message", {user: "Admin", text: `${user.name}, welcome to the room ${user.room}`})
    socket.broadcast.to(user.room).emit("message", {user: "admin", text: `${user.name}, has joined!`});

    socket.join(user.room);

    io.to(user.room).emit("roomData", {users: getUserNamesInRoom(user.room)});
    callback();
  })

  socket.on("sendMessage", (text: string, callback: Function) => {
    const user = getUser(socket.id);

    if (!user) {
      console.log("cannot found for user with id =", socket.id);
      return callback({error: `No user was found with the id=${socket.id}`})
    }

    console.log("received text of =", text, "from user", {user});
    io.to(user.room).emit("message", {user: user.name, text});
    io.to(user.room).emit("roomData", {users: getUserNamesInRoom(user.room)})

    callback();
  });

  socket.on("disconnect", () => {
    console.log(`User with id = ${socket.id} have been disconnected...`);
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {user: "admin", text: `${user.name} has left`})
    }
  })
})

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
