import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";


import About from './components/staticPages/About'
import TermsCondition from './components/staticPages/TermsCondition'
import PrivacyPpolicy from './components/staticPages/PrivacyPpolicy'
import Disclaimers from './components/staticPages/Disclaimers.js'
import RefundReplacementPolicy from './components/staticPages/RefundReplacementPolicy.js'
import CartSummary from "./context/CartSummary.js";
import Checkout from "./components/CartSummery.js";
import { CartContext } from "./context/CartContext.js"; // Adjust the path as needed


import Auction from './components/Auction';
import ContactUs from './components/ContactUs.js';

import Services from './components/Services.js';
import Hawans from './components/Hawans.js';
import Yantra from './components/Yantra.js';
import RakshaKit from './components/RakshaKit.js';
import Jaaps from './components/Jaaps.js'



import NavBar from './components/navbar/NavBar';
import Hero from './components/hero/Hero';
import Footer from './components/Footer';
import AdminFooter from './components/admin/AdminFooter'; // Import AdminFooter


// Site admin

import AdminRoute from './components/admin/AdminRoute';
import AdminLoginPage from './components/admin/AdminLoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import AddPoojaStore from './components/admin/poojaStore/AddPoojaStore';
import PoojaStoreList from './components/admin/poojaStore/PoojaStoreList';
import EditPoojaStore from './components/admin/poojaStore/EditPoojaStore';
import PoojaStoreCategory from './components/admin/Category/PoojaStore';
import AdminLayout from './components/admin/AdminLayout';

// Site Users
import UserRoute from './components/users/UserRoute.js';
import UserLayout from './components/users/UserLayout.js';
import UserDashboard from './components/users/UserDashboard.js';
import UpdatePassword from './components/users/UpdatePassword.js';
import UsersOrders from './components/users/Orders.js';
import AccountDetails from './components/users/AccountDetails.js'


import PujaStoreDetails from './components/pujaStore/PujaStoreDetails'
import ServicesDetails from './components/services/ServicesDetails.js'
import HawanDetails from './components/hawans/HawansDetails.js'
import YantraDetails from './components/yantra/YantraDetails.js'
import JaapDetails from './components/jaap/JaapDetails.js'



import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  // Function to determine if the current route is an admin route
  const isAdminRoute = (pathname) => {
    return pathname.startsWith('/admin');
  };

  const { cart } = useContext(CartContext);
  const location = useLocation(); // Hook to get current location
  const isCartVisible = location.pathname !== "/checkout" && cart.length > 0;

  return (
    <div>
      <NavBar setIsDrawerOpen={setIsDrawerOpen} />

      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/services" element={<Services />} />


        <Route path="/auction" element={<Auction />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/hawans" element={<Hawans />} />
        <Route path="/yantra" element={<Yantra />} />
        <Route path="/raksha-kit" element={<RakshaKit />} />
        <Route path="/jaaps" element={<Jaaps />} />

        <Route path="/about-us" element={<About />} />
        <Route path="/terms-conditions" element={<TermsCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPpolicy />} />
        <Route path="/disclaimers" element={<Disclaimers />} />
        <Route path="/refund-replacement-policy" element={<RefundReplacementPolicy />} />



        {/* Single Puja Store details */}
        {/*<Route path="/pooja-store/:productId" element={<PujaStoreDetails />} />*/}

        <Route path="/pooja-store/:productId" element={<PujaStoreDetails setIsDrawerOpen={setIsDrawerOpen} />} />

        {/* Single Item Details */}
        <Route path="/service/:serviceId" element={<ServicesDetails />} />
        <Route path="/hawan/:hawanId" element={<HawanDetails />} />
        <Route path="/yantras/:yantraId" element={<YantraDetails />} />
        <Route path="/jaap/:jaapId" element={<JaapDetails />} />

        {/* Site admin */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
        <Route path="/admin/add-store" element={<AdminRoute><AdminLayout><AddPoojaStore /></AdminLayout></AdminRoute>} />
        <Route path="/admin/store" element={<AdminRoute><AdminLayout><PoojaStoreList /></AdminLayout></AdminRoute>} />
        <Route path="/admin/store/edit/:productId" element={<AdminRoute><AdminLayout><EditPoojaStore /></AdminLayout></AdminRoute>} />
        <Route path="/admin/store/categories" element={<AdminRoute><AdminLayout><PoojaStoreCategory /></AdminLayout></AdminRoute>} />
        {/*<Route path="/admin/store-orders" element={<AdminRoute><AdminOrderList /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUserList /></AdminRoute>} /> */}

        {/* Site User */}
        <Route path="/my-account" element={<UserRoute><UserLayout><UserDashboard /></UserLayout></UserRoute>} />
        <Route path="/my-account/password" element={<UserRoute><UserLayout><UpdatePassword /></UserLayout></UserRoute>} />
        <Route path="/my-account/orders" element={<UserRoute><UserLayout><UsersOrders /></UserLayout></UserRoute>} />
        <Route path="/my-account/profile" element={<UserRoute><UserLayout><AccountDetails /></UserLayout></UserRoute>} />

        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      {/* Conditionally render the footer based on the current route */}

      {!isAdminRoute(location.pathname) ? (
        <Footer className={isCartVisible ? "site-footer footer-with-margin" : "site-footer"} />
      ) : (
        <AdminFooter />
      )}

      {location.pathname !== "/checkout" && <CartSummary />}
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
