import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [message, setMessage] = useState<null | string>(null);

  useEffect(() => {
    axios
      .get("/api/auth/dashboard")
      .then(res => {
        console.log("dashboard res", res);
        if (res.data.message) {
          setMessage(res.data.message);
        }
      })
      .catch(err => {
        console.log("dashboard error", err);
      });
  }, []);

  return (
    <div>
      <h1 className="mainTitle">Dashboard</h1>
      <h3>Message:-{message && message}</h3>
    </div>
  );
};

export default Dashboard;

Dashboard.protectedRoute = true;
