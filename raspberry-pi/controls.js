const { Gpio } = require('pigpio');

class Wheel {
    constructor(pins) {
        this.speedPin = new Gpio(pins.speed, { mode: Gpio.OUTPUT });
        this.forwardPin = new Gpio(pins.forward, { mode: Gpio.OUTPUT });
        this.backwardPin = new Gpio(pins.backward, { mode: Gpio.OUTPUT });
    }

    update(velocity) {
        let speed = Math.min(1, Math.abs(velocity)) * 255;
        this.speedPin.analogWrite(speed);
        this.forwardPin.digitalWrite(velocity > 0 ? 1 : 0);
        this.backwardPin.digitalWrite(velocity < 0 ? 1 : 0);
    }
}

const leftFrontWheel = new Wheel();
const leftBackWheel = new Wheel();
const rightFrontWheel = new Wheel();
const rightBackWheel = new Wheel();

const calculateWheelVelocity = ([vy, vx, w0]) => {
    // console.log(axes)
    // const l1 = Number(process.env.HORIZONTAL_WHEEL_CENTER_DISTANCE);
    // const l2 = Number(process.env.VERTICAL_WHEEL_CENTER_DISTANCE);
    // const r = Number(process.env.WHEEL_RADIUS);

    leftFrontWheel.update(vx + vy - w0);
    rightFrontWheel.update(vx - vy + w0);
    leftBackWheel.update(vx - vy - w0);
    rightBackWheel.update(vx + vy + w0);
}

module.exports = {
    calculateWheelVelocity
};
