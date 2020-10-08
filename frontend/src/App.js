import React, { useEffect, useState, useCallback } from 'react';
import useControl from './hooks/useControl';
import socket from './socket';
import IndexModal from './IndexModal';

function App() {
    const [controls, axes] = useControl();
    const [room, setRoom] = useState();

    useEffect(() => {
        if (room) socket.emit('controls', { room, controls });
    }, [room, controls]);

    useEffect(() => {
        if (room) socket.emit('gamepad', { room, axes });
    }, [room, axes]);

    const joinRoom = useCallback(room => {
        socket.emit('join-room', room);
        setRoom(room);
    }, []);

    return <>
        <IndexModal joinRoom={joinRoom} />
    </>;
}

export default App;
