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
import { UserRole } from '../../types/auth';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/dashboard">
          Blog<span>FIAP</span>
        </Logo>

        <Nav>
          {isAuthenticated ? (
            <>
                <NavLink to="/dashboard">Mural de Postagens</NavLink>
                <UserSection>
                    { user?.role === UserRole.PROFESSOR ? <NavLink to="/admin/posts">Painel Administrativo</NavLink> : <></> }
                    <UserBadge>{user?.username || "Desconhecido"}</UserBadge>
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