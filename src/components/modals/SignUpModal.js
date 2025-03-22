import React, { useState } from 'react';
import Select from "react-select";
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Config from '../../config/Config';
import axios from 'axios';
import countryCodes from "./countryCodes";

const SignUpModal = ({ show, handleClose, handleShowVerifyOtp, handleShowForgotPassword, handleLoginUser }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const newErrors = {};

  const countryOptions = countryCodes.map((country) => ({
    value: country.dial_code, // e.g., "+91"
    label: `${country.emoji} ${country.name} (${country.dial_code})`, // Dropdown full details
    displayLabel: `${country.emoji} ${country.dial_code}`, // Selected value (emoji + dial code only)
  }));

  const [selectedCountry, setSelectedCountry] = useState(countryOptions[22]); // Default: India
  const [mobile_no, setPhoneNumber] = useState("");

  const validateForm = () => {

    if (!name) {
        newErrors.name = t('name_placeholder');
    }

    const mobileRegex = /^[0-9]+$/; // Regex for numbers only
    if (!mobile_no) {
      newErrors.mobile_no = t('mobile_no_required');
    } else if (!mobileRegex.test(mobile_no)) {
      newErrors.mobile_no = t('invalid_mobile_no'); // Invalid if it contains non-numeric characters
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
    if (!email) {
      newErrors.email = t('email_placeholder');
    } else if (!emailRegex.test(email)) {
      newErrors.email = t('email_invalid');
    }

    if (!password) {
      newErrors.password = t('password_required');
    }

  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };


  const handleSignUpSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const phone = cleanPhoneNumber(mobile_no)
      const callingCode = cleanPhoneNumber(selectedCountry.value)
      const response = await axios.post(`${Config.apiUrl}api/users/signup`, { name,callingCode:callingCode, mobile_no: phone,email, password });

      if(response.data.userId!=""){
        handleShowVerifyOtp(response.data.userId);
        handleClose();
      }
   
    } catch (error) {
      if(error.response.data.message=='mobile_no_duplicate'){
        newErrors.mobile_no = t('mobile_no_already_exist');
      }

      if(error.response.data.message=='email_duplicate'){
        newErrors.email = t('email_already_exist');
      }
      setErrors(newErrors);
    } finally {
      setIsLoading(false);
    }
  };

  const cleanPhoneNumber = (phone) => {
    return phone.replace(/^\+?0*/, ''); 
};

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('sign_up_link')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>{t('name_title')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('name_placeholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!errors.name}
            />
            {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
          </Form.Group>
          
          
          
          <Form.Group controlId="formMobile">
                <Form.Label>{t("mobile_no_title")}</Form.Label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "8px", padding: "8px", width: "100%" }}>
                  
                  {/* Country Code Dropdown */}
                  <Select
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={(selected) => setSelectedCountry(selected)}
                    getOptionLabel={(e) => (e.value === selectedCountry.value ? e.displayLabel : e.label)} // Dropdown shows full details; selected shows emoji + dial code
                    styles={{
                      control: (base) => ({
                        ...base,
                        width: "100px",
                        border: "none",
                        boxShadow: "none",
                        backgroundColor: "transparent",
                      }),
                      dropdownIndicator: (base) => ({
                        ...base,
                        padding: "0 5px",
                      }),
                    }}
                  />

                  {/* Phone Number Input */}
                  <input
                    type="text"
                    placeholder={t('mobile_no_placeholder')}
                    value={mobile_no}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{ border: "none", outline: "none", flex: 1, fontSize: "14px" , width:"100%" }}
                  />
                </div>
                {errors.mobile_no && <Form.Text className="text-danger">{errors.mobile_no}</Form.Text>}
              </Form.Group>
         
          <Form.Group controlId="formEmail">
            <Form.Label>{t('email_title')}</Form.Label>
            <Form.Control
              type="email"
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


          <Button className='login_button btn border border-secondary rounded-pill px-5 text-primary' variant="primary" onClick={handleSignUpSubmit} disabled={isLoading}>
            {isLoading ? t('loading') : t('sign_up_link')}
          </Button>

          <div className="model-link-bottom d-flex justify-content-between mt-4">
            <a className='left' href="#forgot-password" onClick={handleShowForgotPassword}>{t('forgot_password_link')}</a>
            <a className='right' href="#" onClick={handleLoginUser}>{t('dailog_login_title')}</a>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
