import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useStore from "./store";

const Layout: React.FC = ({ children }) => {
  const isAuthenticated = useStore(s => s.isAuthenticated);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
    } else {
      router.replace("/auth/login");
    }
  }, [isAuthenticated]);

  if (loading) {
    return <p>Loading....</p>;
  }

  return <div className="layoutContainer">{children}</div>;
};

export default Layout;
