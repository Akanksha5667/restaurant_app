import React from 'react'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalPayment from './PaypalPayment';
import { useLocation } from 'react-router';

function PaymentGateway() {
  const location =useLocation();
    const totalAmount =location.state;
  const initialOptions = {
    "client-id": "AUlXN3RbFyY5yx8JQo9ON9xUPecy28fWa0D6XwT28f4us1fHrXNQdxKtdzF14bx53b7FaR789m26Mx3b",
    currency: "USD",
    intent: "capture",
  };
  return (
    <div>
      <PayPalScriptProvider options={initialOptions} >
      <PaypalPayment totalAmount={totalAmount}/>
      </PayPalScriptProvider>
    </div>
  )
}

export default PaymentGateway
