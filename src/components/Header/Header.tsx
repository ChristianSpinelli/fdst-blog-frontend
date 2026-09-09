// src/components/Header/Header.tsx
import React from 'react';
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
} from './Header.styles';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          Blog<span>FIAP</span>
        </Logo>

        <Nav>
          {isAuthenticated ? (
            <>
                <NavLink to="/">Posts</NavLink>
                <UserSection>
                    <NavLink to="/admin">Painel Admin</NavLink>
                    <UserBadge>Prof. {user?.name || 'Docente'}</UserBadge>
                    <Button $variant="outline" onClick={logout}>
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