import React, { useEffect, useRef } from "react";
import { useData } from "../Auth/DataContext";
import { useState } from "react";
import logo from "../assets/logo.png";
import {
  GetCartItems,
  FetchSearchItems,
  GetRetaurantsOnSearch,
  GetRetaurantItemsOnSearch,
} from "../ApiService";
import { useNavigate } from "react-router";

export default function Header() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pRef = useRef(null);
  const { logout } = useData();
  const handleLogout = () => {
    logout();
    setShowLogoutPopup(false);
  };
let {updatedCartCount,setCartItemsCount}=useData();
  const fetchCartItems = async () => {
    const data = await GetCartItems();
    setCartItems(data);
    setCartItemsCount(data.length);
    console.log(data.length)
  };
  const onCartClick = () => {
    navigate("/cart", { state: cartItems });
  };
  useEffect(() => {
   fetchCartItems();
  }, []);
  const onItemClick=(id,name, itemType)=>{
    // const itemType = pRef.current.textContent;
    if(itemType==="restaurant"){
      navigate(`/restaurant/${id}`)
    }else{
      navigate(`/searchItems/${name}`)
    }
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartItems]);

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim() !== "") {
      const restaurants = await GetRetaurantsOnSearch(value);
      const restaurantItems = await GetRetaurantItemsOnSearch(value);
      const combinedItems = restaurants.concat(restaurantItems);
      setItems(combinedItems);
      setDropdownOpen(true);
    }else{
      setDropdownOpen(false);
    }
  };
  return (
    <div className="header-container">
      <div className="navbar">
        <img className="logo" src={logo} alt="logo" />
        <div class="search-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for restaurant and food"
            class="search-input"
          />
          <i class="fas fa-search search-icon"></i>
          {setDropdownOpen && inputValue && items.length > 0 && (
            <div ref={dropdownRef} className="dropdown">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="dropdown-item"
                  onClick={() => onItemClick(item.id,item.name,item.location ? "restaurant" : "dish")}
                >
                  {item.name}
                  <p>{item.location ? "restaurant" : "dish"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex align-items logout-div">
          <div onClick={() => onCartClick()} className="align-items flex">
            <div className="cart-items-count flex align-items justify-content">
              <b>{updatedCartCount}</b>
            </div>
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
          <button
            onClick={() => setShowLogoutPopup(true)}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
      <div></div>
      {showLogoutPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="button-div">
              <button onClick={handleLogout} className="confirm-button">
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
