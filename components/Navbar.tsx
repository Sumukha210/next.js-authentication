import Link from "next/link";
import React from "react";
import useStore from "./store";
import axios from "axios";

const Navbar = () => {
  const isAuthenticated = useStore(s => s.isAuthenticated);
  // const setIsAuthenticated = useStore(s => s.setIsAuthenticated);
  const setAccessToken = useStore(s => s.setAccessToken);

  const handleLogout = async () => {
    const res = await axios.get("/api/auth/logout");
    console.log("Logout res", res.data.status);
    if (res.data.status === "success") {
      // setIsAuthenticated(false);
      setAccessToken(null);
    }
  };

  return (
    <div className="navbar">
      <div className="logo">Next Authentication</div>

      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>

        <li>
          <Link href="/auth/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link href="/auth/register">Register</Link>
        </li>
        <li>
          {isAuthenticated ? (
            <button onClick={() => handleLogout()}>Logout</button>
          ) : (
            <Link href="/auth/login">Login</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
