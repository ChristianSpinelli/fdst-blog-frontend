import React from 'react';
import { FooterContainer } from './Footer.styles';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <p>Desenvolvido por &copy; {currentYear} Christian Spinelli</p>
    </FooterContainer>
  );
};