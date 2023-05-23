import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();
  // const [user, setUser] = useState(null);

  const verifyToken = async (currentToken) => {
    try {
      const response = await axios.get(`${VITE_BASE_API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      if (response.status === 200) {
        const parsed = response.data;
        setToken(currentToken);
        setIsLoggedIn(true);
        console.log(parsed);
      }
    } catch (error) {
      console.error(error);
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
    <AuthContext.Provider value={{ token, setToken, isLoggedIn, isLoading, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProviderWrapper;
