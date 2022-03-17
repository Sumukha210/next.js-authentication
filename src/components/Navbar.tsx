import Link from "next/link";
import React, { useEffect } from "react";
import useStore from "../context/store";
import axios from "axios";

const Navbar = () => {
  const isAuthenticated = useStore(s => s.isAuthenticated);
  const setAccessToken = useStore(s => s.setAccessToken);

  const handleLogout = async () => {
    const res = await axios.get("/api/auth/logout");
    console.log("Logout res", res.data.status);
    if (res.data.status === "success") {
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
          <Link href="/auth/protected">Protected</Link>
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
