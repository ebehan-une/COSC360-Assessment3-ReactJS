/** React Imports. */
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/** Personal Imports. */
import { PostsAPI } from '../api/posts';
import { AlertError, Header, PostForm } from '../components';
import type { Post } from '../types/Post';

/**
 * @name PostCreate
 * @description
 * @returns { JSX.Element } Rendered Page Layout.
 */
function PostCreate() {

    // React Router.
    const navigate = useNavigate();

    // State Variables, Updation.
    const [ submitting, setSubmitting ] = useState< boolean >( false );
    const [ submitError, setSubmitError ] = useState< string | undefined >( undefined );

    // Handle Create Function.
    function handleCreate( event: React.SubmitEvent<HTMLFormElement> ) {

        // Prevent full-page Refresh.
        event?.preventDefault();

        const target = event.currentTarget;
        const formData = new FormData(target);

        const createData: Pick<Post, "title" | "content"> = {
            title: formData.get( 'title' ) as string,
            content: formData.get( 'content' ) as string
        }

        setSubmitting( true );
        setSubmitError( undefined );

        PostsAPI.create(createData)
                .then( ( newPost: Post ) => {
                    alert( "Post created successfully! ");
                    navigate( `/post/${ newPost.id }` );
                })
                .catch( ( err: unknown ) => {
                    if ( err instanceof Error ) {
                        setSubmitError( err.message );
                    }
                    else {
                        setSubmitError( "An unexpected error has occured." );
                    }
                    console.error( err );
                })
                .finally( () => {
                    setSubmitting(false);
                });

    }

    // SPA HTML Render.
    return (
        <Container>
            
            <Header text="Create Post" />

            <PostForm
                onSubmit={ handleCreate }
                submitButtonText={ submitting ? "Creating..." : "Create Post" }
            />

            { submitError && (
                <AlertError error={ submitError }/>
            )}

        </Container>
    );
}

export default PostCreate;