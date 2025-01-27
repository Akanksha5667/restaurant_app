import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { GetCartItems, UpdateQuantity } from "../ApiService";
import { DeleteCartItem } from "../ApiService";
import { useNavigate } from "react-router";

export default function Cart() {
  
  const location = useLocation();
  const [cartItems, setCartItems] = useState();
  const fetchCartItems = async () => {
    setCartItems(await GetCartItems());
  };

  useEffect(() => {
    // setCartItems(location.state);
    fetchCartItems();
  }, []);

const navigate=useNavigate();
  const UpdateQuantityFunc = async (cartItemId, number, quantity) => {
    if (quantity === 1 && number === -1) {
      await DeleteCartItem(cartItemId);
    } else {
      const updateQuantityDTO = {
        cartItemId: cartItemId,
        number: number,
      };
      await UpdateQuantity(updateQuantityDTO);
    }
    fetchCartItems();
  };

  const calculateTotal = () =>
    cartItems.reduce(
      (total, item) => total + item.itemPrice * item.quantity,
      0
    );

  const removeItem = async (id) => {
    const response = await DeleteCartItem(id);
    if (response) {
      const index = cartItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        const newArray = [
          ...cartItems.slice(0, index),
          ...cartItems.slice(index + 1),
        ];
        setCartItems(newArray);
      }
    }
  };

  const onCheckoutClick=(totalAmount)=>{
    navigate("/paymentGateway",{state:totalAmount});
  }
  
  return (
    <div className="cart-fullscreen">
      <h1>Shopping Cart</h1>
      {cartItems?.length > 0 ? (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Price:  <i class="fas fa-rupee-sign mr-5"></i> {item.itemPrice}</p>
                </div>
                <div className="item-actions">
                  <div className="flex increase-decrease-div space-between add-btn-cart">
                    <button
                      onClick={() =>
                        UpdateQuantityFunc(item.id, -1, item.quantity)
                      }
                      className="small-btn minus-btn"
                    >
                      -
                    </button>
                    <p className="quantity">
                      <b>{item.quantity}</b>
                    </p>
                    <button
                      onClick={() =>
                        UpdateQuantityFunc(item.id, 1, item.quantity)
                      }
                      className="small-btn plus-btn"
                    >
                      <b>+</b>
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
                <div className="item-total">
                  <i class="fas fa-rupee-sign mr-5"></i>
                  {(item.itemPrice * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: <i class="fas fa-rupee-sign mr-5"></i>{calculateTotal().toFixed(2)}</h3>
            <button onClick={()=>{onCheckoutClick(calculateTotal().toFixed(2))}} className="checkout-button">Paypal Payment</button>
          </div>
        </div>
      ) : (
        <div className="cart-msg-div">
        <p>Don't leave your cart lonely – add something to it!</p>
        </div>
      )}
    </div>
  );
}