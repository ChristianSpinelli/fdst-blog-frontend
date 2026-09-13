import React, { useState, useEffect, useRef } from 'react';
import { usePosts } from '../../contexts/PostContext';
import {
  Container,
  HeaderSection,
  TitleGroup,
  SearchContainer,
  SearchInput,
  PostGrid,
  PostCard,
  PostHeader,
  PostTitle,
  PostDescription,
  PostFooter,
  AuthorInfo,
  EmptyState,
  LoadingMessage,
} from './Dashboard.styles';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { posts, isLoading, errorMessage, searchPosts } = usePosts();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const isFirstRender = useRef(true);

  useEffect(() => {
    if(isFirstRender.current){
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
        searchPosts(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <Container>
      <HeaderSection>
        <TitleGroup>
          <h1>Mural de Postagens</h1>
          <p>Explore artigos e publicações da comunidade acadêmica</p>
        </TitleGroup>

        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar por título, conteúdo, descrição ou autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </HeaderSection>

      {errorMessage && <EmptyState>{errorMessage}</EmptyState>}

      {isLoading ? (
        <LoadingMessage>Carregando postagens...</LoadingMessage>
      ) : !errorMessage && posts.length === 0 ? (
        <EmptyState>
          {searchTerm
            ? `Nenhuma postagem encontrada para "${searchTerm}".`
            : 'Nenhuma postagem disponível no momento.'}
        </EmptyState>
      ) : (
        <PostGrid>
          {posts.map((post) => (
            <PostCard key={post.id} onClick={() => navigate(`/posts/${post.id}`)} style={{ cursor: 'pointer' }}>
              <PostHeader>
                <PostTitle>{post.title || 'Sem título'}</PostTitle>
                <PostDescription title={post.description}>{post.description}</PostDescription>
              </PostHeader>

              <PostFooter>
                <AuthorInfo>
                  <span className="name">
                    {post.author?.name || 'Autor desconhecido'}
                  </span>
                </AuthorInfo>
              </PostFooter>
            </PostCard>
          ))}
        </PostGrid>
      )}
    </Container>
  );
};