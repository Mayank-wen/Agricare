import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../Components/Loader";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { useQuery, gql } from "@apollo/client";
import ProductCard from "../Components/ProductCard";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      name
      price
      image
      category
      quantity
      createdAt
      seller {
        id
        name
        email
        role
      }
    }
  }
`;

const Container = styled.div`
  font-family: Arial, sans-serif;
  background: url("https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg?auto=compress&cs=tinysrgb&w=600");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  min-height: 100vh;
  padding: 20px;
`;

const Advertisement = styled.div`
  height: 200px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.pexels.com/photos/185402/vegetables-fresh-tomatoes-fresh-vegetables-185402.jpeg?auto=compress&cs=tinysrgb&w=600");
  background-size: cover;
  background-position: center;
  justify-content: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
  border-radius: 8px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 20px;
  border-radius: 8px;

  h2 {
    margin-bottom: 20px;
    font-size: 22px;
    border-bottom: 2px solid #fff;
    padding-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 10px 15px;
    margin: 5px 0;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 5px;

    &:hover {
      background: #34495e;
      transform: translateX(5px);
    }
  }
`;

const Main = styled.div`
  flex: 1;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  justify-items: center;
`;

const CartButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background: #60a5fa;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #3b82f6;
    transform: translateY(-2px);
  }
`;

const SellButton = styled(CartButton)`
  background: #2ecc71;
  margin-top: 10px;

  &:hover {
    background: #27ae60;
  }
`;

const AddProductForm = styled.form`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  max-width: 500px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background: #60a5fa;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #3b82f6;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  width: 100%;
`;

const MarketPrice = styled.div`
  font-size: 0.9em;
  color: #666;
  margin: 5px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PriceTag = styled.span`
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8em;
  color: white;
  background-color: ${(props) => props.color};
`;

const categories = [
  "Vegetables",
  "Fruits",
  "Flowers",
  "Honey",
  "Crops",
  "Farm Tools",
  "Manure",
  "Pesticides",
];

const DEFAULT_PRODUCT_IMAGE =
  "https://images.pexels.com/photos/1137335/pexels-photo-1137335.jpeg?auto=compress&cs=tinysrgb&w=600";

// Add this new function to fetch price data
const fetchMarketPrice = async (
  commodity,
  state = "Odisha",
  market = "Bhubaneswar"
) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/request?commodity=${commodity}&state=${state}&market=${market}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching market price:", error);
    return null;
  }
};

const OnlineMarketing = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    onError: (error) => {
      console.error("GraphQL Error:", error);
    },
  });

  const products =
    data?.getProducts?.filter((product) => product && product.seller) || [];

  // Add validation before rendering
  const validProducts = products.map((product) => ({
    ...product,
    price: Number(product.price).toFixed(2),
    seller: product.seller || { id: "unknown", name: "Unknown Seller" },
  }));

  const filteredProducts =
    selectedCategory === "All"
      ? validProducts
      : validProducts.filter(
          (product) => product.category === selectedCategory
        );

  // Add debug logs
  console.log("Query state:", { loading, error, data });
  console.log("Products:", products);
  console.log("Filtered products:", filteredProducts);

  if (error) {
    console.error("GraphQL Error:", error);
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <Container>
      <Advertisement>Fresh Farm Products</Advertisement>
      <Content>
        <Sidebar>
          <h2>Categories</h2>
          <ul>
            <li onClick={() => setSelectedCategory("All")}>All Products</li>
            {categories.map((category) => (
              <li key={category} onClick={() => setSelectedCategory(category)}>
                {category}
              </li>
            ))}
          </ul>
          <CartButton onClick={() => navigate("/cart")}>View Cart</CartButton>
          <SellButton onClick={() => navigate("/sell")}>
            Sell Products
          </SellButton>
        </Sidebar>
        <Main>
          {loading ? (
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  price: Number(product.price).toFixed(2),
                }}
              />
            ))
          )}
        </Main>
      </Content>
      <Footer />
    </Container>
  );
};

export default OnlineMarketing;
