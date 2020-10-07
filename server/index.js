require('dotenv').config();
const { PORT } = process.env;
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
    socket.on('controls', data => {
        console.log(data);
    });
});

http.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});
