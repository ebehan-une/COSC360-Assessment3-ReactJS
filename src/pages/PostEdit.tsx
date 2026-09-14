import React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import { PostsAPI } from '../api/posts';
import { AlertError, Header, LoadingIcon, PostForm } from '../components';
import { usePost } from '../hooks/usePost';
import type { Post } from '../types/Post';

/**
 * @name PostEdit
 * @description Edits an existing post based on the URL Path: {id}.
 * @returns { JSX.Element } Rendered Page Layout.
 */
function PostEdit() {

    // React Router.
    const navigate = useNavigate();
    const { id } = useParams();

    // State Variables, Updation.
    const { post, error: fetchError } = usePost( id );
    const [ submitting, setSubmitting ] = useState< boolean >( false );
    const [ submitError, setSubmitError ] = useState< string | undefined >( undefined );

    // Handle Update Function.
    function handleUpdate( event: React.SubmitEvent<HTMLFormElement> ) {

        // Prevent full-page Refresh.
        event?.preventDefault();

        const target = event.currentTarget;
        const formData = new FormData(target);

        const updateData: Pick<Post, "title" | "content"> = {
            title: formData.get( 'title' ) as string,
            content: formData.get( 'content' ) as string
        }

        setSubmitting( true );
        setSubmitError( undefined );

        PostsAPI.update( Number( id ), updateData )
                .then( () => {
                    alert( "Post Updated Successfully!" );
                    navigate( `/post/${ id }` );
                })
                .catch( ( err: unknown ) => {
                    if ( err instanceof Error ) {
                        setSubmitError(err.message);
                    }
                    else {
                        setSubmitError( "An unexpected error has occured." );
                    }
                    console.error( { err } );
                })
                .finally( () => {
                    setSubmitting(false);
                });

    }

    // SPA HTML Render.
    return (
        <Container>

            <Header text="Edit Post" />
            
            { post ? (
                <PostForm
                    post= { post }
                    onSubmit={ handleUpdate }
                    submitButtonText={ submitting ? "Updating..." : "Update Post" }
                />
            ) : (
                <LoadingIcon text="Loading Post Details..." />
            )}
            
            { ( fetchError || submitError ) && (
                <AlertError error={ fetchError || submitError } />
            )}

        </Container>
    );
}

export default PostEdit;