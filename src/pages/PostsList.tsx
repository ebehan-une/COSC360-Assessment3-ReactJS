import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../types/Post";

function PostsList() {
    
    const [ posts, setPosts ] = useState< Post[] >( [] );

    useEffect( () => {

        // fetch("http://localhost:8000/api/posts")
        fetch( "/posts.json" )
            .then( response => response.json() )
            .then( data => setPosts( data ) );
    }, [] );

    return (
        <>
            <h1>Posts</h1>
            { posts.map( post => (
                <div key={ post.id }>
                    <h3>{ post.title }</h3>
                    <Link to={`/post/${ post.id }`}>
                        View Post
                    </Link>
                </div>
            ))}
        </>
    );
}

export default PostsList;


// PostsList loads
// useEffect runs
// fetch posts.json
// posts.json
// response.json()
// setPosts(data)
// React re-renders
// posts.map