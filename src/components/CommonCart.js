import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Config from '../config/Config';
import delete_cart from '../assets/delete-cart.png';
import LoginModal from './modals/LoginModal';
import ForgotPasswordModal from './modals/ForgotPasswordModal';
import SignUpModal from './modals/SignUpModal';
import VerifyOtpModal from './modals/VerifyOtpModal';
import ProceedToPaymentModal from './modals/ProceedToPaymentModal';

function CommonCart({cart,isMobile, addToCart, removeFromCart }) {
 
    const { t } = useTranslation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showVerifyOtpModal, setShowVerifyOtpModal] = useState(false);
    const [showProceedToPaymentModal, setShowProceedToPaymentModal] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    const handlePlaceOrderClick = () => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserDetails();
        } else {
            setShowLoginModal(true);
        }
    };

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`${Config.apiUrl}api/users/details`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });

            setUserDetails(response.data);
            setShowProceedToPaymentModal(true);
        } catch (error) {
            console.error('Failed to fetch user details:', error);
        }
    };

    return (
        <div>

            {/* Fixed Cart Section */}
      
                <div className="mobile-cart">
                    <button className="btn btn-primary cart-drawer-float" onClick={() => setIsDrawerOpen(true)}>
                        Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                    </button>
                    {isDrawerOpen && (
                        <div className="drawer-content">
                            <div className='card-header'>
                                <div className='card-item'>{t('cart_items')}</div>
                                <div className='close-btn'>
                                    <button className="close-btn-btn" onClick={() => setIsDrawerOpen(false)}>X</button>
                                </div>
                            </div>
                            {cart.length === 0 ? (
                                <p className='empty_message'>{t('empty_cart_message')}</p>
                            ) : (
                                <div className="cart-items-list">
                                    {cart.map((item) => (
                                        <div key={item._id} className="cart-item">
                                            <div className="item-image">
                                                <img src={`${Config.apiUrl}${JSON.parse(item.images)}`} alt={JSON.parse(item.images)} className="item-image" />
                                            </div>
                                            <div className="item-details">
                                                <p>{item.title}</p>
                                                <p className='price'>{t('price')}: {item.price}</p>
                                                <div className="quantity-selector">
                                                    <button className="quantity-btn" onClick={() => removeFromCart(item)}>-</button>
                                                    <div className='quantity'>{item.quantity}</div>
                                                    <button className="quantity-btn" onClick={() => addToCart(item)}>+</button>
                                                    <button className="remove-btn" onClick={() => removeFromCart(item)}> <img src={delete_cart} alt="delete from cart" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="total-price">

                                {cart.length === 0 ? (
                                    <span>{t('empty_donate_button_message')}</span>
                                ) : (
                                    <span onClick={handlePlaceOrderClick}>{t('place_order_donate')} - {t('price')} {totalPrice.toFixed(2)}</span>
                                )}

                            </div>
                        </div>

                    )}
                </div>
      

            <LoginModal
                show={showLoginModal}
                handleClose={() => setShowLoginModal(false)}
                handleShowSignUp={() => {
                    setShowLoginModal(false);
                    setShowSignUpModal(true);
                }}
                handleShowForgotPassword={() => {
                    setShowLoginModal(false);
                    setShowForgotPasswordModal(true);
                }}
                handleLoginSuccess={fetchUserDetails}
            />

          
      <ForgotPasswordModal
        show={showForgotPasswordModal}
        handleClose={() => setShowForgotPasswordModal(false)}
        handleShowSignUp={() => {
          setShowForgotPasswordModal(false);
          setShowSignUpModal(true);
        }}
        handleLoginUser={() => {
          setShowForgotPasswordModal(false);
          setShowLoginModal(true);
        }}
      />

        <SignUpModal
                show={showSignUpModal}
                handleClose={() => setShowSignUpModal(false)}
                handleShowVerifyOtp={(userID) => {
                setShowSignUpModal(false);
                setShowVerifyOtpModal(true);
                setUserID(userID);
                }}
                handleShowForgotPassword={() => {
                setShowSignUpModal(false);
                setShowForgotPasswordModal(true);
                }}
                handleLoginUser={() => {
                setShowSignUpModal(false);
                setShowLoginModal(true);
                }}
            />

            
            <VerifyOtpModal
                show={showVerifyOtpModal}
                handleClose={() => setShowVerifyOtpModal(false)}
                handleShowLogin={() => {
                    setShowVerifyOtpModal(false);
                    setShowLoginModal(true);
                }}
            />
            <ProceedToPaymentModal
                show={showProceedToPaymentModal}
                handleClose={() => setShowProceedToPaymentModal(false)}
                userDetails={userDetails}
                cartItems={cart}
            />


        </div>
    );
}

export default CommonCart;
