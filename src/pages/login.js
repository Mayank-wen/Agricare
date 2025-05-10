import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f5f5f5;
`;

const LeftSection = styled.div`
  width: 50%;
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

const RightSection = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #e5e5e5;
`;

const TestimonialCard = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const TestimonialText = styled.p`
  font-style: italic;
  color: #555;
`;

const Author = styled.p`
  font-weight: bold;
  margin-top: 8px;
`;

const Role = styled.p`
  font-size: 14px;
  color: #666;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 8px;
`;

const SignupText = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 12px;
`;

const StyledLink = styled.span`
  color: black;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SuccessMessage = styled.p`
  color: #2ecc71;
  font-weight: bold;
  margin-bottom: 12px;
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Add this hook

  // Show signup success message if redirected from signup
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location]);

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const { token, user } = data.login;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("role", user.role);
      // Redirect to home page after successful login
      navigate("/", { replace: true });
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <Container>
      <LeftSection>
        <Title>Login to your account</Title>
        <Form onSubmit={handleSubmit}>
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>
        <SignupText>
          Don't have an account?{" "}
          <StyledLink onClick={() => navigate("/signup")}>Sign up</StyledLink>
        </SignupText>
      </LeftSection>
      <RightSection>
        <img
          src="https://images.pexels.com/photos/259637/pexels-photo-259637.jpeg?auto=compress&cs=tinysrgb&w=600"
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

export default LoginPage;
