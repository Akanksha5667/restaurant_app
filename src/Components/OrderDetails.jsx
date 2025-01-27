import React from 'react'
import { Link } from 'react-router'
import { useLocation } from "react-router";

function OrderDetails() {   
  const location = useLocation();
  const orderDetails=location.state;
  return (
    <div>
<div class="order-container">
        <h1>Order Details</h1>
        <div class="order-detail">
            <span class="label">Order ID</span>
            <span class="value">12345</span>
        </div>
        <div class="order-detail">
            <span class="label">Name</span>
            <span class="value">{orderDetails.name}</span>
        </div>
        <div class="order-detail">
            <span class="label">Total Amount:</span>
            <span class="value">{orderDetails.totalAmount}</span>
        </div>
        <div class="order-detail">
            <span class="label">Status</span>
            <span class="value">{orderDetails.status===1?"Successful":"Failed"}</span>
        </div>
        <div class="order-detail">
            <span class="label">Delivery Address:</span>
            <span class="value">123 Main Street, Cityville</span>
        </div>
     
    </div>
    <div className='order-details-link'>
    <Link to="/dashboard">Return to Dashboard</Link>
    </div>
    </div>
       
  )
}

export default OrderDetails
