import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Pujas from './components/Pujas';
import ServicesOffered from './components/ServicesOffered';
import PoojaStore from './components/PoojaStore';
import Helps from './components/Helps';
import About from './components/staticPages/About'
import TermsCondition from './components/staticPages/TermsCondition'
import PrivacyPpolicy from './components/staticPages/PrivacyPpolicy'
import Disclaimers from './components/staticPages/Disclaimers.js'
import RefundReplacementPolicy from './components/staticPages/RefundReplacementPolicy.js'

import Auction from './components/Auction';
import ContactUs from './components/ContactUs.js';
import Mahakumbh from './components/mahakumbh/Mahakumbh.js';
import NavBar from './components/navbar/NavBar';
import Hero from './components/hero/Hero';
import Footer from './components/Footer';
import AdminFooter from './components/admin/AdminFooter'; // Import AdminFooter
import Drawer from './components/Drawer';
import { useCart } from './context/CartContext';
import usePujas from './hooks/usePujas';

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
import MandirDetails from './components/mandir/MandirDetails'
import HelpsDetails from './components/helps/HelpsDetails'
import ServiceDetails from './components/ourServices/ServiceDetails'

import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { state } = useCart();
  const { cartItems } = state;
  const { t, i18n } = useTranslation();
  const { pujas } = usePujas(i18n.language);

  // Function to group products by category
  const groupProductsByCategory = (products) => {
    const groupedProducts = {};
    products.forEach((puja) => {
      const category = puja._translations[0].name;
      if (!groupedProducts[category]) {
        groupedProducts[category] = [];
      }
      groupedProducts[category].push(...puja._products);
    });
    return groupedProducts;
  };

  const productsByCategory = pujas ? groupProductsByCategory(pujas) : {};
  const totalQuantity = cartItems.reduce((accumulator, currentObject) => accumulator + currentObject.quantity, 0);

  // Function to determine if the current route is an admin route
  const isAdminRoute = (pathname) => {
    return pathname.startsWith('/admin');
  };

  const location = useLocation(); // Hook to get current location

  return (
    <div>
      <NavBar totalQuantity={totalQuantity} setIsDrawerOpen={setIsDrawerOpen} productsByCategory={productsByCategory} />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/shop" element={<Pujas setIsDrawerOpen={setIsDrawerOpen} productsByCategory={productsByCategory} />} />
        <Route path="/services" element={<ServicesOffered />} />
        <Route path="/pooja-store" element={
          <>
            <PoojaStore />
            <Pujas setIsDrawerOpen={setIsDrawerOpen} productsByCategory={productsByCategory} />
          </>
        } />
        <Route path="/helps" element={<Helps />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/makakumbh" element={<Mahakumbh />} />
        
        <Route path="/about-us" element={<About />} />
        <Route path="/terms-conditions" element={<TermsCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPpolicy />} />
        <Route path="/disclaimers" element={<Disclaimers />} />
        <Route path="/refund-replacement-policy" element={<RefundReplacementPolicy />} />

        

        {/* Single Puja Store details */}
        {/*<Route path="/pooja-store/:productId" element={<PujaStoreDetails />} />*/}

        <Route path="/pooja-store/:productId" element={<PujaStoreDetails setIsDrawerOpen={setIsDrawerOpen} />} />
        
        {/* Single Mandir details */}
        <Route path="/mandir/:mandirId" element={<MandirDetails />} />
        <Route path="/helps/:helpsId" element={<HelpsDetails />} />

        {/* Single Service Details */}
        <Route path="/service/:serviceId" element={<ServiceDetails />} />

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

      

      </Routes>

      {/* Conditionally render the footer based on the current route */}
      {!isAdminRoute(location.pathname) ? <Footer /> : <AdminFooter />}

     


      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        totalQuantity={totalQuantity}
        productsByCategory={productsByCategory}
      />
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
