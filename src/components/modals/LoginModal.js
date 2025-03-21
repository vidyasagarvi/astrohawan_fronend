import React, { useState } from "react";
import Select from "react-select";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Config from "../../config/Config";
import loginImage from "../../assets/shiv.jpg";
import countryCodes from "./countryCodes"; // Import country codes list
import "./PhoneInput.css"; // Custom styles

const LoginModal = ({ show, handleClose, handleShowSignUp, handleShowForgotPassword, handleLoginSuccess }) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [invalidCredentials, setInvalidCredentials] = useState("");

  // Country code options
  const countryOptions = countryCodes.map((country) => ({
    value: country.dial_code, // e.g., "+91"
    label: `${country.emoji} ${country.name} (${country.dial_code})`, // Dropdown full details
    displayLabel: `${country.emoji} ${country.dial_code}`, // Selected value (emoji + dial code only)
  }));

  // State for selected country code & phone number
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[22]); // Default: India
  const [phoneNumber, setPhoneNumber] = useState("");

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    const mobileRegex = /^[0-9]+$/;

    if (!phoneNumber) {
      newErrors.mobile_no = t("mobile_no_required");
    } else if (!mobileRegex.test(phoneNumber)) {
      newErrors.mobile_no = t("invalid_mobile_no");
    }

    if (!password) newErrors.password = t("password_required");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Login form submission
  const handleLoginSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(`${Config.apiUrl}api/users/login`, {callingCode:selectedCountry.value,phone: phoneNumber, password });
      localStorage.setItem("userData", JSON.stringify({
        token: response.data.user.id,
        calling_code: response.data.user.calling_code
      }));
      handleLoginSuccess();
      handleClose();
    } catch (error) {
      setInvalidCredentials(t("invalid_credentials"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="login-model">
      <Row className="no-gutters">
        <Modal.Header closeButton>
          <Modal.Title>{t("dailog_login_title")}</Modal.Title>
        </Modal.Header>

        <Col xs={12} md={6} className="d-none d-md-block">
          <img src={loginImage} alt="Login" className="img-fluid" />
        </Col>

        <Col xs={12} md={6} className="p-4">
          <Modal.Body>
            <Form>
              {/* Phone Number Field with Country Code */}
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
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{ border: "none", outline: "none", flex: 1, fontSize: "16px" }}
                  />
                </div>
                {errors.mobile_no && <Form.Text className="text-danger">{errors.mobile_no}</Form.Text>}
              </Form.Group>

              {/* Password Field */}
              <Form.Group controlId="formPassword">
                <Form.Label>{t("password_title")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("password_placeholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                />
                {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
              </Form.Group>

              {/* Submit Button */}
              <Button className="login_button btn border border-secondary rounded-pill px-5 text-primary" onClick={handleLoginSubmit} disabled={isLoading}>
                {isLoading ? t("loading") : t("dailog_login_title")}
              </Button>
              {invalidCredentials && <Form.Text className="text-danger">{invalidCredentials}</Form.Text>}

              <div className="model-link-bottom d-flex justify-content-between mt-4">
                <a href="#forgot-password" onClick={handleShowForgotPassword}>{t("forgot_password_link")}</a>
                <a href="#sign-up" onClick={handleShowSignUp}>{t("sign_up_link")}</a>
              </div>
            </Form>
          </Modal.Body>
        </Col>
      </Row>
    </Modal>
  );
};

export default LoginModal;
