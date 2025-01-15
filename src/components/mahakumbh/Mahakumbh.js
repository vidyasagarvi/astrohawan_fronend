import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import bamahakumbh from '../../assets/banner_1.jpg';
import sangamgangaJal from './assets/sangamGangaJal.jpg';
import SantNbrahmanBhoj from './assets/SantNbrahmanBhoj.jpg';
import mahakumbhbhandaara from './assets/mahakumbhbhandaara.jpg';


import Mahadaan from './assets/Mahadaan.jpg';
import offeringsData from './mahakumbhData.json'; // Import JSON data
import Config from '../../config/Config';
import '../../css/Mahakumbh.css'; // Create and import the CSS file for styling
import LoginModal from '../modals/LoginModal';
import ForgotPasswordModal from '../modals/ForgotPasswordModal';
import SignUpModal from '../modals/SignUpModal';
import VerifyOtpModal from '../modals/VerifyOtpModal';
import ProceedToPaymentModal from '../modals/ProceedToPaymentModal';

const Mahakumbh = () => {
    const { t } = useTranslation();
    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showVerifyOtpModal, setShowVerifyOtpModal] = useState(false);
    const [showProceedToPaymentModal, setShowProceedToPaymentModal] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    const prasad = offeringsData.MahakumbhSpecialOfferings.MahakumbhPrasad;
    const gangajal = offeringsData.MahakumbhSpecialOfferings.SangamGangajl;
    const specialBhandara = offeringsData.MahakumbhBhanaraOffering.SpecialBhandara;
    const mahadaans = offeringsData.MahakumbhBhanaraOffering.mahadaan;
    const santMahabhoj = offeringsData.MahakumbhBhanaraOffering.SantMahabhoj;

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

    // Initialize cart state from localStorage
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('mahakumbh_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Update localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('mahakumbh_cart', JSON.stringify(cart));
    }, [cart]);

    const handleAddToCart = (product, parent) => {

        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                // If item already exists, increment quantity
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item with quantity 1
                var image_path = "mahakumbh/" + parent.Introduction.image
                return [...prevCart, { ...product, quantity: 1, type: 'mahakumbh', parentId: parent.Introduction.id, images: image_path }];
            }
        });
    };



    const handleDecrementQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0) // Remove item if quantity reaches 0
        );
    };

    // Check if item is in the cart
    const getCartItem = (productId) => cart.find((item) => item.id === productId);


    const CartSummary = ({ cart }) => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        return (
            <div className="cart-summary-mahakumbh fixed-bottom p-3 shadow">
                <div className="container d-flex justify-content-between align-items-center">
                    <span>{totalItems} item(s) in the cart</span>
                    <span>Total: ₹{totalPrice}</span>
                    <span className="checkout-mahakumbh" onClick={handlePlaceOrderClick}>Next</span>
                </div>
            </div>
        );
    };

    const ProductCard = ({ product, parent, language }) => {
        const cartItem = getCartItem(product.id); // Check if the product is in the cart

        return (
            <div className="card mb-3 mahakumbh-cart"  style={{ border: "1px solid #ddd", borderRadius: "8px" }}>
                <div className="row g-0 align-items-center">
                    <div className="col-md-10">
                        <div className="card-body">
                            <h5 className="card-title-mahakumbh">{product.title}</h5>
                            <p className="card-text">
                                {product.description || ""}
                            </p>
                            <p className="card-text text-muted price-mahakumbh">
                                ₹{product.price} {product.priceDescription && `(${product.priceDescription})`}
                            </p>
                        </div>
                    </div>
                    <div className="col-md-2 text-center">
                        {cartItem ? (
                            <div className="btn-group">
                                <button
                                    className="btn  btn-sm"
                                    onClick={() => handleDecrementQuantity(product.id)}
                                >
                                    -
                                </button>
                                <span className="btn  btn-sm">
                                    {cartItem.quantity}
                                </span>
                                <button
                                    className="btn  btn-sm"
                                    onClick={() => handleAddToCart(product, parent)}
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                className="btn btn-success btn-sm" style={{ margin: "10px", width:"95px" }}
                                onClick={() => handleAddToCart(product, parent)}
                            >
                                + Add
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className='mahakumbh'>
            
            <div className="container-fluid py-4" style={{ marginTop: "55px" }}>


                <div className="header-banner position-relative">
                    {/* Main Banner Image */}
                    <img
                        src={bamahakumbh}
                        className="img-fluid w-100 h-90 bg-secondary"
                        alt="maha kumbh"
                    />

                    {/* Small Images */}

                    <div className="small-images-container d-flex flex-wrap justify-content-center align-items-center position-absolute translate-middle">
                       
                       
                        <a href="#Mahadaan"><img
                            src={Mahadaan}
                            className="small-banner-image"
                            alt="Maha Daan"
                         
                        />
                        </a>
                        <a href="#SantNbrahmanBhoj"> <img
                            src={SantNbrahmanBhoj}
                            className="small-banner-image"
                            alt="Sant and Brahman Bhoj"
                        
                        /></a>
                       <a href="#sangamgangaJal"> <img
                            src={sangamgangaJal}
                            className="small-banner-image"
                            alt="Trivani Sangam Ganga Jal"
                        
                        /></a>
                        <a href="#mahakumbhbhandaara"><img
                            src={mahakumbhbhandaara}
                            className="small-banner-image"
                            alt="Mahakumbh Bhandara"
                        /></a>
                    </div>


                </div>

                <div className="container-fluid page-header py-3">
                    <h1 className="text-center text-white display-5">Our Services for Mahakumbh</h1>
                </div>

                <ul className='benefits-list'>
                    <li>Maha Daan Seva</li>
                    <li>Dandi Swami Bhoj</li>

                    <li>Brahman Bhoj</li>
                    <li>Bhandara Service</li>
                    <li>Provision of Pure Triveni Sangam Ganga Jal</li>
                    <li>Prasad Distribution</li>

                </ul>




                <div className="container-fluid page-header py-3">
                    <h1 className="text-center text-white display-5">MAHAKUMBH PRASAD</h1>
                </div>
                <div className="row g-4 mb-5">
                    <div className="col-lg-6">
                        <div className="border rounded">
                            <img
                                src={`${Config.apiUrl}mahakumbh/${prasad.Introduction.image}`}
                                className="img-fluid w-100 h-80 bg-secondary rounded"
                                alt="Mahakumbh Prasad"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h2>{prasad.Introduction[language]}</h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: prasad.Introduction.Description[language],
                            }}
                        />
                    </div>
                    <div className="col-lg-10">
                        <h3 style={{ marginTop: "30px;", marginBottom: "40px;", fontSize: "20px" }}>MAHAKUMBH PRASAD</h3>
                        <div className="row g-4">
                            {prasad.Products.map((product) => (
                                <ProductCard key={product.id} product={product} parent={prasad} language={language} />
                            ))}
                        </div>
                    </div>
                </div>

                <div id="sangamgangaJal" className="container-fluid page-header py-3">
                    <h1 className="text-center text-white display-5">SANGAM GANGAJAL</h1>
                </div>

                {/* Ganga jal section  */}

                <div className="row g-4 mb-5">
                    <div className="col-lg-6">
                        <div className="border rounded">
                            <img
                                src={`${Config.apiUrl}mahakumbh/${gangajal.Introduction.image}`}
                                className="img-fluid w-100 h-80 bg-secondary rounded"
                                alt="Mahakumbh Prasad"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h2>{gangajal.Introduction[language]}</h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: gangajal.Introduction.Description[language],
                            }}
                        />
                    </div>
                    <div className="col-lg-10">
                        <h3 style={{ marginTop: "30px;", marginBottom: "40px;", fontSize: "20px" }}>SANGAM GANGAJAL</h3>
                        <div className="row g-4">
                            {gangajal.Products.map((product) => (
                                <ProductCard key={product.id} product={product} parent={gangajal} language={language} />
                            ))}
                        </div>
                    </div>
                </div>



                {/* SpecialBhandara */}

                <div id="mahakumbhbhandaara" className="container-fluid page-header py-3">
                    <h1 className="text-center text-white display-5">MAHA KUMBH SPECIAL BHANDARA</h1>
                </div>

                <div className="row g-4 mb-5">
                    <div className="col-lg-6">
                        <div className="border rounded">
                            <img
                                src={`${Config.apiUrl}mahakumbh/${specialBhandara.Introduction.image}`}
                                className="img-fluid w-100 h-80 bg-secondary rounded"
                                alt="Mahakumbh Prasad"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h2>{specialBhandara.Introduction[language]}</h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: specialBhandara.Introduction.Description[language],
                            }}
                        />
                    </div>
                    <div className="col-lg-10">
                        <h3 style={{ marginTop: "30px;", marginBottom: "40px;", fontSize: "20px" }}>MAHA KUMBH SPECIAL BHANDARA</h3>
                        <div className="row g-4">
                            {specialBhandara.Products.map((product) => (
                                <ProductCard key={product.id} product={product} parent={specialBhandara} language={language} />
                            ))}
                        </div>
                    </div>
                </div>


                {/* mahadaan */}

                <div id="Mahadaan" className="container-fluid page-header py-3">
                    <h1 className="text-center text-white display-5">MAHADAAN</h1>
                </div>


                <div className="row g-4 mb-5">
                    <div className="col-lg-6">
                        <div className="border rounded">
                            <img
                                src={`${Config.apiUrl}mahakumbh/${mahadaans.Introduction.image}`}
                                className="img-fluid w-100 h-80 bg-secondary rounded"
                                alt="Mahakumbh Prasad"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h2>{mahadaans.Introduction[language]}</h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: mahadaans.Introduction.Description[language],
                            }}
                        />
                    </div>
                    <div className="col-lg-10">
                        <h3 style={{ marginTop: "30px;", marginBottom: "40px;", fontSize: "20px" }}>MAHADAAN </h3>
                        <div className="row g-4">
                            {mahadaans.Products.map((product) => (
                                <ProductCard key={product.id} product={product} parent={mahadaans} language={language} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* SantMahabhoj */}

                <div id="SantNbrahmanBhoj" className="container-fluid page-header py-3">
                    <h1 className="text-center text-white display-5">SANT MAHABHOJ</h1>
                </div>

                <div className="row g-4 mb-5">
                    <div className="col-lg-6">
                        <div className="border rounded">
                            <img
                                src={`${Config.apiUrl}mahakumbh/${santMahabhoj.Introduction.image}`}
                                className="img-fluid w-100 h-80 bg-secondary rounded"
                                alt="Mahakumbh Prasad"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h2>{santMahabhoj.Introduction[language]}</h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: santMahabhoj.Introduction.Description[language],
                            }}
                        />
                    </div>
                    <div className="col-lg-10">
                        <h3 style={{ marginTop: "30px;", marginBottom: "40px;", fontSize: "20px" }}>SANT MAHABHOJ </h3>
                        <div className="row g-4">
                            {santMahabhoj.Products.map((product) => (
                                <ProductCard key={product.id} product={product} parent={santMahabhoj} language={language} />
                            ))}
                        </div>
                    </div>
                </div>






            </div>
            {cart.length > 0 && <CartSummary cart={cart} />}

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
};

export default Mahakumbh;
