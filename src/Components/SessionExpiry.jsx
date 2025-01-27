import React, { useEffect } from "react";
import { useData } from "../Auth/DataContext";
export default function SessionExpiry() {
    const {logout} =useData();
    const handleLinkClick=()=>{
        logout();
    }
    useEffect(()=>{
        setTimeout(() => {
            logout(); 
        }, 10000);
    });
  return (
    <>
      <h1>Session Timed out</h1>
      <p>Redirecting to Login...</p>
      <button onClick={handleLinkClick} >login</button>
    </>
  );
}
