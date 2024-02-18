import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    const expirationTime = new Date(localStorage.getItem("expirationTime"));
    const now = new Date();
    return token && expirationTime > now;
  });
  const login = (token) => {
    const now = new Date();
    const expirationTime = new Date(now.getTime() + 1000 * 60 * 10); //10 minutes
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime.toISOString());
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
