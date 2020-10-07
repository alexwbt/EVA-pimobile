require('dotenv').config();
const { PORT } = process.env;
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
    socket.on('join-room', room => {
        socket.join(room);
    });

    socket.on('controls', data => {
        console.log(data);
        io.to('pimobile').emit('controls', data);
    });

    socket.on('gamepad', data => {
        console.log(data);
        io.to('pimobile').emit('gamepad', data);
    });
});

http.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});
