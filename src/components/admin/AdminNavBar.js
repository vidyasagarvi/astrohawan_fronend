// src/components/admin/AdminSidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/AdminNavBar.css'; // Ensure this CSS file exists for styling the sidebar

const AdminNavBar = () => {


return (
<div>

<div className="navbar-admin">
<Link to="/admin/site-settings">Dashboard</Link>
  <div className="subnav-admin">
    <button className="subnavbtn-admin">Manage Store &#9662;</button>
    <div className="subnav-content-admin">
    <Link to="/admin/store">List Product</Link>
    <Link to="/admin/add-store">Add Product</Link>
    </div>
  </div> 
  <div className="subnav-admin">
    <button className="subnavbtn-admin">Manage Mandir &#9662;</button>
    <div className="subnav-content-admin">
    <Link to="/admin/store">List Mandir</Link>
    <Link to="/admin/add-store">Add Mandir</Link>
    <Link to="/admin/add-store">List Products</Link>
    <Link to="/admin/add-store">Add Products</Link>
    </div>
  </div> 

  <div className="subnav-admin">
    <button className="subnavbtn-admin">Manage Services &#9662;</button>
    <div className="subnav-content-admin">
    <Link to="/admin/store">List Services</Link>
    <Link to="/admin/add-store">Add Service</Link>
    <Link to="/admin/add-store">List Products</Link>
    <Link to="/admin/add-store">Add Products</Link>
    </div>
  </div> 
  <Link to="/admin/add-store">Orders</Link>
  <Link to="/admin/add-store">Enquiry</Link>
</div>
</div>
    );
};

export default AdminNavBar;
