import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import useStore from "../components/store";
import { useEffect } from "react";
import axios from "axios";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  console.log("Component protectedRoute", Component?.protectedRoute);
  const setAccessToken = useStore(s => s.setAccessToken);
  const setIsAuthenticated = useStore(s => s.setIsAuthenticated);

  useEffect(() => {
    axios
      .post("/api/auth/refresh_token")
      .then(res => {
        console.log("refresh token called");
        if (res.data.status === "success") {
          setAccessToken(res.data.accessToken);
          setIsAuthenticated(true);
        } else {
          setAccessToken(null);
          setIsAuthenticated(false);
        }
      })
      .catch(err => {
        console.log("Error", err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
