
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Post } from "../types/Post";

function PostDetail() {

    const { id } = useParams();

    const [ post, setPost ] = useState<Post|null>(null);

    useEffect( () => {
        
        fetch("/posts.json")
            .then( response => response.json() )
            .then( (posts: Post[]) => {

                const foundPost = posts.find(
                    post => post.id === Number(id)
                );

                setPost(foundPost || null);
            
            })

    }, [id] );

    if ( !post ) {
        return <p>Loading post...</p>;
    }

    return (

        <>
            <h1>{ post.title }</h1>
            <p>{ post.content }</p>

            <Link to={`/post/edit/${ post.id }`}>
                Edit Post
            </Link>

            <br />
            <br />

            <Link to ="/">
                Back to Posts
            </Link>
        </>

    );

}

export default PostDetail;