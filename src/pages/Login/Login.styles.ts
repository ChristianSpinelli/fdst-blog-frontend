import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.medium};
  padding: 2.5rem 2rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 2rem 1.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 2rem;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface InputProps {
  $hasError?: boolean;
}

export const Input = styled.input<InputProps>`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.borderLight)};
  border-radius: ${({ theme }) => theme.radii.small};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.938rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 2px
      ${({ theme, $hasError }) =>
        $hasError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(237, 20, 91, 0.2)'};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const FieldError = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.danger};
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  margin-top: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.whiteDetail};
  border: none;
  border-radius: ${({ theme }) => theme.radii.small};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:active {
    transform: scale(0.99);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ShowErrorMessage = styled.div`
  padding: 0.75rem;
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.radii.small};
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.875rem;
  text-align: center;
`;