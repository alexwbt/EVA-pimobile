import React, { useCallback, useState } from 'react';
import useInput from './hooks/useInput';
import { ModalBackground, ModalContainer } from './styles/Modal';
import { Text, Input } from './styles/Form';

const IndexModal = ({ joinRoom }) => {
    const [room, setRoom] = useInput();
    const [show, setShow] = useState(true);

    const onKeyDown = useCallback(e => {
        if (e.key === 'Enter' && room.trim()) {
            joinRoom(room);
            setShow(false);
        }
    }, [room, joinRoom]);

    return show && <ModalBackground>
        <ModalContainer>
            <Text>Enter pimobile ID:</Text>
            <Input value={room} onChange={setRoom} onKeyDown={onKeyDown} autoFocus={true} />
        </ModalContainer>
    </ModalBackground>;
};

export default IndexModal;
