import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const ForgotPasswordModal = ({ show, handleClose, handleShowSignUp, handleLoginUser }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const newErrors = {};

  const validateForm = () => {
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
    if (!email) {
      newErrors.email = t('email_placeholder');
    } else if (!emailRegex.test(email)) {
      newErrors.email = t('email_invalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleForgotPasswordSubmit = async () => {
    if (!validateForm()) return; 
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/users/forgotpassword', { email });
      setIsSubmitted(true);
     // handleClose();
    } catch (error) {
      newErrors.email = t('email_notfound');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('forgot_password_link')}</Modal.Title>
      </Modal.Header>


      <Modal.Body>

        {!isSubmitted ? (
          <div></div>
        ) : (
            <div className="success-message">
              <p>A new password has been sent to your registered email address. Please check your inbox</p>
          </div>
        )}

        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>{t('email_title')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('email_placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
             {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
          </Form.Group>
          <Button className='login_button btn border border-secondary rounded-pill px-5 text-primary' variant="primary" onClick={handleForgotPasswordSubmit} disabled={isLoading}>
            {isLoading ? t('loading') : t('submit')}
          </Button>

          <div className="model-link-bottom d-flex justify-content-between mt-4">
            <a className='right' href="#sign-up" onClick={handleShowSignUp}>{t('sign_up_link')}</a>
            <a className='right' href="#" onClick={handleLoginUser}>{t('dailog_login_title')}</a>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
