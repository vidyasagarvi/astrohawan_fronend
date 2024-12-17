import React, { useState , useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector.js';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import LoginModal from '../modals/LoginModal.js';
import ForgotPasswordModal from '../modals/ForgotPasswordModal';
import SignUpModal from '../modals/SignUpModal';
import VerifyOtpModal from '../modals/VerifyOtpModal';
import cart_img from '../../assets/cart.png';
import icons_account from '../../assets/icons-account-96.png';
import site_logo from '../../assets/site_logo.png';

function NavBar({ totalQuantity, setIsDrawerOpen }) {
  const { t } = useTranslation();
  const { state } = useCart();
  const { cartItems } = state;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showVerifyOtpModal, setShowVerifyOtpModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showuserID, setUserID] = useState(false);
  const [showLang, setLang] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // To get the current location
  const navbarCollapseRef = useRef(null);


  const searchParams = new URLSearchParams(location.search);
  const language = searchParams.get('lang') || 'en';

  const handleDrawerOpen = (event) => {
    event.preventDefault(); // Prevent default anchor tag behavior
    setIsDrawerOpen(true);
  };

  const closeMenu = () => {
    if (navbarCollapseRef.current && window.innerWidth < 1200) { // Check for mobile screen width
      navbarCollapseRef.current.classList.remove('show'); // Close the collapse
    }
  };

  const handleLoginUser = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      setShowUserMenu(!showUserMenu); // Toggle the user menu visibility
    } else {
      setShowLoginModal(true);
    }
  };

  const redirectUserToAccount = () => {
    navigate('/my-account');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowUserMenu(false);
    navigate('/');
  };

  // Helper function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div>
      {/* Modals */}
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
        handleLoginSuccess={redirectUserToAccount}
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
        userID={showuserID}
      />

      {/* Navbar */}

      <div className="container-fluid fixed-top shadow">
      <div className="container px-0">
        <nav className="navbar navbar-expand-xl">
          {/* Logo */}
          <Link to={`/?lang=${language}`} className="navbar-brand">
            <div className="site-logo">
              <img src={site_logo} alt="Site Logo" />
            </div>
          </Link>

          {/* Language, Cart, and Profile Icons */}
          <div className="d-flex align-items-center order-xl-2 order-1 ms-auto ms-xl-0">
            <LanguageSelector />
            <div className="card-icon">
              <a href="#" className="position-relative" onClick={setIsDrawerOpen}>
                <img src={cart_img} alt="Cart" />
                <span
                  className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                  style={{ top: '-22px', left: '17px', height: '20px', minWidth: '19px' }}
                >
                  {totalQuantity}
                </span>
              </a>
            </div>


            <div className="user-icon">
              
              <a href="#" onClick={handleLoginUser}>
                <img src={icons_account} alt="Account" />
              </a>
             <div className={`dropdown-menu nav-link ${showUserMenu ? 'show' : ''}`}>
              <span className="dropdown-item" onClick={redirectUserToAccount}>My Account</span>
              <span className="dropdown-item" onClick={handleLogout}>Logout</span>
              </div>
            </div>
          </div>

          {/* Hamburger Menu Button (visible on mobile only) */}
          <button
            className="navbar-toggler py-1 px-2 order-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Menu Links */}
          <div className="collapse navbar-collapse bg-white" id="navbarCollapse" ref={navbarCollapseRef}>
            <div className="navbar-nav mx-auto">
              <Link to={`/?lang=${language}`} className={`nav-item nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>
                {t('home_menu')}
              </Link>
              <Link to={`/services?lang=${language}`} className={`nav-item nav-link ${isActive('/services') ? 'active' : ''}`} onClick={closeMenu}>
                {t('services_offered')}
              </Link>
              <Link to={`/pooja-store?lang=${language}`} className={`nav-item nav-link ${isActive('/pooja-store') ? 'active' : ''}`} onClick={closeMenu}>
                {t('mypooja_store')}
              </Link>
           
             {/* <Link to={`/helps?lang=${language}`} className={`nav-item nav-link ${isActive('/helps') ? 'active' : ''}`} onClick={closeMenu}>{t('helpto_needy')} </Link> */ }
              
          
             {/* <Link to={`/auction?lang=${language}`} className={`nav-item nav-link ${isActive('/auction') ? 'active' : ''}`} onClick={closeMenu}>
                {t('auction')}
              </Link> */}
              <Link to={`/contact-us?lang=${language}`} className={`nav-item nav-link ${isActive('/contact-us') ? 'active' : ''}`} onClick={closeMenu}>
                {t('contact_menu')}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>



    </div>
  );
}

export default NavBar;
