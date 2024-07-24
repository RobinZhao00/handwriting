import React, { useState, useEffect } from 'react';
import './Modal.scss';

const Modal = ({ children, show, footer, onClose, header }) => {

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(show);
  }, [show]);
  const handleClose = (e) => {
    e.stopPropagation();
    setShowModal(false);
    onClose && onClose();
  };

  const handleClickContent = (e) => {
    e.stopPropagation();
  };

  return (<>
    {showModal ? (
      <div className="mask" onClick={handleClose}>
        <div className="modal-container" onClick={handleClickContent}>
          <div className="cancel" onClick={handleClose}></div>
          {header ? header : null}
          <div className="modal-body">
            {children}
          </div>
          {footer ? footer : null}
        </div>
      </div>
    ) : null}
  </>);
};

export default Modal;
