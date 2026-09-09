import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.secondary}; /* Preto ônix #121214 */
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary}; /* Branco puro */

  span {
    color: ${({ theme }) => theme.colors.primary}; /* Vermelho #ED145B */
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 0.75rem;
  }
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserBadge = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.small};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'outline' }>`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radii.small};
  transition: all 0.2s ease-in-out;

  ${({ $variant, theme }) =>
    $variant === 'outline'
      ? `
        background: transparent;
        color: ${theme.colors.textPrimary};
        border: 1px solid ${theme.colors.borderLight};

        &:hover {
          border-color: ${theme.colors.primary};
          color: ${theme.colors.primary};
        }
      `
      : `
        background: ${theme.colors.primary};
        color: ${theme.colors.whiteDetail};

        &:hover {
          background: ${theme.colors.primaryHover};
        }
      `}
`;