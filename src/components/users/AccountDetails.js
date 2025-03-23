import React, { useState , useEffect} from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Config from '../../config/Config';
import axios from 'axios';

const AccountDetails = () => {
const { t } = useTranslation();
const [errors, setErrors] = useState({});
const [isLoading, setIsLoading] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);
const newErrors = {};
const [userDetails, setUserDetails] = useState(null);


useEffect(() => {
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('User is not authenticated');

            const response = await axios.get(`${Config.apiUrl}users/details`, {
                headers: { Authorization: token },
            });

            setUserDetails(response.data);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        }
    };

    fetchOrders();
}, []);



console.log(userDetails)
const validateForm = (userDetails) => {

    if (!userDetails.name) {
        newErrors.name = "Name should not empty";
    }

    if (!userDetails.mobile) {
        newErrors.mobile = "Contact no should not empty";
      }

    if (!userDetails.shipping_address) {
        newErrors.confirm_new_password = "Shipping address should not empty";
      }

      if(!userDetails.pincode){
        newErrors.confirm_new_password = "Pincode should not empty";
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };



const handleUpdateuser = async () => {
    if (!validateForm(userDetails)) return;
    setIsLoading(true);
    try {
    //  const response = await axios.post(`${Config.apiUrl}users/updatepassword`, { password, new_password, token});
    } catch (error) {
      setErrors(newErrors);
    } finally {
      setIsLoading(false);
      newErrors.response = 'Password updated successfully';
      setIsSubmitted(true);

    }
  };
 

  return (
    <div>
    <div className="">
      <div className="">
      {userDetails ? (
  <  Form>
    <div className="form-group">
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          isInvalid={!!errors.name}
        />
        {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
      </Form.Group>
    </div>
   
    <div className="form-group">
      <Form.Group controlId="name">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Email"
          value={userDetails.email}
          isInvalid={!!errors.email}
        />
        {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
      </Form.Group>
    </div>


    <div className="form-group">
      <Form.Group controlId="name">
        <Form.Label>Contact No</Form.Label>
        <Form.Control
          type="text"
          placeholder="Mobile"
          value={userDetails.mobile}
          onChange={(e) => setUserDetails({ ...userDetails, mobile: e.target.value })}
          isInvalid={!!errors.mobile}
        />
        {errors.mobile && <Form.Text className="text-danger">{errors.mobile}</Form.Text>}
      </Form.Group>
    </div>


    <div className="form-group">
      <Form.Group controlId="shipping_address">
        <Form.Label>Shipping address</Form.Label>

        <Form.Control
              as="textarea"
              rows={5}
              cols={10}
              placeholder="Shipping Address"
              value={userDetails.shipping_address}
              onChange={(e) => setUserDetails({ ...userDetails, shipping_address: e.target.value })}
              isInvalid={!!errors.setMessage}
            />
        {errors.shipping_address && <Form.Text className="text-danger">{errors.shipping_address}</Form.Text>}
      </Form.Group>
    </div>

    <div className="form-group">
      <Form.Group controlId="name">
        <Form.Label>Pincode</Form.Label>
        <Form.Control
          type="text"
          placeholder="Pincode"
          value={userDetails.pincode}
          onChange={(e) => setUserDetails({ ...userDetails, pincode: e.target.value })}
          isInvalid={!!errors.pincode}
        />
        {errors.pincode && <Form.Text className="text-danger">{errors.pincode}</Form.Text>}
      </Form.Group>
    </div>

      <Button className='' onClick={handleUpdateuser} disabled={isLoading}>
            {isLoading ? t('loading') : "Update"}
          </Button>

  </Form>
) : (
  <p>Loading...</p>
)}



      </div>
   

    </div>
    </div>

  );
};

export default AccountDetails;
