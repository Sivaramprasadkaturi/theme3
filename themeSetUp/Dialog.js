
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from "styled-components";


const Modal = styled.dialog`
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 30px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background: repeating-linear-gradient(
        30deg,
        rgba(24, 194, 236, 0.2),
        rgba(24, 194, 236, 0.2) 1px,
        rgba(24, 194, 236, 0.3) 1px,
        rgba(24, 194, 236, 0.3) 20px
    );
    backdrop-filter: blur(1px);
`;

const animatetop = keyframes`
    from {
        top:-300px; 
        opacity:0
    } 
    to {
        top:0; 
        opacity:1
    }
`;

const ModalContent = styled.div`
 position: relative;
  background-color: #fff;
  margin: auto;
  padding: 0;
  border: 0px solid #888;
  width: 95%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: ${animatetop};
  animation-duration: 0.4s;
`;

const ModalHeader = styled.div`
        padding: 10px 16px;
        background-color: #fff;
        color: #000;
        border-bottom: 1px solid #000;
        font-size: 24px;
        font-family: 'Poppins', sans-serif;
`;

const Close = styled.span`
    color: #222;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
`;

const ModalBody = styled.div`
    padding: 2px 16px;
`;

const Dialog = props => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.open);
    }, [props.open]);

    const closeDialog = () => {
        setShow(false);
        props.callback()
    }

    return(
        <Modal open={show}>
            <ModalContent>
                <ModalHeader>
                    <Close onClick={ closeDialog }>&times;</Close>
                    <h2>{ props.header }</h2>
                </ModalHeader>
                <ModalBody>
                    { props.body }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default Dialog;