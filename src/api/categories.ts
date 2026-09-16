import { api } from "./http";
import type { Category } from "../types/Category";

/** Category API Wrapper. */
export const CategoriesAPI = {

    // Get Category(s) API.
    list: ( token?: string | null) =>
        api< Category[] >( "/api/categories", undefined, token ),

    // Get Category API.
    get: ( id: number, token?: string | null ) =>
        api< Category >( `/api/categories/${ id }`, undefined, token ),
    
    // Create Category API.
    create: ( data: Pick< Category, "name" | "content" >, token?: string | null ) =>
        api< Category >( "/api/categories", { method: "POST", body: JSON.stringify( data ) }, token ),

    // Update Category API.
    update: ( id: number, data: Pick< Category, "name" | "content" >, token?: string | null ) =>
        api< Category >( `/api/categories/${ id }`, { method: "PUT", body: JSON.stringify( data ) }, token ),

    // Delete Category API.
    remove: ( id: number, token?: string | null ) =>
        api< string | void > ( `/api/categories/${ id }/`, { method: "DELETE" }, token )
};