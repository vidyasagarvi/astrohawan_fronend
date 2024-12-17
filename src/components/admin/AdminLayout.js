// src/components/admin/AdminLayout.js
import React from 'react';
import AdminSidebar from './AdminNavBar';
import '../../css/AdminLayout.css'; // Create this CSS file for styling the layout

const AdminLayout = ({ children }) => {
    return (
        
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-content">
                {children}
            </div>
        </div>
     
     
    );
};

export default AdminLayout;