import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  AdminHeader,
  CreateButton,
  TableContainer,
  Table,
  PostTextCell,
  ActionGroup,
  EditButton,
  DeleteButton,
  MobileCardContainer,
  AdminCard,
  CardInfo,
  CardActions,
  EmptyState,
  LoadingMessage,
} from './AdminPost.styles';
import { usePosts } from '../../contexts/PostContext';

export const AdminPosts: React.FC = () => {
  const { posts, isLoading, errorMessage, deletePost } = usePosts();
  const navigate = useNavigate();
  const [actionError, setActionError] = useState<string | null>(null);

  const handleDelete = async (id: number, title: string) => {
    const confirmed = window.confirm(`Tem certeza que deseja excluir a postagem "${title}"?`);
    if (!confirmed) return;

    try {
      setActionError(null);
      await deletePost(id);
    } catch (err) {
      setActionError('Não foi possível excluir a postagem. Tente novamente.');
    }
  };

  return (
    <Container>
      <AdminHeader>
        <div>
          <h1>Painel Administrativo</h1>
          <p>Gerencie as postagens publicadas no sistema acadêmico</p>
        </div>
        <CreateButton onClick={() => navigate('/admin/posts/new')}>
          + Nova Postagem
        </CreateButton>
      </AdminHeader>

      {(errorMessage || actionError) && (
        <EmptyState style={{ color: '#EF4444' }}>
          {errorMessage || actionError}
        </EmptyState>
      )}

      {isLoading ? (
        <LoadingMessage>Carregando painel...</LoadingMessage>
      ) : posts.length === 0 ? (
        <EmptyState>Nenhuma postagem cadastrada no sistema.</EmptyState>
      ) : (
        <>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descrição</th>
                  <th>Autor</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => {
                  return (
                    <tr key={post.id}>
                      <td>
                        <PostTextCell title={post.title}>
                          {post.title}
                        </PostTextCell>
                      </td>
                      <td>
                        <PostTextCell title={post.description}>
                          {post.description}
                        </PostTextCell>
                      </td>
                      <td>
                        <PostTextCell title={post.author?.name || "Autor Desconhecido"}>
                          {post.author?.name || "Autor Desconhecido"}
                        </PostTextCell>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <ActionGroup>
                          <EditButton onClick={() => navigate(`/admin/posts/edit/${post.id}`)}>
                            Editar
                          </EditButton>
                          <DeleteButton onClick={() => handleDelete(Number(post.id), post.title)}>
                            Excluir
                          </DeleteButton>
                        </ActionGroup>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </TableContainer>

          <MobileCardContainer>
            {posts.map((post) => (
              <AdminCard key={post.id}>
                <CardInfo>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <span>{post.author?.name || "Autor Desconhecido"}</span>
                </CardInfo>
                <CardActions>
                  <EditButton onClick={() => navigate(`/admin/posts/edit/${post.id}`)}>
                    Editar
                  </EditButton>
                  <DeleteButton onClick={() => handleDelete(Number(post.id), post.title)}>
                    Excluir
                  </DeleteButton>
                </CardActions>
              </AdminCard>
            ))}
          </MobileCardContainer>
        </>
      )}
    </Container>
  );
};