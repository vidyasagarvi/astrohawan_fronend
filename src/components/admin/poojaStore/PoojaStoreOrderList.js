import React, { useEffect, useState } from 'react';

function AdminOrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('http://127.0.0.1:3000/api/orders', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            const data = await response.json();
            setOrders(data);
        };

        fetchOrders();
    }, []);

    const handleUpdateStatus = async (orderId, status) => {
        const response = await fetch(`http://127.0.0.1:3000/api/orders/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            },
            body: JSON.stringify({ status }),
        });

        if (response.ok) {
            setOrders(orders.map(order => order.id === orderId ? { ...order, status } : order));
        } else {
            alert('Failed to update order status');
        }
    };

    return (
        <div>
            <h2>Order List</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        {order.customerName} - {order.status}
                        <button onClick={() => handleUpdateStatus(order.id, 'Shipped')}>Mark as Shipped</button>
                        <button onClick={() => handleUpdateStatus(order.id, 'Delivered')}>Mark as Delivered</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminOrderList;
