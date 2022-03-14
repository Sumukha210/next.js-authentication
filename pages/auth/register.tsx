import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      const result = await res.data;
      if (result.status === "success") {
        router.replace("/auth/login");
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
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            id="name"
            required
            name="name"
            onChange={e => setName(e.target.value)}
          />
        </div>

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

export default Register;
