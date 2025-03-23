import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Config from '../../config/Config';
import '../../css/AdminLayout.css'; // Import the CSS file for styles

function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('adminToken');
    if(token){
        navigate('/admin/dashboard');
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${Config.apiUrl}admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (data.status === 'success') {
            localStorage.setItem('adminToken', data.admin);
            navigate('/admin/dashboard');
        } else {
            alert('Login failed');
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default AdminLoginPage;
