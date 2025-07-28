import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

// Define navbar height as a constant
export const NAVBAR_HEIGHT = "70px";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: ${NAVBAR_HEIGHT}; // Add margin-top equal to navbar height
  min-height: calc(100vh - ${NAVBAR_HEIGHT}); // Adjust min-height
`;

const Layout = () => {
  return (
    <LayoutWrapper>
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutWrapper>
  );
};

export default Layout;
