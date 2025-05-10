import React from "react";
import styled from "styled-components";
import { useCart } from "../Components/CartContext";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

// Add CREATE_ORDER mutation
const CREATE_ORDER = gql`
  mutation CreateOrder($products: [OrderItemInput!]!) {
    createOrder(products: $products) {
      id
      total
      status
      products {
        product {
          id
          name
          price
        }
        quantity
      }
    }
  }
`;

const Cart = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [createOrder, { loading }] = useMutation(CREATE_ORDER, {
    onCompleted: () => {
      // Clear cart after successful order
      dispatch({ type: "CLEAR_CART" });
      alert("Order placed successfully!");
      navigate("/shop");
    },
    onError: (error) => {
      console.error("Order error:", error);
      alert("Error placing order: " + error.message);
    },
  });

  const subtotal = state.items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );
  const shipping = 40;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    if (!localStorage.getItem("token")) {
      alert("Please login to checkout");
      navigate("/login");
      return;
    }

    try {
      const orderItems = state.items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      await createOrder({
        variables: {
          products: orderItems,
        },
        context: {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        },
      });
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to process checkout");
    }
  };

  return (
    <>
      <StyledWrapper>
        <div className="container">
          <div className="card cart">
            <label className="title">CHECKOUT</label>
            <div className="steps">
              <div className="step">
                {state.items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-price">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                <hr />
                <div className="promo">
                  <span>HAVE A PROMO CODE?</span>
                  <form className="form">
                    <input
                      type="text"
                      placeholder="Enter a Promo Code"
                      className="input_field"
                    />
                    <button>Apply</button>
                  </form>
                </div>
                <hr />
                <div className="payments">
                  <span>PAYMENT</span>
                  <div className="details">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                    <span>Shipping:</span>
                    <span>₹{shipping.toFixed(2)}</span>
                    <span>Tax (18%):</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card checkout">
            <div className="footer">
              <label className="price">₹{total.toFixed(2)}</label>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={loading || state.items.length === 0}
              >
                {loading ? "Processing..." : "Checkout"}
              </button>
            </div>
          </div>
        </div>
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  /* Body */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    min-height: calc(100vh - 80px);
  }

  hr {
    height: 1px;
    background-color: rgba(16, 86, 82, 0.75);
    border: none;
  }

  .card {
    width: 400px;
    background: rgb(255, 250, 235);
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01),
      0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09),
      0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
  }

  .title {
    width: 100%;
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid rgba(16, 86, 82, 0.75);
    font-weight: 700;
    font-size: 11px;
    color: #000000;
  }

  /* Cart */
  .cart {
    border-radius: 19px 19px 0px 0px;
  }

  .cart .steps {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .cart .steps .step {
    display: grid;
    gap: 10px;
  }

  .cart .steps .step span {
    font-size: 13px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 8px;
    display: block;
  }

  .cart .steps .step p {
    font-size: 11px;
    font-weight: 600;
    color: #000000;
  }

  .cart-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(16, 86, 82, 0.1);

    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 5px;
      margin-right: 15px;
    }

    .item-details {
      flex: 1;

      .item-name {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 5px;
      }

      .item-price {
        font-size: 13px;
        color: #666;
      }
    }
  }

  /* Promo */
  .promo form {
    display: grid;
    grid-template-columns: 1fr 80px;
    gap: 10px;
    padding: 0px;
  }

  .input_field {
    width: auto;
    height: 36px;
    padding: 0 0 0 12px;
    border-radius: 5px;
    outline: none;
    border: 1px solid rgb(16, 86, 82);
    background-color: rgb(251, 243, 228);
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }

  .input_field:focus {
    border: 1px solid transparent;
    box-shadow: 0px 0px 0px 2px rgb(251, 243, 228);
    background-color: rgb(201, 193, 178);
  }

  .promo form button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 18px;
    gap: 10px;
    width: 100%;
    height: 36px;
    background: rgba(16, 86, 82, 0.75);
    box-shadow: 0px 0.5px 0.5px #f3d2c9, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 5px;
    border: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
  }

  /* Checkout */
  .payments .details {
    display: grid;
    grid-template-columns: 10fr 1fr;
    padding: 0px;
    gap: 5px;
  }

  .payments .details span:nth-child(odd) {
    font-size: 12px;
    font-weight: 600;
    color: #000000;
    margin: auto auto auto 0;
  }

  .payments .details span:nth-child(even) {
    font-size: 13px;
    font-weight: 600;
    color: #000000;
    margin: auto 0 auto auto;
  }

  .checkout .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
    background-color: rgba(16, 86, 82, 0.5);
  }

  .price {
    position: relative;
    font-size: 22px;
    color: #2b2b2f;
    font-weight: 900;
  }

  .checkout .checkout-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 36px;
    background: rgba(16, 86, 82, 0.55);
    box-shadow: 0px 0.5px 0.5px rgba(16, 86, 82, 0.75),
      0px 1px 0.5px rgba(16, 86, 82, 0.75);
    border-radius: 7px;
    border: 1px solid rgb(16, 86, 82);
    color: #000000;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }
`;

export default Cart;
