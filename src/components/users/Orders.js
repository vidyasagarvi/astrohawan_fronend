import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Config from '../../config/Config';
import OrderdetailsModal from '../modals/OrderDetailsModal.js';


function OrderDashboard() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showOrderdetailsModal, setOrderdetailsModal] = useState(false);
    const [showOrderId, setOrderId] = useState(false);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('User is not authenticated');

                const response = await axios.get(`${Config.apiUrl}api/payment/getuser-order/${token}/${page}`, {
                    headers: { Authorization: token },
                });

                setOrders(response.data.orders);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                console.error('Failed to fetch orders:', err);
                setError('Failed to fetch orders. Please try again later.');
            }
        };

        fetchOrders();
    }, [page]);

    const handlePageChange = (newPage) => {

        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };


    const showOrderDetails = async (orderID) => {

        setOrderId(orderID);
        setOrderdetailsModal(true);


    }


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!orders || orders.length === 0) {
        return <div>No orders found</div>;
    }

    return (

        <div className="myaccount-order">
            <h2>My Orders</h2>
            <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Order ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>User Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>GST Charge</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Shipping Charge</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Total Amount</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Order Status</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Order Date</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.id}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.user_name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.gst_charge}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.shipping_charge}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.total_ammount}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.order_status}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {new Date(order.order_date).toLocaleDateString()}
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <button
                                    onClick={() => showOrderDetails(order.id)}
                                    style={{
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        padding: '5px 10px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            <div className="col-12">
                <div class="pagination d-flex justify-content-center mt-5">
                    <a href="javascript: false" className="rounded" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                        &laquo;
                    </a>
                    {[...Array(totalPages)].map((_, index) => (
                        <a href="javascript: false"
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={index + 1 === page ? 'active rounded' : 'rounded'}
                        >
                            {index + 1}
                        </a>
                    ))}
                    <a href="javascript: false" className="rounded" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                        &raquo;
                    </a>
                </div>
            </div>

            {showOrderId && (
                <OrderdetailsModal
                    show={showOrderdetailsModal}
                    handleClose={() => setOrderdetailsModal(false)}
                    orderId={showOrderId}
                />
            )}
        </div>
    );
}

export default OrderDashboard;
