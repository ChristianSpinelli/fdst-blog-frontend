// src/pages/Dashboard/Dashboard.tsx
import React, { useState, useEffect } from 'react';
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

export const Dashboard: React.FC = () => {
  const { posts, isLoading, errorMessage, searchPosts } = usePosts();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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
            <PostCard key={post.id}>
              <PostHeader>
                <PostTitle>{post.title || 'Sem título'}</PostTitle>
                <PostDescription>{post.description}</PostDescription>
              </PostHeader>

              <PostFooter>
                <AuthorInfo>
                  <span className="name">
                    {post.author?.name || 'Autor desconhecido'}
                  </span>
                  {post.author?.role && <span className="role">{post.author.role}</span>}
                </AuthorInfo>
              </PostFooter>
            </PostCard>
          ))}
        </PostGrid>
      )}
    </Container>
  );
};