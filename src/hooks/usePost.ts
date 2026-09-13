import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '../types/Post';
import { PostsAPI } from '../api/posts';

/**
 * @name usePost
 * @description Custom Hook, used for PostsAPI.get() Function.
 * @return { Object } { post, setPost, error }
 */
export function usePost( id: string | undefined ) {

    // React Router.
    const navigate = useNavigate();

    // State Variables, Updation.
    const [ error, setError ] = useState< string | null>( null );
    const [ post, setPost ] = useState< Post | null >(null);

    // API Get Post.
    useEffect( () => {

        PostsAPI.get ( Number( id ) )
                .then( ( data: Post ) => {
                    setPost(data);
                })
                .catch( ( error: any ) => {
                    console.error(" Failed to fetch post from Laravel server: ", error );
                    setError( "Failed to fetch post from Laravel server. ");
                });

    }, [ id, navigate, PostsAPI ] );

    // Return State Variables.
    return { post, setPost, error };
}

export default usePost;