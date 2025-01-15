import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


function UserNavbar() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path;
    const searchParams = new URLSearchParams(location.search);
    const language = searchParams.get('lang') || 'en';

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('');
    };

    return (
        <div className="navbar-admin">

            <Link to={`/my-account?lang=${language}`}>Dashboard</Link>

            <Link to={`/my-account/orders?lang=${language}`}>Orders</Link>

            <Link to={`/my-account/profile?lang=${language}`}>Account details</Link>

            <Link to={`/my-account/password?lang=${language}`}>Change Password</Link>

            <Link to="#" onClick={handleLogout}>Log out</Link>

        </div>
    );
}

export default UserNavbar;
