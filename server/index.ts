const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));


