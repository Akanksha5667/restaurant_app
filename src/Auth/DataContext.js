import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token")?.length > 0);
  const [updatedCartCount, setCartItemsCount] = useState();
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("user-type") === "admin");
  const login = () => {
    setIsAuthenticated(true);
    setIsAdmin(localStorage.getItem("user-type") === "admin");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user-type");
    setIsAuthenticated(false);
  };

  return (
    <>
      <DataContext.Provider value={{ isAuthenticated, isAdmin, login, logout, updatedCartCount, setCartItemsCount }}>
        {children}
      </DataContext.Provider>
    </>
  );
};

export const useData = () => useContext(DataContext);
