import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  Nav,
  NavLink,
  UserSection,
  UserBadge,
  Button,
  HamburgerButton,
} from './Header.styles';
import { UserRole } from '../../types/auth';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/dashboard" onClick={closeMenu}>
          Blog<span>FIAP</span>
        </Logo>

        {isAuthenticated && (
          <HamburgerButton onClick={toggleMenu} aria-label="Abrir Menu">
            <span />
            <span />
            <span />
          </HamburgerButton>
        )}

        <Nav $isOpen={isMenuOpen}>
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" onClick={closeMenu}>
                Mural de Postagens
              </NavLink>
              
              <UserSection>
                {user?.role === UserRole.PROFESSOR && (
                  <NavLink to="/admin/posts" onClick={closeMenu}>
                    Painel Administrativo
                  </NavLink>
                )}
                <UserBadge>{user?.username || "Desconhecido"}</UserBadge>
                <Button 
                  $variant="outline" 
                  onClick={() => { 
                    logout(); 
                    closeMenu(); 
                  }}
                >
                  Sair
                </Button>
              </UserSection>
            </>
          ) : (<></>)}
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};