const setWheels = (coordinates) => {
    // Should be some GPIO stuff. 
}

const calculateWheelVelocity = (axes) => {
    // console.log(axes)
    const wheelVelocities = {};
    const vx = axes[1];
    const vy = axes[0];
    const w0 = axes[2];
    const l1 = Number(process.env.HORIZONTAL_WHEEL_CENTER_DISTANCE);
    const l2 = Number(process.env.VERTICAL_WHEEL_CENTER_DISTANCE);
    const r = Number(process.env.WHEEL_RADIUS);
    const angular_velocity = ((l1 + l2) * w0);

    wheelVelocities.leftFront = (vx + vy - angular_velocity) / r;
    wheelVelocities.rightFront = (vx - vy + angular_velocity) / r;
    wheelVelocities.leftBack = (vx - vy - angular_velocity) / r;
    wheelVelocities.rightBack = (vx + vy + angular_velocity) / r;

    console.log(wheelVelocities)

    // setWheels(wheelVelocities);
}

module.exports = {
    calculateWheelVelocity
} 
