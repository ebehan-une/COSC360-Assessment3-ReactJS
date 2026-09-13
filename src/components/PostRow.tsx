import type { Post } from "../types/Post";

type PostProps = { post: Post; onView?: (id:number) => void };

export function PostRow({ post, onView }: PostProps ) {
    return (
        <div>
            <strong>{post.title}</strong>
            <button onClick={ () => onView?.(post.id) }>View</button>
        </div>
    );
}