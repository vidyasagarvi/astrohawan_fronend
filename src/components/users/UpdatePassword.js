import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Config from '../../config/Config';
import axios from 'axios';

const UpdatePassword = () => {
const { t } = useTranslation();
const [password, setPassword] = useState('');
const [new_password, setNewpassword] = useState('');
const [confirm_new_password, setConfirmnewpassword] = useState('');
const [message, setMessage] = useState('');
const [errors, setErrors] = useState({});
const [isLoading, setIsLoading] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);
const newErrors = {};

const token = localStorage.getItem('token');

const validateForm = () => {

    if (!password) {
      newErrors.password = "Please enter your existing password";
    }

    if (!new_password) {
        newErrors.new_password = "Please enter your new password";
      }

    if (!confirm_new_password) {
        newErrors.confirm_new_password = "Please enter your new confirm password";
      }

      if(new_password!=confirm_new_password){
        newErrors.confirm_new_password = "New password and confirm password not matched";
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };



const handleUpdatepassword = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(`${Config.apiUrl}api/users/updatepassword`, { password, new_password, token});
    } catch (error) {
      setErrors(newErrors);
    } finally {
      setIsLoading(false);
      setPassword("");
      setNewpassword("");
      setConfirmnewpassword("");
      newErrors.response = 'Password updated successfully';
      setIsSubmitted(true);

    }
  };
 

  return (
    <div>
    <div className="">
      <div className="">
      <Form>
      {!isSubmitted ?  (
        <p></p>
    ) : (
        <p className='success-message'>{errors.response}</p> 
    )}
        <div className="form-group">
        <Form.Group controlId="password">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Old password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
          </Form.Group>
          </div>



          <div className="form-group">
          <Form.Group controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              value={new_password}
              onChange={(e) => setNewpassword(e.target.value)}
              isInvalid={!!errors.new_password}
            />
            {errors.new_password && <Form.Text className="text-danger">{errors.new_password}</Form.Text>}
          </Form.Group>
          </div>

          <div className="form-group">
          <Form.Group controlId="confirmNewPassword">
            <Form.Label>Confirm new password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirm_new_password}
              onChange={(e) => setConfirmnewpassword(e.target.value)}
              isInvalid={!!errors.confirm_new_password}
            />
            {errors.confirm_new_password && <Form.Text className="text-danger">{errors.confirm_new_password}</Form.Text>}
          </Form.Group>
          </div>

          <Button className='' onClick={handleUpdatepassword} disabled={isLoading}>
            {isLoading ? t('loading') : "Update"}
          </Button>
   
          </Form>
      </div>
   

    </div>
    </div>

  );
};

export default UpdatePassword;
