import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (storedToken) {
      setIsLoggedIn(true);
      setUsername(storedUsername || null);
      setToken(storedToken);
    }
  }, []);


  const login = (newToken, newUsername) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("username", newUsername);
    setIsLoggedIn(true);
    setUsername(newUsername);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername(null);
    setToken(null);

    toast.success("Signed Out Successfully", {
      style: {
      background: "#111827",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.1)",
    },
    });
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, username, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};