import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Config from '../../config/Config';
import axios from 'axios';
import loginImage from '../../assets/shiv.jpg';

const LoginModal = ({ show, handleClose, handleShowSignUp, handleShowForgotPassword, handleLoginSuccess }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [invalidCredentials, setInvalidCredentials] = useState('');
  const newErrors = {};

  const validateForm = () => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
    if (!email) {
      newErrors.email = t('email_placeholder');
    } else if (!emailRegex.test(email)) {
      newErrors.email = t('email_invalid');
    }


    if (!password) newErrors.password = t('password_required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(`${Config.apiUrl}api/users/login`, { email, password });
      localStorage.setItem('token', response.data.user.id);
      handleLoginSuccess();
      handleClose();
    } catch (error) {
      setInvalidCredentials(t('invalid_credentials'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className='login-model'>
      <Row className="no-gutters">

      <Modal.Header closeButton>
            <Modal.Title>{t('dailog_login_title')}</Modal.Title>
        </Modal.Header>
  
        <Col xs={12} md={6} className="d-none d-md-block">
   
          <img src={loginImage} alt="Login" className="img-fluid" />
        </Col>
        <Col xs={12} md={6} className="p-4">
       
          <Modal.Body >
            <Form>
              <Form.Group controlId="formMobile">
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
              <Form.Group controlId="formPassword">
                <Form.Label>{t('password_title')}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t('password_placeholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                />
                {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
              </Form.Group>
              <Button className="login_button btn border border-secondary rounded-pill px-5 text-primary" onClick={handleLoginSubmit} disabled={isLoading}>
                {isLoading ? t('loading') : t('dailog_login_title')}
              </Button>
              {invalidCredentials && <Form.Text className="text-danger">{invalidCredentials}</Form.Text>}
              <div className="model-link-bottom d-flex justify-content-between mt-4">
                <a href="#forgot-password" onClick={handleShowForgotPassword}>{t('forgot_password_link')}</a>
                <a href="#sign-up" onClick={handleShowSignUp}>{t('sign_up_link')}</a>
              </div>
            </Form>
          </Modal.Body>
        </Col>
      </Row>
    </Modal>
  );
};

export default LoginModal;
