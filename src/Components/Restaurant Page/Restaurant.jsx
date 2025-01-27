import { useEffect, useState } from "react";
import React from "react";
import { Outlet, useParams } from "react-router";
import Header from "../Header";
import { NavLink } from "react-router";
import { GetRestaurantById } from "../../ApiService";

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState("");
  const { id } = useParams();
  const fetchRestaurant = async () => {
    setRestaurant(await GetRestaurantById(id));
    console.log(restaurant);
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  return (
    <div>
      <Header />
      <div className="body">
        <div className="restaurant-container">
          <h1>{restaurant?.name}</h1>
          <p className="location">{restaurant?.location}</p>
          <div className="inner-nav">
            {restaurant && (
              <NavLink
                className="link"
                activeclassname="active-link"
                style={({ isActive }) => ({
                  color:
                    isActive || window.location.pathname === `/restaurant/${id}`
                      ? "red"
                      : "black",
                })}
                to={`/restaurant/${id}/orderOnline`}
              >
                Order Online
              </NavLink>
            )}
            {restaurant && (
              <NavLink
                className="link"
                activeclassname="active-link"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "black",
                })}
                to={`/restaurant/${id}/menu`}
              >
                Menu
              </NavLink>
            )}
            {restaurant && (
              <NavLink
                className="link"
                activeclassname="active-link"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "black",
                })}
                to={`/restaurant/${id}/photos`}
              >
                Photos
              </NavLink>
            )}
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
