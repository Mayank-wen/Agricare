import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 70px; // Add explicit height
  background: rgba(114, 158, 126, 0.95);
  backdrop-filter: blur(5px);
  padding: 0 20px; // Adjust padding
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  align-items: center; // Center content vertically
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 24px;
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px; // Match navbar height
    left: 0;
    right: 0;
    background: rgba(114, 158, 126, 0.98);
    padding: 2rem;
    flex-direction: column;
    transform: ${(props) =>
      props.isOpen ? "translateX(0)" : "translateX(-100%)"};
    transition: transform 0.3s ease-in-out;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
`;

const LoginButton = styled.button`
  background: white;
  color: #729e7e;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-1px);
  }
`;

const ProfileDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ProfilePic = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.span`
  color: white;
  font-weight: 500;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 8px 0;
  z-index: 1;
`;

const DropdownItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 8px 16px;
  border: none;
  background: none;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;

  &:hover {
    background: #f5f5f5;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {
    name: "User",
    avatar: "https://via.placeholder.com/32",
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    const dropdown = document.getElementById("profileDropdown");
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">AgriCare</Logo>

        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>

        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/shop" onClick={closeMenu}>
            Shop
          </NavLink>
          <NavLink to="/crop-planner" onClick={closeMenu}>
            Crop Planner
          </NavLink>
          <NavLink to="/weather-dashboard" onClick={closeMenu}>
            Weather Dashboard
          </NavLink>
          <NavLink to="/training" onClick={closeMenu}>
            Training
          </NavLink>
          <Link to="/disease-detection" className="nav-link">
            Disease Detection
          </Link>
          {isLoggedIn ? (
            <ProfileDropdownContainer>
              <ProfileButton onClick={handleProfileClick}>
                <ProfilePic src={userProfile.avatar} alt={userProfile.name} />
                <ProfileName>{userProfile.name}</ProfileName>
              </ProfileButton>
              <DropdownContent id="profileDropdown">
                <DropdownItem
                  onClick={() => {
                    navigate("/profile");
                    closeMenu();
                  }}
                >
                  Profile
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownContent>
            </ProfileDropdownContainer>
          ) : (
            <LoginButton
              onClick={() => {
                navigate("/login");
                closeMenu();
              }}
            >
              Login
            </LoginButton>
          )}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
