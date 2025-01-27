import { useState, React } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router";
import { Order } from "../../ApiService";

function PaypalPayment(props) {
  //paypal
  let amount = props.totalAmount;
const navigate = useNavigate();
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);
  const onCurrencyChange = ({ target: { value } }) => {
    setCurrency(value);
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: value,
      },
    });
  };
  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: (amount * 0.01).toFixed(2),
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    try {
      return actions.order.capture().then((details) => {
        // const name = details.payer.name.given_name;
        if(details.status==="COMPLETED"){
          const sendDetails={
            status:details.status==="COMPLETED"?1:0,
            totalAmount:amount
          }
            Order(sendDetails).then((res)=>{
                navigate("/orderDetails", {state:res})
            }
            );
        }
      });
    } catch {
      alert("Error occured while transaction.");
    }
  };

  return (
    <div className="checkout">
      {isPending ? (
        <p>LOADING...</p>
      ) : (
        <>
          <select value={currency} onChange={onCurrencyChange}>
            <option value="USD">💵 USD</option>
            <option value="EUR">💶 Euro</option>
          </select>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => onCreateOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
        </>
      )}
    </div>
  );
}

export default PaypalPayment;
