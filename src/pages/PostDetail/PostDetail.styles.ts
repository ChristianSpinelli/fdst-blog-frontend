import styled from 'styled-components';

export const Container = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
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

export const PostHeader = styled.header`
  margin-bottom: 2.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 2rem;
`;

export const PostTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1.2;
  margin-bottom: 1.25rem;
`;

export const PostMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};

  .author-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    strong {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  .role-badge {
    background-color: rgba(237, 20, 91, 0.15);
    color: ${({ theme }) => theme.colors.primary};
    padding: 0.2rem 0.6rem;
    border-radius: ${({ theme }) => theme.radii.small};
    font-size: 0.75rem;
    text-transform: capitalize;
    font-weight: 600;
  }
`;

export const PostBody = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textPrimary};

  p {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  /* Caso o conteúdo venha formatado ou quebrado por blocos */
  white-space: pre-wrap;
  word-break: break-word;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 5rem 1rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 1.1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.large};
`;