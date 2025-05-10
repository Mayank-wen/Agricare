import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { useQuery, gql } from "@apollo/client";
import ProductCard from "../components/ProductCard";

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
  background-color: bisque; // Changed from background: url(...)
  color: #0f3854; // Updated to match the theme color
  min-height: 100vh;
  padding: 20px;
`;

const Advertisement = styled.div`
  height: 200px;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
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
  background: rgba(44, 62, 80, 0.9); // Made semi-transparent
  color: #0f3854;
  padding: 20px;
  border-radius: 8px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(15, 56, 84, 0.2);
`;

const Main = styled.div`
  flex: 1;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  justify-items: center;
  background-color: rgba(255, 246, 229, 0.5); // Light bisque with transparency
  border-radius: 8px;
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

const CategoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  background: rgb(255, 246, 229, 0.9); // Using theme background color
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(15, 56, 84, 0.1);
`;

const CategoryRow = styled.tr`
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(15, 56, 84, 0.05); // Using theme foreground color
  }

  &.selected {
    background-color: rgba(15, 56, 84, 0.1); // Using theme foreground color
  }
`;

const CategoryCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid rgba(15, 56, 84, 0.1);
  color: rgb(15, 56, 84); // Using theme foreground color
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    color: rgba(15, 56, 84, 0.8); // Using theme foreground color with opacity
  }
`;

const CategoryCount = styled.span`
  background: ${(props) =>
    props.count > 0 ? "rgb(15, 56, 84, 0.8)" : "rgb(15, 56, 84, 0.3)"};
  color: rgb(255, 246, 229); // Using theme background color
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-left: auto;
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
          <CategoryTable>
            <tbody>
              <CategoryRow
                className={selectedCategory === "All" ? "selected" : ""}
                onClick={() => setSelectedCategory("All")}
              >
                <CategoryCell>
                  All Products
                  <CategoryCount>{validProducts.length}</CategoryCount>
                </CategoryCell>
              </CategoryRow>
              {categories.map((category) => {
                const count = validProducts.filter(
                  (p) => p.category === category
                ).length;
                return (
                  <CategoryRow
                    key={category}
                    className={selectedCategory === category ? "selected" : ""}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <CategoryCell>
                      {category}
                      <CategoryCount count={count}>{count}</CategoryCount>
                    </CategoryCell>
                  </CategoryRow>
                );
              })}
            </tbody>
          </CategoryTable>
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
    </Container>
  );
};

export default OnlineMarketing;
