import React from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';

const CustomAlert = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          background: '#203947',
          top: '50%',
          left: '50%',
          border: 'none',
          height: 'fit-content',
          transform: 'translate(-50%, -50%)',
          padding: '20px 20px 60px 20px',
          borderRadius: '8px',
          boxShadow: '1px 1px 10px #000',
        },
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
      }}
    >
      <h2>Notification</h2>
      <p>{message}</p>
      <Button variant="outline-primary"
        claaName="modal-button" onClick={onClose} style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px'
        }}>Close</Button>
    </Modal>
  );
};

export default CustomAlert;