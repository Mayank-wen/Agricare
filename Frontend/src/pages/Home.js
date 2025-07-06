import React from "react";
import styled from "styled-components";
import Footer from "../Components/Footer";

const Container = styled.div`
  font-family: Arial, sans-serif;
  background: url("https://images.pexels.com/photos/1094544/pexels-photo-1094544.jpeg?auto=compress&cs=tinysrgb&w=600");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  min-height: 100vh;
  padding: 20px;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
`;

const HeroSection = styled.div`
  text-align: left;
  width: 100%;
  height: 80vh;
  padding: 4rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2,
  p,
  button {
    color: white;
  }
`;

const Heading = styled.h2`
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const SubText = styled.p`
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const Button = styled.button`
  background-color: #60a5fa;
  color: white;
  padding: 0.75rem 1.5rem; // Reduced padding
  font-size: 1rem; // Reduced font size
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: fit-content; // Makes button width match content
  align-self: flex-start; // Aligns button to the left

  &:hover {
    background-color: #3b82f6;
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ProductCard = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: -10px;

  &:first-child {
    margin-left: -350px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  color: white;
  transform: translateY(0);
  transition: transform 0.3s ease;
`;

const ProductText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #60a5fa;
  margin-bottom: 10px;
`;

const BestMarketSection = styled.div`
  background-color: #719032;
  color: black;
  text-align: center;
  padding: 50px;
  width: 1400px ;
`;

const BestMarketHeading = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
`;

const BestMarketText = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
`;

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const FeatureCard = styled.div`
  background-color: white;
  color: black;
  padding: 20px;
  text-align: center;
  border: 1px solid #ddd;
  width: 200px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const DigitalMarket = () => {
  return (
    <Container>
      <MainContent>
        <HeroSection>
          <Heading>AgriCare Market</Heading>
          <SubText>Fresh produce direct from farmers</SubText>
          <Button>Shop Now</Button>
        </HeroSection>
        <ProductContainer>
          <ProductCard>
            <ProductImage
              src="https://images.pexels.com/photos/5085407/pexels-photo-5085407.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
            <ProductOverlay>
              <ProductText>
                The First Ever Modular Baby Car Seat To Keep Parents Close To
                Their Baby
              </ProductText>
              <Price>$399.00</Price>
              <Button>Shop Now</Button>
            </ProductOverlay>
          </ProductCard>
          <ProductCard>
            <ProductImage
              src="https://images.pexels.com/photos/31028502/pexels-photo-31028502/free-photo-of-colorful-assortment-of-autumn-gourds-and-squashes.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Baby Head Protector"
            />
            <ProductOverlay>
              <ProductText>
                Baby head protector - Enclose the head with the figure of the
                pentagon at the front part based.
              </ProductText>
              <Price>$65.00</Price>
            </ProductOverlay>
          </ProductCard>
        </ProductContainer>
      </MainContent>
      <BestMarketSection>
  <BestMarketHeading>Commodity</BestMarketHeading>
  <BestMarketText>
  
  </BestMarketText>
  <FeaturesContainer>
    <FeatureCard>
      <p>List of commodity</p>
    </FeatureCard>
    <FeatureCard>
      <p></p>
    </FeatureCard>
    <FeatureCard>
      <p>Secure & Fast Transactions</p>
    </FeatureCard>
    <FeatureCard>
      <p>Supporting Sustainable Farming Practices</p>
    </FeatureCard>
  </FeaturesContainer>
</BestMarketSection>

      <Footer />
    </Container>
  );
};

export default DigitalMarket;
