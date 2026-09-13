import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const AdminHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const CreateButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.medium};
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }
`;

export const TableContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.large};
  overflow-x: auto;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  table-layout: fixed; /* Essencial para respeitar as larguras das colunas */

  th, td {
    padding: 1rem 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Definição precisa de largura para cada coluna */
  th:nth-child(1), td:nth-child(1) { width: 22%; } /* Título */
  th:nth-child(2), td:nth-child(2) { width: 43%; } /* Descrição */
  th:nth-child(3), td:nth-child(3) { width: 20%; } /* Autor */
  th:nth-child(4), td:nth-child(4) { width: 15%; text-align: right; } /* Ações */

  th {
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
    font-size: 0.85rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  tr:not(:last-child) td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  tbody tr {
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.02);
    }
  }
`;

/* Componente único padronizado para todas as colunas de texto */
export const PostTextCell = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const EditButton = styled.button`
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radii.small};
  padding: 0.4rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DeleteButton = styled.button`
  background-color: rgba(239, 68, 68, 0.1);
  color: ${({ theme }) => theme.colors.danger};
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: ${({ theme }) => theme.radii.small};
  padding: 0.4rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.danger};
    color: #ffffff;
    border-color: ${({ theme }) => theme.colors.danger};
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.1rem;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.1rem;
`;