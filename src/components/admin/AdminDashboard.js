import React, { useEffect, useState } from 'react';

function AdminDashboard() {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        const fetchStatistics = async () => {
            const response = await fetch('http://127.0.0.1:3000/api/statistics', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            const data = await response.json();
            setStatistics(data);
        };

        fetchStatistics();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div>
                <h3>Site Statistics</h3>
                <p>Total Sales: ${statistics.totalSales}</p>
                <p>Number of Products: {statistics.totalProducts}</p>
                <p>Number of Orders: {statistics.totalOrders}</p>
                <p>Number of Users: {statistics.totalUsers}</p>
            </div>
            
        </div>
    );
}

export default AdminDashboard;
