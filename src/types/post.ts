export interface Post {
    id:number;
    title:string;
    body:string;
    description:string;
    author:string;
}

export interface PostRequest {
    title?:string;
    body?:string;
    description?:string;
    author?:string;
}