import React from "react";
import styled from "styled-components";
import '../css/footer.css'; // Import your CSS file for additional styles

const FooterContainer = styled.footer`
  position: relative;
  overflow: hidden;
  min-height: 35rem;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 168, 76, 0.6) 0%,
    rgba(255, 123, 13, 0.6) 100%
  ), url('https://images.unsplash.com/photo-1446824505046-e43605ffb17f');
  background-blend-mode: soft-light;
  background-size: cover;
  background-position: center center;
  padding: 2rem;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BirdContainer = styled.div`
  position: absolute;
  top: 20%;
  left: -10%;
  transform: scale(0) translateX(-10vw);
  will-change: transform;
  animation-name: fly-right-one;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  
  &.bird-container--one {
    animation-duration: 15s;
    animation-delay: 0;
  }
  
  &.bird-container--two {
    animation-duration: 16s;
    animation-delay: 1s;
  }
  
  &.bird-container--three {
    animation-duration: 14.6s;
    animation-delay: 9.5s;
  }
  
  &.bird-container--four {
    animation-duration: 16s;
    animation-delay: 10.25s;
  }
  
  @keyframes fly-right-one {
    0% { transform: scale(0.3) translateX(-10vw); }
    10% { transform: translateY(2vh) translateX(10vw) scale(0.4); }
    20% { transform: translateY(0vh) translateX(30vw) scale(0.5); }
    30% { transform: translateY(4vh) translateX(50vw) scale(0.6); }
    40% { transform: translateY(2vh) translateX(70vw) scale(0.6); }
    50% { transform: translateY(0vh) translateX(90vw) scale(0.6); }
    60% { transform: translateY(0vh) translateX(110vw) scale(0.6); }
    100% { transform: translateY(0vh) translateX(110vw) scale(0.6); }
  }
`;

const Bird = styled.div`
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/174479/bird-cells-new.svg);
  background-size: auto 100%;
  width: 88px;
  height: 125px;
  will-change: background-position;
  animation: fly-cycle 1s steps(10) infinite;

  @keyframes fly-cycle {
    100% { background-position: -900px 0; }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  color: white;
  background: rgba(30, 58, 95, 0.85);
  padding: 2rem;
  border-radius: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  font-size: 0.875rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Column = styled.div``;

const Heading = styled.h3`
  font-weight: bold;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 0.25rem;
  color: ${props => (props.highlight ? '#facc15' : 'white')};
`;

const Divider = styled.hr`
  margin: 1.5rem 0;
  border-color: #334155;
`;

const FooterBottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 0.75rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      {/* Animated Birds */}
      <BirdContainer className="bird-container--one">
        <Bird />
      </BirdContainer>
      <BirdContainer className="bird-container--two">
        <Bird />
      </BirdContainer>
      <BirdContainer className="bird-container--three">
        <Bird />
      </BirdContainer>
      <BirdContainer className="bird-container--four">
        <Bird />
      </BirdContainer>

      {/* Footer Content */}
      <ContentWrapper>
        <Grid>
          <Column>
            <Heading>COMPANY</Heading>
            <List>
              <ListItem highlight>Home</ListItem>
              <ListItem>About</ListItem>
              <ListItem>Careers</ListItem>
              <ListItem>Contact</ListItem>
            </List>
          </Column>
          <Column>
            <Heading>SOLUTIONS</Heading>
            <List>
              <ListItem>Platform Solutions</ListItem>
              <ListItem>Ethical Standards</ListItem>
            </List>
          </Column>
          <Column>
            <Heading>RESOURCES</Heading>
            <List>
              <ListItem>News & Articles</ListItem>
            </List>
          </Column>
          <Column>
            <Heading>SOCIAL</Heading>
            <List>
              <ListItem>LinkedIn</ListItem>
              <ListItem>Facebook</ListItem>
              <ListItem>Instagram</ListItem>
              <ListItem>X</ListItem>
            </List>
          </Column>
        </Grid>
        <Divider />
        <FooterBottom>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
          <span>Accessibility Statement</span>
        </FooterBottom>
      </ContentWrapper>
    </FooterContainer>
  );
};

export default Footer;








