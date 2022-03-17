import axios from "axios";
import React, { useEffect, useState } from "react";
import useStore from "../../src/context/store";
import useAuthGuard from "../../src/customHooks/useAuthGuard";
import useAxios from "../../src/customHooks/useAxios";

const Dashboard = () => {
  const [AuthGuard] = useAuthGuard();
  const accessToken = useStore(s => s.accessToken);
  const [resp, setResp] = useState<any>();
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/auth/dashboard")
      .then(res => {
        setResp(res.data);
      })
      .catch(err => {
        console.log("error", err);
      });
  }, [accessToken]);

  return (
    <AuthGuard>
      <h1>Dashboard</h1>
      <h3>
        It is a protected page, it will redirect you to login if you are not
        authenticated
      </h3>
      <p>{resp && JSON.stringify(resp)}</p>
    </AuthGuard>
  );
};

export default Dashboard;
