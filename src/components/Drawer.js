import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Config from '../config/Config';
import '../css/Drawer.css';
import { useCart } from '../context/CartContext';
import delete_cart from '../assets/delete-cart.png';
import axios from 'axios';
import LoginModal from './modals/LoginModal';
import ForgotPasswordModal from './modals/ForgotPasswordModal';
import SignUpModal from './modals/SignUpModal';
import VerifyOtpModal from './modals/VerifyOtpModal';
import ProceedToPaymentModal from './modals/ProceedToPaymentModal';

const Drawer = ({ isOpen, onClose, totalQuantity, productsByCategory }) => {
  const { t } = useTranslation();
  const { state, dispatch } = useCart();
  const { cartItems } = state;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showVerifyOtpModal, setShowVerifyOtpModal] = useState(false);
  const [showProceedToPaymentModal, setShowProceedToPaymentModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const findProductById = (productId) => {
    if (!productsByCategory) return null;
    return Object.values(productsByCategory).flat().find(p => p._id === productId);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(({ productId, quantity }) => {
      const product = findProductById(productId);
      if (product) {
        if(product._discount>0){
          const discount = product._price - (product._price * product._discount) / 100;
          totalPrice += discount * quantity;
        }else{
           totalPrice += product._price * quantity;
        }
       
       
      }
    });
    return totalPrice.toFixed(2);
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

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
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    const strippedText = text.replace(/<[^>]+>/g, ''); // Remove HTML tags
    if (strippedText.length <= maxLength) {
        return strippedText;
    }

    return (
        <>
            {strippedText.substring(0, maxLength)}
        </>
    );
    // return strippedText.substring(0, maxLength) +  'More ...';
};

  return (
    <div>
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-content">
          <div className='card-header'>
            <div className='card-item'>{t('cart_items')} ({totalQuantity})</div>
            <div className='close-btn'>
              <button className="close-btn-btn" onClick={onClose}>
              X
              </button>
            </div>
          </div>
          {cartItems.length > 0 ? (
            <div className="cart-items-list">
              {cartItems.map(({ productId, quantity }) => {
                const product = findProductById(productId);
                if (!product || !product._categoryId || !product._categoryId[0]) return null;

                return (
                  <div key={product._id} className="cart-item">
                    <div className="item-image">
                      <img src={`${Config.apiUrl}${product._images[0]}`} alt={product._images[0]} className="item-image" />
                    </div>
                    <div className="item-details">
                    <p> {truncateText(product._categoryId[0].title, 70)}</p>
                      <p className='price'>
                      {product._discount > 0 ? (
                      <div>
                       <span className="p_price1">{t('price')}{product._price}</span>
                        <spna style={{marginLeft:"7px"}}>{t('price')}{ product._price - (product._price * product._discount) / 100}</spna>
                      </div>
                      ) : (
                      <span className="no-discount">
                      {t('price')}: {product._price}
                      </span>
                      )}
                        
                        </p>
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
          ) : (
            <p>{t('empty_cart_message')}</p>
          )}
          {cartItems.length > 0 && (
            <div className="total-price">
              <span onClick={handlePlaceOrderClick}>{t('place_order')} - {t('price')} {calculateTotalPrice()}</span>
            </div>
          )}
        </div>
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
      />
      <SignUpModal
        show={showSignUpModal}
        handleClose={() => setShowSignUpModal(false)}
        handleShowVerifyOtp={() => {
          setShowSignUpModal(false);
          setShowVerifyOtpModal(true);
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
        cartItems={cartItems.map(({ productId, quantity }) => {
          const product = findProductById(productId);
          return product ? {type:'store',id:product._id ,parentId:'store', title: product._categoryId[0]?.title || '', price: product._price,discount: product._discount, quantity , images:product._images[0]} : {};
        })}
      />
    </div>
  );
};

export default Drawer;
