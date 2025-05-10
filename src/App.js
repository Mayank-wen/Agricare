import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import Shop from "./pages/shop";
import Homepage from "./pages/Homepage";
import Weather from "./pages/Weather";
import Training from "./pages/Training";
import BakingPage from "./pages/rs";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/Signup";
import { WatchPage } from "./pages/watchPage"; // Add this import

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/training" element={<Training />} />
          <Route path="/baking" element={<BakingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/watch" element={<WatchPage />} /> {/* Add this line */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
