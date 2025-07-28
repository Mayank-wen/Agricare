import React from 'react';
import styled from 'styled-components';
import { Sprout, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: white;
  padding: 4rem 0;
`;

const FooterGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 1.75rem;
  color: white;
  margin-bottom: 1.5rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        <div>
          <FooterLogo>
            <Sprout size={28} />
            <span>AgriCare</span>
          </FooterLogo>
          <p>Empowering farmers with modern solutions for sustainable agriculture.</p>
          <SocialIcons>
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Linkedin size={20} /></a>
          </SocialIcons>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/training">Training</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: info@agricare.com</p>
          <p>Phone: (555) 123-4567</p>
          <p>Address: 123 Farm Road</p>
        </div>
      </FooterGrid>
    </FooterContainer>
  );
};

export default Footer;