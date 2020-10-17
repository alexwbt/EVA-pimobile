require('dotenv').config();
const { IP_ADDRESS, ID } = process.env;
const io = require('socket.io-client');
const socket = io(IP_ADDRESS);
// const Controls = require('./controls')
const { on, off } = require('./gpio-test')

console.log(ID);

socket.emit('join-room', ID);

socket.on('controls', axes => {
    // Controls.calculateWheelVelocity(axes);

    // test
    if (axes[0]) on();
    else off();
});
