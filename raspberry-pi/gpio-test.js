const { Gpio } = require('pigpio');

const pin = new Gpio(36, { mode: Gpio.OUTPUT });

module.exports = {
    on: () => pin.digitalWrite(1),
    off: pin.digitalWrite(0)
};
