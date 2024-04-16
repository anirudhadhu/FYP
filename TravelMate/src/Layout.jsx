import React from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";

const Layout = () => {
  return (
    // className="py-4 px-8 flex flex-col min-h-screen"
    <div>
      <Header />
        <Outlet />
        <Footer />
      </div>
  );
};

export default Layout;
