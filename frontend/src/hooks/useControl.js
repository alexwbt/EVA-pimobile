import { useEffect, useState } from "react";
import socket from "../socket";

const keyMap = [
    'w', 'a', 's', 'd',
    'ArrowUp', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
];

const useControl = () => {
    // keyboard
    const [controls, setControls] = useState([]);

    useEffect(() => {
        socket.emit('controls', controls);
    }, [controls]);

    useEffect(() => {
        const downKeys = new Set();
        const update = () => {
            setControls(keyMap.map(key => downKeys.has(key)));
        };
        const keyDown = e => {
            if (e.repeat) return;
            downKeys.add(e.key);
            update();
        };
        const keyUp = e => {
            if (e.repeat) return;
            downKeys.delete(e.key);
            update();
        };
        window.addEventListener('keydown', keyDown);
        window.addEventListener('keyup', keyUp);
        return () => {
            window.removeEventListener('keydown', keyDown);
            window.removeEventListener('keyup', keyUp);
        };
    }, []);

    // gamepad
    const [axes, setAxes] = useState([]);

    useEffect(() => {
        socket.emit('gamepad', axes);
    }, [axes]);

    useEffect(() => {
        let interval = false;
        const connected = () => {
            const axes = [];
            interval = setInterval(() => {
                for (const gamepad of navigator.getGamepads())
                    if (gamepad) for (const [index, axis] of gamepad.axes.entries())
                        if (axes[index] !== axis) {
                            axes[index] = axis;
                            setAxes(axes.slice());
                        }
            });
        };
        window.addEventListener('gamepadconnected', connected);
        return () => {
            window.removeEventListener('gamepadconnected', connected);
            clearInterval(interval);
        };
    }, []);
};

export default useControl;
