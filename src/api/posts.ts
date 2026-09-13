
import { api } from "./http";
import type { Post } from "../types/Post";

/**
 * Posts API Wrapper.
 */
export const PostsAPI = {

    // Get Post(s) API.
    list: () =>
        api< Post[] >( "/api/posts/" ),

    // Get Post API.
    get: ( id: number ) =>
        api<Post>( `/api/posts/${ id }` ),
    
    // Create Post API.
    create: ( data: Pick<Post, "title" | "content"> ) =>
        api<Post>( "/api/posts", { method: "POST", body: JSON.stringify( data ) } ),

    // Update Post API.
    update: ( id: number, data: Pick<Post, "title" | "content" > ) =>
        api<Post>( `/api/posts/${ id }`, { method: "PUT", body: JSON.stringify( data ) } ),

    // Delete Post API.
    remove: ( id: number ) =>
        api<void> ( `/api/posts/${ id }`, { method: "DELETE" } )

}