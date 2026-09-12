import { User } from "./auth";

export interface Post {
    id:number;
    title:string;
    body:string;
    description:string;
    author:User;
}

export interface PostRequest {
    title?:string;
    body?:string;
    description?:string;
    author?:string;
}