import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "bisque" }}
    >
      <Navbar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
