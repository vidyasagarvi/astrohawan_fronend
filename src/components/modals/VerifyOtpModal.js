import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Config from '../../config/Config';
import axios from 'axios';

const VerifyOtpModal = ({ show, handleClose, handleShowLogin,userID }) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const newErrors = {};

  const validateForm = () => {
      if (!otp) {
        newErrors.otp = t('placeholder_otp');
      }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleOTPSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await axios.post(`${Config.apiUrl}api/users/verify-otp`, { userID, otp });
      handleShowLogin();
      handleClose();
    } catch (error) {
      newErrors.otp = t('invalid_otp');
      setErrors(newErrors);
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('verify_otp')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Sent a verification code to your Mobile no</p>
        <Form>
          <Form.Group controlId="formOTP">
            <Form.Label>{t('otp_lable')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('placeholder_otp')}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              isInvalid={!!errors.otp}
            />
             {errors.otp && <Form.Text className="text-danger">{errors.otp}</Form.Text>}
          </Form.Group>
          <Button className='login_button btn border border-secondary rounded-pill px-5 text-primary' variant="primary" onClick={handleOTPSubmit} disabled={isLoading}>
            {isLoading ? t('loading') : t('confirm_otp')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default VerifyOtpModal;
