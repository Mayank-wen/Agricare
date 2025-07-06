import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

// Update the GraphQL query
const GET_USER_PROFILE = gql`
  query GetUserProfile {
    getUser(id: "${localStorage.getItem("userId")}") {
      id
      name
      email
      role
      createdAt
    }
    getBuyerOrders {
      id
      total
      status
      createdAt
      products {
        product {
          name
          price
        }
        quantity
      }
    }
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_USER_PROFILE);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <LoadingSpinner>Loading profile...</LoadingSpinner>;
  if (error)
    return <ErrorMessage>Error loading profile: {error.message}</ErrorMessage>;

  // Update the profile data section
  const profileData = {
    username: data?.getUser?.name || "User",
    email: data?.getUser?.email || "email@example.com",
    avatar:
      "https://images.pexels.com/photos/1446948/pexels-photo-1446948.jpeg?auto=compress&cs=tinysrgb&w=600", // Default image
    role: data?.getUser?.role || "User",
    createdAt: data?.getUser?.createdAt || new Date().toISOString(),
  };

  const stats = [
    { number: data?.getBuyerOrders?.length || "0", label: "Total Orders" },
    {
      number:
        data?.getBuyerOrders?.filter((order) => order.status === "pending")
          .length || "0",
      label: "Pending Orders",
    },
    {
      number: `₹${
        data?.getBuyerOrders?.reduce((acc, order) => acc + order.total, 0) || 0
      }`,
      label: "Total Spent",
    },
    { number: formatLastLogin(profileData.createdAt), label: "Member Since" },
  ];

  const orderHistory =
    data?.getBuyerOrders?.map((order) => ({
      date: formatLastLogin(order.createdAt),
      status: order.status,
      orderId: order.id,
      total: `₹${order.total}`,
      products: order.products,
    })) || [];

  function formatLastLogin(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return (
    <PageWrapper>
      <EmployeeSection>
        <CardContainer>
          <Header>
            <Indicator />
            <Title>{profileData.role}'s Profile</Title>
            <DownloadButton onClick={handleLogout}>Log out</DownloadButton>
          </Header>
          <EmployeeInfo>
            <ProfileImage src={profileData.avatar} alt="Profile" />
            <Details>
              <Row>
                <Info>
                  <strong>Name:</strong> {profileData.username}
                </Info>
              </Row>
              <Row>
                <Info>
                  <strong>Email:</strong> {profileData.email}
                </Info>
              </Row>
              <Row>
                <Info>
                  <strong>Role:</strong> {profileData.role}
                </Info>
              </Row>
            </Details>
          </EmployeeInfo>
          <StatsContainer>
            {stats.map((stat, index) => (
              <StatBox key={index}>
                <StatNumber isDate={stat.label.includes("Member Since")}>
                  {stat.number}
                </StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatBox>
            ))}
          </StatsContainer>
        </CardContainer>
      </EmployeeSection>

      <AttendanceSection>
        <AttendanceContainer>
          <Header>
            <h1>Order History</h1>
          </Header>
          <Grid>
            {orderHistory.map((order, index) => (
              <AttendanceCard key={index}>
                <h3>{order.date}</h3>
                <span>{order.status}</span>
                <p>
                  <strong>Order ID:</strong> {order.orderId}
                </p>
                <p>
                  <strong>Total:</strong> {order.total}
                </p>
              </AttendanceCard>
            ))}
          </Grid>
        </AttendanceContainer>
      </AttendanceSection>
    </PageWrapper>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
  }

  div {
    display: flex;
    gap: 10px;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
  background-color: #d1c0ec; // Light purple background
`;

const CardContainer = styled.div`
  background: #c4addd; // Lighter purple background
  color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1500px;
  margin: auto;
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  background: #c2d8ad; // Pale Olive for indicator dot
  border-radius: 50%;
`;

const Title = styled.h2`
  flex-grow: 1;
  margin-left: 10px;
  font-size: 18px;
`;

const DownloadButton = styled.button`
  background: #e53e3e;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #c53030;
  }
`;

const EmployeeInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #8d77a8; // Base purple border
`;

const Details = styled.div`
  flex-grow: 1;
  margin-left: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 15px;
  background: #d1c0ec; // Light purple background
  border-radius: 10px;
  border: 1px solid #8d77a8; // Base purple border
`;

const Row = styled.div`
  flex: 1;
  min-width: 200px;
  background: #8d77a8; // Base purple background
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #8d77a8;

  &:hover {
    background: #c4addd; // Lighter purple on hover
  }
`;

const Info = styled.p`
  margin: 0;
  font-size: 14px;
  color: #fff;

  strong {
    display: block;
    font-weight: 700;
    color: #c2d8ad; // Pale Olive for labels
    margin-bottom: 5px;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
  width: 100%;
`;

const StatBox = styled.div`
  background: #8d77a8; // Base purple background
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #d1c0ec; // Light purple border
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: #c4addd; // Lighter purple on hover
  }
`;

const StatNumber = styled.div`
  font-size: ${(props) => (props.isDate ? "16px" : "24px")};
  font-weight: bold;
  color: #fff; // Changed from white to #fff for consistency
  margin-bottom: 5px;
  word-break: break-word;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #fff; // Changed from #999 to #fff
  margin-top: auto;
`;

const AttendanceContainer = styled.div`
  margin-top: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 20px;
  width: 100%;
  padding: 20px 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const AttendanceCard = styled.div`
  background: #8d77a8; // Base purple background
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #d1c0ec; // Light purple border

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    background: #c4addd; // Lighter purple on hover
  }

  h3 {
    margin: 0 0 10px;
    font-size: 18px;
    color: #fff;
  }

  span {
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const EmployeeSection = styled.section`
  width: 100%;
`;

const AttendanceSection = styled.section`
  width: 100%;
  background: #d1c0ec; // Light purple background
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #8d77a8; // Base purple border
`;

// Add these new styled components
const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
  color: #8d77a8;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  text-align: center;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  margin: 2rem;
`;

export default Profile;
