import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: white;
  color: black;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  flex: 1;
`;

const RightContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`;

const Subtitle = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
`;

const Badge = styled.span`
  padding: 10px 20px;
  border: 1px solid black;
  border-radius: 50px;
  margin-right: 10px;
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "#ff4d4d" : "transparent")};
  color: ${(props) => (props.primary ? "white" : "black")};
  border: ${(props) => (props.primary ? "none" : "1px solid black")};
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  background: ${(props) => (props.highlight ? "#ff4d4d" : "white")};
  color: ${(props) => (props.highlight ? "white" : "black")};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

export default function ColdStorage() {
  return (
    <Container>
      <LeftContainer>
        <Title>PIONEERING THE LOGISTICS LANDSCAPE</Title>
        <Subtitle>120K+ parcels delivered</Subtitle>
        <div>
          <Badge>Transportation every day</Badge>
          <Badge>Efficiency unleashed</Badge>
        </div>
        <Subtitle>Ready to embark on a rewarding logistics journey? Join CargoVue now.</Subtitle>
        <div>
          <Button primary>Request</Button>
          <Button>Read more</Button>
        </div>
      </LeftContainer>
      <RightContainer>
        <Grid>
          <Card>
            <img src="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Career Opportunities" style={{ borderRadius: "10px" }} />
            <p>Career Opportunities</p>
          </Card>
          <Card highlight>
            <p>Efficiency Redefined. Your Cargo, Our Logistics Excellence.</p>
          </Card>
          <Card>
            <p>100+ shipments per day</p>
          </Card>
          <Card>
            <img src="https://images.pexels.com/photos/2701434/pexels-photo-2701434.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Logistics Excellence" style={{ borderRadius: "10px" }} />
            <p>Logistics Excellence</p>
          </Card>
        </Grid>
      </RightContainer>
    </Container>
  );
}
