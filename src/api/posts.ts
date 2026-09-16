import { api } from "./http";
import type { Post } from "../types/Post";

/** Posts API Wrapper. */
export const PostsAPI = {

    // Get Post(s) API.
    list: ( token?: string | null) =>
        api< Post[] >( "/api/posts", undefined, token ),

    // Get Post API.
    get: ( id: number, token?: string | null ) =>
        api< Post >( `/api/posts/${ id }`, undefined, token ),
    
    // Create Post API.
    create: ( data: Pick< Post, "title" | "content" | "category_id" >, token?: string | null ) =>
        api< Post >( "/api/posts", { method: "POST", body: JSON.stringify( data ) }, token ),

    // Update Post API.
    update: ( id: number, data: Pick< Post, "title" | "content" | "category_id" >, token?: string | null ) =>
        api< Post >( `/api/posts/${ id }`, { method: "PUT", body: JSON.stringify( data ) }, token ),

    // Delete Post API.
    remove: ( id: number, token?: string | null ) =>
        api< string | void > ( `/api/posts/${ id }/`, { method: "DELETE" }, token )
};