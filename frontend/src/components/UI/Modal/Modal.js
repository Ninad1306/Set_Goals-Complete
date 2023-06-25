import './Modal.css';
import {Fragment} from 'react';
import ReactDom from 'react-dom';

const BackDrop = () => {
    return (
        <div className='backdrop' />
    )
};

const ModalOverlay = (props) => {
    return (
        <div className='modal'>
            <div className='content'>{props.children}</div>
        </div>
    )
};

const portalElement = document.getElementById('overlay');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDom.createPortal(<BackDrop />,portalElement )}
            {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
        </Fragment>
    )
}

export default Modal;