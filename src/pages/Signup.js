import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const LoginPage = styled.div`
  display: flex;
`;

const Login = styled.div`
  width: 30%;
  height: 100vh;
  background: #fff;
  padding: 70px;
`;

const LoginTitle = styled.h2`
  text-align: center;
`;

const Notice = styled.p`
  font-size: 13px;
  text-align: center;
  color: #666;
`;

const FormLogin = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
`;

const Label = styled.label`
  text-align: left;
  font-size: 13px;
  margin-top: 10px;
  margin-left: 20px;
  display: block;
  color: #666;
`;

const InputContainer = styled.div`
  width: 100%;
  background: #ededed;
  border-radius: 25px;
  margin: 4px 0 10px 0;
  padding: 10px;
  display: flex;
`;

const Input = styled.input`
  width: 100%;
  border: 0;
  background: none;
  font-size: 16px;
  padding: 4px 0;
  outline: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  border: 0;
  border-radius: 25px;
  padding: 14px;
  background: #008552;
  color: #fff;
  display: inline-block;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  transition: ease all 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const Background = styled.div`
  width: 70%;
  padding: 40px;
  height: 100vh;
  background: linear-gradient(
      60deg,
      rgba(158, 189, 19, 0.5),
      rgba(0, 133, 82, 0.7)
    ),
    url("https://images.pexels.com/photos/2131784/pexels-photo-2131784.jpeg?auto=compress&cs=tinysrgb&w=600") center no-repeat;
  background-size: cover;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-end;
  align-content: center;
  flex-direction: row;

  h1 {
    max-width: 420px;
    color: #fff;
    text-align: right;
    padding: 0;
    margin: 0;
  }
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
    role: "buyer",
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
    <LoginPage>
      <Login>
        <LoginTitle>Create Account</LoginTitle>
        <Notice>Please fill in the details to create your account</Notice>
        <FormLogin onSubmit={handleSubmit}>
          <Label htmlFor="name">Name</Label>
          <InputContainer>
            <FontAwesomeIcon icon={faUser} className="icon" />
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </InputContainer>

          <Label htmlFor="email">E-mail</Label>
          <InputContainer>
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <Input
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </InputContainer>

          <Label htmlFor="password">Password</Label>
          <InputContainer>
            <FontAwesomeIcon icon={faLock} className="icon" />
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </InputContainer>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </SubmitButton>
        </FormLogin>
        <a href="/login">Already have an account? Login</a>
      </Login>
      <Background>
        <h1>Join AgriCare and be part of the sustainable farming revolution</h1>
      </Background>
    </LoginPage>
  );
};

export default SignUpPage;
