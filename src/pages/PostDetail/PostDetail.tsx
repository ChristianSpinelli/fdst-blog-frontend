import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../../types/post';
import {
  Container,
  BackButton,
  PostHeader,
  PostTitle,
  PostMeta,
  PostBody,
  LoadingMessage,
  ErrorMessage,
} from './PostDetail.styles';
import { usePosts } from '../../contexts/PostContext';

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById } = usePosts();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        setError(null);
        const data = await getPostById(Number(id));
        setPost(data);
      } catch (err) {
         setError('Não foi possível carregar esta postagem ou ela não existe.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetails();

  }, [id, getPostById]);

  if (isLoading) {
    return <LoadingMessage>Carregando artigo...</LoadingMessage>;
  }

  if (error || !post) {
    return (
      <Container>
        <BackButton onClick={() => navigate('/dashboard')}>← Voltar ao Dashboard</BackButton>
        <ErrorMessage>{error || 'Post não encontrado.'}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={() => navigate('/dashboard')}>← Voltar ao Dashboard</BackButton>

      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>
          <div className="author-info">
            <span>Por:</span>
            <strong>{post.author?.name || 'Autor desconhecido'}</strong>
          </div>
        </PostMeta>
      </PostHeader>

      <PostBody>
        <p>{post.body || 'Nenhum conteúdo disponível para esta matéria.'}</p>
      </PostBody>
    </Container>
  );
};