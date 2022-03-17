import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useStore from "../../src/context/store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const setAccessTokenFun = useStore(s => s.setAccessToken);
  // const setIsAuthenticatedFun = useStore(s => s.setIsAuthenticated);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });
      const result = await res.data;
      if (result.status === "success") {
        router.replace("/auth/dashboard");
        if (result.accessToken) {
          setAccessTokenFun(result.accessToken);
          // setIsAuthenticatedFun(true);
        } else {
          // setIsAuthenticatedFun(false);
          setAccessTokenFun(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // I am not validating form, it is just a simple form.
  // You can use React-hook form for more advanced validation
  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h1 className="mainTitle">Login Page</h1>

        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            required
            id="email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            id="password"
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
