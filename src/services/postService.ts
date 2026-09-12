import { Post, PostRequest } from '../types/post';
import api from './api';

export const postService = {
    getPosts: async (): Promise<Post[]> => {
        try{
            const response = await api.get<Post[]>('/posts');
            return response.data;
        }catch(error){
            throw error;
        }
    },

    createPost: async (postRequest: PostRequest): Promise<Post> => {
        try {
            const response = await api.post<Post>('/posts', postRequest);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getPostById: async (id: number): Promise<Post> => {
        try {
            const response = await api.get<Post>(`/posts/${id}`);
            return response.data; 
        } catch (error) {
            throw error;
        }
    },

    editPost: async (postRequest: PostRequest, id: number): Promise<Post> =>{
        try{
            const response = await api.put<Post>(`/posts/${id}`, postRequest);
            return response.data;
        }catch(error){
            throw error;
        }
    },

    deletePost: async (id: number): Promise<string> => {
        try{
            const response = await api.delete<string>(`/posts/${id}`);
            return response.data;
        }catch(error){
            throw error;
        }
    },

   searchPosts: async (search: string): Promise<Post[]> => {
        try {
            const response = await api.get<Post[]>('/posts/search', {
                params: { search }
            });
            
            return response.data; // Retorna a lista de posts filtrada
        } catch (error) {
            throw error;
        }
    }

}