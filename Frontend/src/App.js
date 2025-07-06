import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./pages/Home";
import ColdStorage from "./pages/ColdStorage";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import CropRecommendation from "./pages/CropRecommendation";
import WeatherDashboard from "./pages/WeatherDash"; // Add this import
import { CartProvider } from "./Components/CartContext";
import Sell from "./pages/Sell";
import Profile from "./pages/Profile";
import TrainingPage from "./pages/TrainingPage";
import WatchPage from "./pages/watchPage";import DiseaseDetection from "./pages/dd";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home/>} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cold-storage" element={<ColdStorage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/crop-planner" element={<CropRecommendation />} />
            <Route path="/weather-dashboard" element={<WeatherDashboard />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/disease-detection" element={<DiseaseDetection />} />
      
            {/* Update this line to match the navigation path */}
            <Route path="/watch" element={<WatchPage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
