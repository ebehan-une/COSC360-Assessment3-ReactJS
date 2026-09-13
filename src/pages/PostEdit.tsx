
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { Post } from "../types/Post";

function PostEdit() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [ title, setTitle ] = useState("");

    const [ content, setContent ] = useState("");

    useEffect( () => {
        
        fetch("/posts.json")

            .then( response => response.json() )

            .then( ( posts: Post[] ) => {
                
                const post = posts.find(
                  
                    post => post.id === Number(id)

                );

                if ( post ) {

                    setTitle( post.title );

                    setContent( post.content );

                }

            });

    }, [ id ] );

    function handleSubmit( event: React.SubmitEvent<HTMLFormElement> ) {

        event.preventDefault();

        const updatedPost = {

            id: Number( id ),

            title: title,

            content: content,

            updated_at: Date.now()

        }

        console.log("Updated Post: ", updatedPost);

        alert("Post Updated Successfully!");

        navigate( `/post/${ id }` );

    }

    return (
        <>
            <h1>Edit Post</h1>
            <form onSubmit={ handleSubmit }>
                <div>
                    <label>Title</label>
                    <br />

                    < input type="text" value={ title } onChange={ event => setTitle( event.target.value ) } />
                </div>
                
                <br />

                < div >
                    <label>Content</label>

                    < br />

                    <textarea value={ content } onChange={ event => setContent( event.target.value ) }/>


                </div>

                <button type="submit">Create Post</button>

            </form>
        </>
    );

}

export default PostEdit;