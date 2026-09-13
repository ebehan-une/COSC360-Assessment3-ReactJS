
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Post } from '../types/Post';
import { PostsAPI } from '../api/posts';
import { PostForm } from '../components/PostForm';

/**
 * @name PostCreate
 * @description
 * @returns {JSX.Element} Rendered Page Layout.
 */
function PostCreate() {

    // React Router.
    const navigate = useNavigate();

    // State Variables, Updation.
    const [ error, setError ] = useState< string | null >( null );

    // Handle Create Function.
    function handleCreate( formData: Pick<Post, "title" | "content">) {
        PostsAPI.create(formData)
                .then( ( newPost: Post ) => {
                    alert( "Post created successfully! ");
                    navigate( `/post/${ newPost.id }` );
                })
                .catch( ( error: any ) => {
                    console.error( "Failed to create new post: ", error );
                    setError( "Failed to save post to Laravel server. ");
                });
    }

    // Display Errors.
    if ( error ) {
        return <><div>{ error }</div></>;
    }

    // SPA HTML Render.
    return (
        <>
            <div>Create Post</div>
            <div>
                <PostForm
                    onSubmit={ handleCreate }
                    submitButtonText="Create Post"
                />
            </div>
        </>
    );
}

export default PostCreate;