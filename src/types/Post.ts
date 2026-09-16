import type { Category } from "./Category";

/** Post Type Interface. */
export interface Post {
    id: number;
    title: string;
    content: string;
    category_id: string;
    created_at?: string;
    updated_at?: string;
    category?: Category | null;
}