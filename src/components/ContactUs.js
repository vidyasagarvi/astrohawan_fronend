import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Config from '../config/Config';
import axios from 'axios';

const ContactUs = () => {
const { t } = useTranslation();
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [mobile_no, setPhoneNumber] = useState('');
const [message, setMessage] = useState('');
const [errors, setErrors] = useState({});
const [isLoading, setIsLoading] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);
const newErrors = {};

const validateForm = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
    if (!email) {
      newErrors.email = t('email_placeholder');
    } else if (!emailRegex.test(email)) {
      newErrors.email = t('email_invalid');
    }

    const mobileRegex = /^[0-9]+$/; // Regex for numbers only
    if (!mobile_no) {
      newErrors.mobile_no = t('mobile_no_required');
    } else if (!mobileRegex.test(mobile_no)) {
      newErrors.mobile_no = t('invalid_mobile_no'); // Invalid if it contains non-numeric characters
    }

    if (!message) {
      newErrors.message = t('contact_error');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };



const handleContactUsSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(`${Config.apiUrl}contactus/queries`, { name, email, mobile_no, message});
     console.log(response);
    } catch (error) {
      setErrors(newErrors);
    } finally {
      setIsLoading(false);
      setName("");
      setEmail("");
      setPhoneNumber("");
      setMessage("");
      newErrors.response = t('contact_error');
      setIsSubmitted(true);

    }
  };
 

  return (
    <div>
    <div className="container-fluid page-header py-3">
    <h1 className="text-center text-white display-6">{t('contact_menu')}</h1>
  </div>

    <div className="contact-us-container">
      <div className="contact-left">
      {!isSubmitted ? (
       
      <Form className="contact-form">
      <h2>{t('contact_page_title')}</h2>
      
 

        <p className='successquery'>{errors.response}</p>

        <div className="form-group">
        <Form.Group controlId="formMobile">
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
          </div>



          <div className="form-group">
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
          </div>



          <div className="form-group">
          <Form.Group controlId="formMobile">
            <Form.Label>{t('mobile_no_title')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('mobile_no_required')}
              value={mobile_no}
              onChange={(e) => setPhoneNumber(e.target.value)}
              isInvalid={!!errors.mobile_no}
            />
            {errors.mobile_no && <Form.Text className="text-danger">{errors.mobile_no}</Form.Text>}
          </Form.Group>
          </div>


          <div className="form-group">
          <Form.Group controlId="formAddress">
            <Form.Label>{t('contact_message_lable')}</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              cols={10}
              placeholder={t('contact_message_placeholder')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              isInvalid={!!errors.setMessage}
            />
            {errors.message && <Form.Text className="text-danger">{errors.message}</Form.Text>}
          </Form.Group>
          </div>

          <Button className='single_contactus_button' onClick={handleContactUsSubmit} disabled={isLoading}>
            {isLoading ? t('loading') : t('contact_button_title')}
          </Button>
   
          </Form>
    ) : (
        <div className="success-message">
          <h3>Thank you for reaching out!</h3>
          <p>We have received your message and will get back to you shortly.</p>
        </div>
      )}
      </div>
   


      <div className="contact-right">
        <h3>{t('contact_information')}</h3>
       
            <p><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path d="M8 0a6 6 0 0 0-6 6c0 3.866 3.582 6.779 5.246 7.992a.97.97 0 0 0 1.508 0C10.418 12.779 14 9.866 14 6a6 6 0 0 0-6-6zm0 1a5 5 0 0 1 5 5c0 3.448-3.067 6.01-4.753 7.202a.072.072 0 0 1-.094 0C6.067 12.01 3 9.448 3 6a5 5 0 0 1 5-5z" />
                                    <path d="M8 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg> </span> Plot no 5, Sec -2A PNB Road, Vaishali Ghaziabad UP 201010  </p>
            <p><span>&#x2709;</span><a href="mailto:info@thesatim.com">info@thesatim.com</a></p>
            <p><span>&#x260E;</span>+91 70425 55040</p>

 
    
     
      </div>
    </div>
    </div>

  );
};

export default ContactUs;
