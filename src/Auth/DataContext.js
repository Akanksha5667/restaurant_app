import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [isAuthenticated , setIsAuthenticated]= useState(localStorage.getItem("token")?.length>0);
  const [updatedCartCount, setCartItemsCount] = useState();
  
  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <>
    <DataContext.Provider value={{  isAuthenticated, login, logout,updatedCartCount, setCartItemsCount }}>
      {children}
    </DataContext.Provider>
    </>
  );
};

export const useData = () => useContext(DataContext);
