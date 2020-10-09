require('dotenv').config();
const { IP_ADDRESS, PORT, ID } = process.env; 
const io = require('socket.io-client');
const socket = io(`${IP_ADDRESS}:${PORT}`);

console.log(ID);

socket.emit('join-room', ID);

socket.on('controls', axes => {
    console.log(axes)
    calculateWheelVelocity(axes);
})

