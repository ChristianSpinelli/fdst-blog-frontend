import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { postService, } from '../services/postService';
import { Post, PostRequest } from '../types/post';

interface PostContextType {
  posts: Post[];
  isLoading: boolean;
  errorMessage: string | null;
  fetchPosts: () => Promise<void>;
  createPost: (data: PostRequest) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  searchPosts: (query:string) => Promise<void>;
  getPostById: (id: number) => Promise<Post>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const data = await postService.getPosts();
      setPosts(data);
    } catch (error) {
      setErrorMessage('Não foi possível carregar as postagens. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const searchPosts = async (query: string) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      if (!query.trim()) {
        const data = await postService.getPosts();
        setPosts(data);
        return;
      }

      const data = await postService.searchPosts(query);
      setPosts(data);
    } catch (error) {
      setErrorMessage('Erro ao realizar a busca de postagens.');
    } finally {
      setIsLoading(false);
    }
  };

  const createPost = async (data: PostRequest) => {
    try {
      const newPost = await postService.createPost(data);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (error) {
      throw new Error('Erro ao criar postagem.');
    }
  };

  const deletePost = async (id: number) => {
    try {
      await postService.deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      throw new Error('Erro ao deletar postagem.');
    }
  };

  const getPostById = async (id: number): Promise<Post> => {
    try {
      return await postService.getPostById(id);
    } catch (error) {
      throw new Error('Não foi possível carregar o artigo.');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        isLoading,
        errorMessage,
        fetchPosts,
        createPost,
        deletePost,
        searchPosts,
        getPostById
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = (): PostContextType => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts deve ser usado dentro de um PostProvider');
  }
  return context;
};