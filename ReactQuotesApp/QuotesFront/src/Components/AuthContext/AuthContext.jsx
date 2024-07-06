import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getUserByUsername,
  getUsersRole,
} from "../../Pages/Admin/Users/UsersService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    const expirationTime = new Date(localStorage.getItem("expirationTime"));
    const now = new Date();
    return token && expirationTime > now;
  });

  const login = async (token, username, id) => {
    const now = new Date();
    const expirationTime = new Date(now.getTime() + 1000 * 60 * 100); //10 minutes
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime.toISOString());
    setIsAuthenticated(true);
    localStorage.setItem("username", username);
  };
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const username = localStorage.getItem("username");
        const role = await getUsersRole(username);
        const getUser = await getUserByUsername(username);
        setUser(getUser);
        setIsAdmin(role.roleName === "Admin");
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserRole();
    }
  }, [isAuthenticated]);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    localStorage.removeItem("username");
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isAdmin, user }}>
      {children}
    </AuthContext.Provider>
  );
};
