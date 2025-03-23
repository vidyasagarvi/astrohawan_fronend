import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Tab, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Config from '../../config/Config';
import delete_cart from '../../assets/delete-cart.png';
import '../../css/Drawer.css';

// Placeholder functions to check login status
const isLoggedIn = () => {
  // Implement your logic to check if the user is logged in
  return localStorage.getItem('token') !== null;
};

const getUserData = async () => {
  // Implement your logic to get user data if logged in
  // Mocking an API call
  return {
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '1234567890',
    address: '123 Main St',
    pincode: '123456'
  };
};

const OrderFlowModal = ({ show, handleClose, totalQuantity, productsByCategory }) => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [password, setPassword] = useState('');
  const [currentStep, setCurrentStep] = useState(isLoggedIn() ? 'checkout' : 'login');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      // Fetch user data
      getUserData().then(userData => {
        setName(userData.name);
        setEmail(userData.email);
        setPhoneNumber(userData.mobile);
        setAddress(userData.address);
        setPincode(userData.pincode);
      });
    }
  }, []);

  const findProductById = (productId) => {
    if (!productsByCategory) return null;
    return Object.values(productsByCategory).flat().find(p => p._id === productId);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(({ productId, quantity }) => {
      const product = findProductById(productId);
      if (product) {
        totalPrice += product._price * quantity;
      }
    });
    return totalPrice.toFixed(2);
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const handleLoginSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setCurrentStep('checkout');
      const userData = await getUserData();
      setName(userData.name);
      setEmail(userData.email);
      setPhoneNumber(userData.mobile);
      setAddress(userData.address);
      setPincode(userData.pincode);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.post('http://127.0.0.1:3000/api/users/signup', { name, mobile: phoneNumber, email, address, pincode, password });
      setCurrentStep('otp');
    } catch (error) {
      console.error('Sign-up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.post('http://127.0.0.1:3000/api/users/verify-otp', { mobile: phoneNumber, otp });
      setCurrentStep('login');
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBillingSubmit = () => {
    console.log('Proceed to payment with:', { name, address });
    // Implement payment logic here
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{t('checkout')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container activeKey={currentStep} onSelect={setCurrentStep}>
          <Nav variant="tabs">
            {!isLoggedIn() && (
              <>
                <Nav.Item>
                  <Nav.Link eventKey="login">{t('login')}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">{t('sign_up')}</Nav.Link>
                </Nav.Item>
              </>
            )}
            <Nav.Item>
              <Nav.Link eventKey="phone">{t('enter_phone_number')}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="otp">{t('enter_otp')}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="billing">{t('enter_billing_address')}</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            {!isLoggedIn() && (
              <>
                <Tab.Pane eventKey="login">
                  <Form>
                    <Form.Group controlId="formEmail">
                      <Form.Label>{t('email')}</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder={t('enter_email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                      <Form.Label>{t('password')}</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder={t('enter_password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={handleLoginSubmit} disabled={isLoading}>
                      {isLoading ? t('loading') : t('login')}
                    </Button>
                    <div className="form-links">
                      <a href="#forgot-password" onClick={() => setCurrentStep('forgot-password')}>{t('forgot_password')}</a>
                      <a href="#sign-up" onClick={() => setCurrentStep('signup')}>{t('sign_up')}</a>
                    </div>
                  </Form>
                </Tab.Pane>
                <Tab.Pane eventKey="signup">
                  <Form>
                    <Form.Group controlId="formName">
                      <Form.Label>{t('name')}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t('enter_name')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formPhoneNumber">
                      <Form.Label>{t('phone_number')}</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder={t('enter_phone_number')}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label>{t('email')}</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder={t('enter_email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formAddress">
                      <Form.Label>{t('address')}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t('enter_address')}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formPincode">
                      <Form.Label>{t('pincode')}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t('enter_pincode')}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                      <Form.Label>{t('password')}</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder={t('enter_password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSignUpSubmit} disabled={isLoading}>
                      {isLoading ? t('loading') : t('sign_up')}
                    </Button>
                  </Form>
                </Tab.Pane>
              </>
            )}
            <Tab.Pane eventKey="otp">
              <Form>
                <Form.Group controlId="formOTP">
                  <Form.Label>{t('otp')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t('enter_otp')}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleOTPSubmit} disabled={isLoading}>
                  {isLoading ? t('loading') : t('verify_otp')}
                </Button>
              </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="billing">
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>{t('name')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t('enter_name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formAddress">
                  <Form.Label>{t('address')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t('enter_address')}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleBillingSubmit}>
                  {t('proceed_to_payment')}
                </Button>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <div className="cart-items-list">
          {cartItems.map(({ productId, quantity }) => {
            const product = findProductById(productId);
            if (!product) return null;

            return (
              <div key={product._id} className="cart-item">
                <div className="item-image">
                  <img src={`${Config.imageUrl}${product._images[0]}`} alt={product._images[0]} className="item-image" />
                </div>
                <div className="item-details">
                  <p>{product._categoryId[0].title}</p>
                  <p className='price'>{t('price')}: {product._price}</p>
                  <div className="quantity-selector">
                    <button className="quantity-btn" onClick={() => handleUpdateQuantity(productId, -1)}>-</button>
                    <div className='quantity'>{quantity}</div>
                    <button className="quantity-btn" onClick={() => handleUpdateQuantity(productId, 1)}>+</button>
                    <button className="remove-btn" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: productId })}>
                      <img src={delete_cart} alt="delete from cart" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="total-price">
          <span>{t('total_price')}: {calculateTotalPrice()}</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderFlowModal;
