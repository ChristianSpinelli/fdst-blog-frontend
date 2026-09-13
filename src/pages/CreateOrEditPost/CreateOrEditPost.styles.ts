import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FormHeader = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 1rem;
  }
`;

export const Form = styled.form`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.large};
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  input, textarea {
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.medium};
    padding: 0.75rem 1rem;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  textarea {
    resize: vertical;
    min-height: 220px;
    line-height: 1.5;
  }
`;

export const FieldFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 1.2rem;
`;

export const ErrorText = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.danger};
`;

export const CharCount = styled.span<{ $isLimitExceeded?: boolean }>`
  font-size: 0.75rem;
  color: ${({ theme, $isLimitExceeded }) =>
    $isLimitExceeded ? theme.colors.danger : theme.colors.textMuted};
  margin-left: auto;
`;

export const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.medium};
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;