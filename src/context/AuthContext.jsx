import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();
  // const [user, setUser] = useState(null);

  const verifyToken = async (currentToken) => {
    const response = await fetch("http://localhost:5005/auth/verify", {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    if (response.status === 200) {
      const parsed = await response.json();
      setToken(currentToken);
      setIsLoggedIn(true);
      console.log(parsed);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const localToken = localStorage.getItem("authToken");
    if (localToken) {
      verifyToken(localToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      setIsLoading(false);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const logout = () => {
    setToken();
    localStorage.removeItem("authToken");
    console.log("user logged out");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, isLoggedIn, isLoading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProviderWrapper;
