import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from "../context/CartContext";
import LoginModal from '../components/modals/LoginModal';
import ForgotPasswordModal from '../components/modals/ForgotPasswordModal';
import SignUpModal from '../components/modals/SignUpModal';
import VerifyOtpModal from '../components/modals/VerifyOtpModal';
import cart_img from '../assets/cart.png';


const CartSummary = () => {
    const { cart } = useContext(CartContext);
    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showVerifyOtpModal, setShowVerifyOtpModal] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"));

    const handlePlaceOrderClick = () => {
        if (userData) {
            navigate(`checkout?lang=${language}`);
        } else {
            setShowLoginModal(true);
        }
    };

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`${Config.apiUrl}api/users/details`, {
                headers: {
                    Authorization: `${userData.token}`
                }
            });
            setUserDetails(response.data);
            navigate(`checkout?lang=${language}`);
        } catch (error) {
            console.error('Failed to fetch user details:', error);
        }
    };


    if (cart.length === 0) return null; // Hide if cart is empty

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Step 1: Find the highest INR & USD from services
    const maxPrices = cart
        .filter(item => item.type === "service" && item.groupedPrices)
        .reduce((acc, item) => {
            return {
                INR: Math.max(acc.INR, item.groupedPrices.INR),
                USD: Math.max(acc.USD, item.groupedPrices.USD)
            };
        }, { INR: 0, USD: 0 });

    // Step 2: Sum all price_national and price_international for other types
    const sumPrices = cart
        .filter(item => item.type !== "service")
        .reduce((acc, item) => {
            const national = parseFloat(item.price_national || 0);
            const international = parseFloat(item.price_international || 0);
            return {
                INR: acc.INR + national,
                USD: acc.USD + international
            };
        }, { INR: 0, USD: 0 });

    // Step 3: Final Sum (Highest service price + Total other prices)
    const finalResult = {
        INR: maxPrices.INR + sumPrices.INR,
        USD: maxPrices.USD + sumPrices.USD
    };

    return (
        <div className="cart-summary-mahakumbh fixed-bottom p-3 shadow">
            <div className="container d-flex justify-content-between align-items-center">

                  <div className="card-icon">
                              <a href="#" className="position-relative">
                                <img src={cart_img} alt="Cart" />
                                <span
                                  className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                                  style={{ top: '-17px', left: '17px', height: '20px', minWidth: '19px' }}
                                >
                                  {totalItems}
                                </span>
                              </a>
                 </div>

                {!userData ? (
                    <span>Total : ₹{finalResult.INR} / ${finalResult.USD}</span>
                ) : userData.calling_code === "+91" ? (
                    <span>Total : ₹{finalResult.INR}</span>
                ) : (
                    <span>Total : ${finalResult.USD}</span>
                )}
                <span className="checkout-mahakumbh" onClick={handlePlaceOrderClick}> Next →</span>

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


        </div>
    );
};

export default CartSummary;
