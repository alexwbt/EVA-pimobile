import { useEffect, useState } from "react";
import socket from "../socket";

const keyMap = [
    'w', 'a', 's', 'd',
    'ArrowUp', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
];

const useControl = () => {
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
};

export default useControl;
