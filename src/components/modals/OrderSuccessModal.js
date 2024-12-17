import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const OrderSuccessModal = ({ show, handleClose}) => {

    const navigate = useNavigate();

    const handleCloseModal = async () => {
        handleClose();
        window.location.reload();
        navigate('/');
      }
  return (
    <Modal show={show} onClick={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Thank You for Your Order!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <div className="success-message">
              <p>Your order has been successfully placed. Order details has been sent to your registered Email check your Inbox</p>
          </div>
      </Modal.Body>
    </Modal>
  );
};

export default OrderSuccessModal;
