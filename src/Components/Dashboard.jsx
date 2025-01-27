import React, { useEffect, useState } from "react";
import { IsTokenValid } from "../ApiService";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Slideshow from "./Carousal/SlideShow";
import biryaniImage from "../assets/biryani.png";
import PaginationComponent from "./Pagination/PaginationComponent";
import ReactSlick from "./Carousal/ReactSlick";
import ErrorBoundary from "./ErrorBoundary";
import Error from "./Error";

export default function Dashboard() {
  const navigate = useNavigate();

  
  useEffect(() => {
    const isTokenValid = async () => {
      const token = localStorage.getItem("token");
      if (token?.length > 0) {
        const isValid = await IsTokenValid(token);
        if (!isValid) {
          localStorage.removeItem("token");
          navigate("/sessionExpiry");
        }
      }
    };
    const intervalId = setInterval(isTokenValid, 10000); // Check every 10 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  });
  // GetById();

  return (
    <div className="outer ">
      <Header />
      <div className="dashboard-body">
        <div className="slide">
          {/* <Outlet /> */}
          <Slideshow />
        </div>
        <div className="dashboard-heading">
          <h1>Choose Your Craving</h1>
        </div>
        <div className="react-slick">
          <ReactSlick />
        </div>
        <div className="dashboard-heading">
          <h1>Food delivery restaurants in Hyderabad</h1>
        </div>
        <div>
            <PaginationComponent/>
        </div>
        <div>
          <ErrorBoundary>
            <Error/>
          </ErrorBoundary>
        </div>
      </div>
      <Footer />
    </div>
  );
}
