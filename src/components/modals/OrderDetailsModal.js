import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table } from 'react-bootstrap';

import Config from '../../config/Config.js';

const OrderSuccessModal = ({ show, handleClose, orderId }) => {
  const [error, setError] = useState(null);
  const [order, setOrders] = useState({});

  useEffect(() => {
    const fetchsingleOrders = async () => {
      try {
        const response = await axios.get(`${Config.apiUrl}api/payment/getorder-id/${orderId}`);
        setOrders(response.data.orders);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to fetch orders. Please try again later.');
      }
    };

    if (orderId) {
      fetchsingleOrders();
    }
  }, [orderId]);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="text-danger">{error}</div>}

        <h5>Order Summary</h5>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>Order ID</th>
              <td>{order.id}</td>
            </tr>
            <tr>
              <th>User Name</th>
              <td>{order.user_name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{order.user_email}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{order.user_phone}</td>
            </tr>
            <tr>
              <th>Shipping Address</th>
              <td>{order.shipping_address}</td>
            </tr>
            <tr>
              <th>Order Status</th>
              <td>{order.order_status}</td>
            </tr>
            <tr>
              <th>Order Date</th>
              <td>{order.order_date ? new Date(order.order_date).toLocaleDateString() : ''}</td>
            </tr>
            <tr>
              <th>GST Charge</th>
              <td>₹{order.gst_charge}</td>
            </tr>
            <tr>
              <th>Shipping Charge</th>
              <td>₹{order.shipping_charge}</td>
            </tr>
            <tr>
              <th>Total Amount</th>
              <td>₹{order.total_ammount}</td>
            </tr>
          </tbody>
        </Table>

        <h5>Products</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Title</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.products && order.products.map((product, index) => (
              <tr key={index}>
                <td>{product.product_title}</td>
                <td>{product.quantity}</td>
                <td>₹{product.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderSuccessModal;
