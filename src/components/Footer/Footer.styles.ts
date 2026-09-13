import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  padding: 1.25rem 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.9rem;
  font-weight: 500;
  width: 100%;
  margin-top: auto;
`;