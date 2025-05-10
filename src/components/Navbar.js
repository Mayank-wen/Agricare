import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import Loader from "./Loader";

const Navbar = ({ menuOpen, toggleMenu }) => {
  const navigate = useNavigate();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setHasScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${hasScrolled ? "navbar-scrolled" : ""}`}>
      <div className="max-w-[1200px] mx-auto px-2 py-1 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            className="flex items-center border border-[#0F3854]/20 px-2 py-0.5 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0F3854"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07l14.14-14.14" />
            </svg>
            <span className="font-bold text-[#0F3854] text-lg">AGRICARE</span>
            <div className="ml-1 scale-[0.25]">
              <Loader />
            </div>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className="navbar-link">
            Home
          </NavLink>
          <NavLink to="/shop" className="navbar-link">
            Shop
          </NavLink>
          <NavLink to="/weather" className="navbar-link">
            Weather
          </NavLink>
          <NavLink to="/training" className="navbar-link">
            Training
          </NavLink>
          <NavLink to="/baking" className="navbar-link">
            Resources
          </NavLink>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            className="get-started-button"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
          <button className="menu-button md:hidden" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
