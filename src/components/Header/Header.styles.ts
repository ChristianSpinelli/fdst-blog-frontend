import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.secondary};
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
  position: relative;
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};

  span {
    color: ${({ theme }) => theme.colors.primary}; 
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 22px;
  padding: 0;
  z-index: 101;

  span {
    width: 100%;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.textPrimary};
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Nav = styled.nav<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    align-items: flex-start;
    gap: 1rem;

    ${UserSection} {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      gap: 1rem;
    }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.05rem;
    padding: 0.25rem 0;
  }
`;

export const UserBadge = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.small};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: inline-block;
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'outline' }>`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radii.small};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

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
        border: none;

        &:hover {
          background: ${theme.colors.primaryHover};
        }
      `}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    text-align: center;
  }
`;