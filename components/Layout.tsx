import React from "react";
import useStore from "./store";

const Layout: React.FC = ({ children }) => {
  const isAuthenticated = useStore(s => s.isAuthenticated);

  return <div className="layoutContainer">Layout</div>;
};

export default Layout;
