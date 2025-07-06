import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f5f5f5;
`;

const LeftSection = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  background: #fff;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 12px;
`;

const Button = styled.button`
  width: 100%;
  background: black;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #333;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const RightSection = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TestimonialCard = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  background: trasnparent;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  color: #fff;
`;

const TestimonialText = styled.p`
  font-style: italic;
  color: #fff;
`;

const Author = styled.p`
  font-weight: bold;
  margin-top: 8px;
`;

const Role = styled.p`
  font-size: 14px;
  color: #ff;
`;

const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
      user {
        id
        name
        email
        role
      }
    }
  }
`;

// Component
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer", // default role
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      // Don't store token/data after signup
      // Just redirect to login
      navigate("/login", {
        state: {
          message: "Account created successfully! Please login.",
        },
      });
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup({
        variables: {
          input: formData,
        },
      });
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <Container>
      <LeftSection>
        <Title>Create your account</Title>
        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <Select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="buyer">Buyer</option>
            <option value="farmer">Farmer</option>
          </Select>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </Form>
      </LeftSection>
      <RightSection>
        <img
          src="https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Model"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <TestimonialCard>
          <TestimonialText>
            "Experience the future of agriculture with AgriCare. Fresh produce,
            direct from farmers to your doorstep!"
          </TestimonialText>
          <Author>Farmer Rajesh Kumar</Author>
          <Role>Organic Farming Expert</Role>
        </TestimonialCard>
      </RightSection>
    </Container>
  );
};

export default SignUpPage;
