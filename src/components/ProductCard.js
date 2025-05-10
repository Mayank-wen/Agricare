import React, { useState } from "react"; // Add useState import
import styled from "styled-components";
import { useCart } from "./CartContext";

const ProductCard = ({ product }) => {
  // Add console.log to debug
  console.log("Product data:", product);

  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1); // Add quantity state

  const DEFAULT_PRODUCT_IMAGE =
    "https://images.pexels.com/photos/1137335/pexels-photo-1137335.jpeg?auto=compress&cs=tinysrgb&w=600";

  if (!product) {
    return null; // or some fallback UI
  }

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(product.quantity, prev + change))
    );
  };

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-img">
          <img
            src={product.image || DEFAULT_PRODUCT_IMAGE}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.src = DEFAULT_PRODUCT_IMAGE;
            }}
          />
        </div>
        <div className="card-title">{product.name}</div>
        <hr className="card-divider" />
        <div className="card-footer">
          <div className="card-price">
            <span>₹</span> {product.price}
          </div>
          <div className="quantity-controls">
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.quantity}
            >
              +
            </button>
          </div>
          <button
            className="card-btn"
            onClick={addToCart}
            disabled={product.quantity < 1}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --main-color: #323232;
    --main-focus: #2d8cf0;
    width: 230px;
    height: auto; // Changed from fixed height to auto
    min-height: 350px; // Reduced height since description is removed
    background: var(--bg-color);
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 15px; // Increased gap
  }

  .card-img {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 5px;
  }

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .card-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--font-color);
  }

  .card-divider {
    width: 100%;
    border: 1px solid var(--main-color);
    border-radius: 50px;
  }

  .card-footer {
    display: flex;
    flex-direction: column; // Changed to column
    align-items: stretch; // Changed from space-between
    gap: 10px; // Added gap between elements
    margin-top: auto;
  }

  .card-price {
    font-size: 24px; // Increased size
    font-weight: 600;
    text-align: center;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    justify-content: center; // Added center alignment
    gap: 12px; // Increased gap
    margin: 10px 0; // Changed from horizontal to vertical margin
  }

  .quantity-btn {
    width: 24px;
    height: 24px;
    border: 1px solid var(--main-color);
    border-radius: 4px;
    background: var(--bg-color);
    color: var(--main-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background: var(--main-focus);
      color: white;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .quantity {
    font-size: 16px;
    min-width: 20px;
    text-align: center;
  }

  .card-btn {
    width: 100%; // Make button full width
    padding: 10px 16px; // Increased padding
    background: var(--bg-color);
    border: 2px solid var(--main-color);
    border-radius: 5px;
    font-size: 16px; // Increased size
    font-weight: 600;
    color: var(--main-color);
    transition: all 0.3s ease;
    cursor: pointer;
    text-align: center;
  }

  .card-btn:hover {
    background: var(--main-focus);
    border-color: var(--main-focus);
    color: white;
    transform: translateY(-2px);
  }

  .card-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: none;
      background: var(--bg-color);
      border-color: var(--main-color);
      color: var(--main-color);
    }
  }
`;

export default ProductCard;
