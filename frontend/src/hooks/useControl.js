import { useEffect, useState } from "react";

const keyMap = [
    'w', 'a', 's', 'd',
    'ArrowUp', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
];

const useControl = () => {
    const [axes, setAxes] = useState([]);

    // keyboard
    useEffect(() => {
        const downKeys = new Set();
        const update = () => {
            const controls = keyMap.map(key => downKeys.has(key));
            let x1 = 0;
            let y1 = 0;
            let x2 = 0;
            let y2 = 0;
            // w a s d
            if (controls[0]) y1++;
            if (controls[1]) x1--;
            if (controls[2]) y1--;
            if (controls[3]) x1++;
            // up down left right
            if (controls[4]) y2++;
            if (controls[5]) y2--;
            if (controls[6]) x2--;
            if (controls[7]) x2++;

            const d1 = Math.atan2(y1, x1);
            if (x1) x1 = Math.cos(d1);
            if (y1) y1 = Math.sin(d1);
            const d2 = Math.atan2(y2, x2);
            if (x2) x2 = Math.cos(d2);
            if (y2) y2 = Math.sin(d2);

            setAxes([x1, y1, x2, y2]);
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

    return axes;
};

export default useControl;
