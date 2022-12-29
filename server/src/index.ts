const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const router = require('./router');

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(router);
const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

export {};
