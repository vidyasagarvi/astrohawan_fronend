import React, { useState } from 'react';
import Select from "react-select";
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import countryCodes from "./countryCodes";
import Config from "../../config/Config";

const ForgotPasswordModal = ({ show, handleClose, handleShowSignUp, handleLoginUser }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const countryOptions = countryCodes.map((country) => ({
    value: country.dial_code, // e.g., "+91"
    label: `${country.emoji} ${country.name} (${country.dial_code})`, // Dropdown full details
    displayLabel: `${country.emoji} ${country.dial_code}`, // Selected value (emoji + dial code only)
  }));

  const [selectedCountry, setSelectedCountry] = useState(countryOptions[22]); // Default: India
  const [mobile_no, setPhoneNumber] = useState("");

  const newErrors = {};

  const validateForm = () => {
   
    const mobileRegex = /^[0-9]+$/; // Regex for numbers only
    if (!mobile_no) {
      newErrors.mobile_no = t('mobile_no_required');
    } else if (!mobileRegex.test(mobile_no)) {
      newErrors.mobile_no = t('invalid_mobile_no'); // Invalid if it contains non-numeric characters
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleForgotPasswordSubmit = async () => {
    if (!validateForm()) return; 
    setIsLoading(true);
    try {
      const phone = cleanPhoneNumber(mobile_no)
      const callingCode = cleanPhoneNumber(selectedCountry.value)
      const response = await axios.post(`${Config.apiUrl}api/users/forgotpassword`, {callingCode,phone});
      if(response.data.status=="success"){
        setIsSubmitted(true);
      }

      if(response.data.status=="invalid"){
        newErrors.mobile_no = t('usernot_verified');
      }
    
    } catch (error) {
      newErrors.mobile_no = t('usernot_verified');
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
         
        <Form.Group controlId="formMobile">
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
