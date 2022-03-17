import "../src/styles/globals.css";
import { useEffect } from "react";
import axios from "axios";
import useStore from "../src/context/store";
import Navbar from "../src/components/Navbar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  console.log("Component protectedRoute", Component?.protectedRoute);
  const setAccessToken = useStore(s => s.setAccessToken);
  const setLoading = useStore(s => s.setLoading);

  useEffect(() => {
    setLoading(true);
    axios
      .post("/api/auth/refresh_token")
      .then(res => {
        if (res.data.status === "success") {
          setAccessToken(res.data.accessToken);
        } else {
          setAccessToken(null);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
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
