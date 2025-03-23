import React, { useState } from 'react';
import { Modal, Button, Form, Tab, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Config from '../../config/Config';
import delete_cart from '../../assets/delete-cart.png';
import '../../css/CheckoutModal.css';

const CheckoutModal = ({ show, handleClose, totalQuantity, productsByCategory, handleNextStep }) => {
    const { t } = useTranslation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [currentStep, setCurrentStep] = useState('phone');

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

    const handlePhoneNumberSubmit = () => {
        console.log(`Sending OTP to ${phoneNumber}`);
        setCurrentStep('otp');
    };

    const handleOTPSubmit = () => {
        if (otp === '123456') {
            setCurrentStep('billing');
        } else {
            alert('Invalid OTP');
        }
    };

    const handleBillingSubmit = () => {
        console.log('Proceed to payment with:', { name, address });
        handleNextStep({ name, address });
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{t('checkout')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="checkout-modal-body">
                    <div className="left-side">
                        <Tab.Container activeKey={currentStep} onSelect={setCurrentStep}>
                            <Nav variant="tabs">
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
                                <Tab.Pane eventKey="phone">
                                    <Form>
                                        <Form.Group controlId="formPhoneNumber">
                                            <Form.Label>{t('phone_number')}</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                placeholder={t('enter_phone_number')}
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Button variant="primary" onClick={handlePhoneNumberSubmit}>
                                            {t('send_otp')}
                                        </Button>
                                    </Form>
                                </Tab.Pane>
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
                                        <Button variant="primary" onClick={handleOTPSubmit}>
                                            {t('verify_otp')}
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
                    </div>
                    <div className="right-side">
                        <div className="cart-items-list-model">
                            {cartItems.map(({ productId, quantity }) => {
                                const product = findProductById(productId);
                                if (!product) return null;

                                return (
                                    <div key={product._id} className="cart-item">
                                        <div className="item-image-model">
                                            <img src={`${Config.imageUrl}${product._images[0]}`} alt={product._images[0]} className="item-image" />
                                        </div>
                                        <div className="item-details-model">
                                            <p> {product._categoryId[0].title}</p>
                                            <p className='price-model'>{t('price')}: {product._price}</p>
                                            <div className="quantity-selector-model">
                                                <button className="quantity-btn-model" onClick={() => handleUpdateQuantity(productId, -1)}>-</button>
                                                <div className='quantity-model'>{quantity} </div>
                                                <button className="quantity-btn-model" onClick={() => handleUpdateQuantity(productId, 1)}>+</button>
                                                <button className="remove-btn-model" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: productId })}>
                                                    <img src={delete_cart} alt="delete from cart" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="total-price-model">
                            <span>{t('total_price')}: {calculateTotalPrice()}</span>
                        </div>
                    </div>
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

export default CheckoutModal;
