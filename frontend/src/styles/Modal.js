import styled from 'styled-components';

export const ModalBackground = styled.div`
    display: fixed;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-width: 100vw;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 10px;
    background-color: white;
    transform: translate(-50%, -50%);
`;
