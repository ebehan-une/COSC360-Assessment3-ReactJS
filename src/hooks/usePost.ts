import { useEffect, useState } from 'react';
import type { Post } from '../types/Post';
import { PostsAPI } from '../api/posts';

/**
 * @name usePost
 * @description Custom Hook, used for PostsAPI.get() Function.
 * @return { Object } { post, setPost, error }
 */
export function usePost( id: string | undefined ) {

    // State Variables, Updation.
    const [ error, setError ] = useState< string | undefined >( undefined );
    const [ loading, setLoading ] = useState< boolean >(true);
    const [ post, setPost ] = useState< Post | undefined >(undefined);

    // API Get Post.
    useEffect( () => {

        // Prevent Memory Leaks.
        let isMounted = true;

        PostsAPI.get ( Number( id ) )
                .then( ( data: Post ) => {
                    if ( isMounted ) {
                        setPost(data);
                    }
                })
                .catch( ( err: unknown ) => {
                    if ( isMounted ) {
                        if(err instanceof Error) {
                            setError(err.message);
                        }
                        else {
                            setError( "An unexpected error occured." );
                        }
                        console.error( { err } );
                    }
                })
                .finally( () => {
                    if ( isMounted ) {
                        setLoading(false);
                    }
                })

        return () => {
            isMounted = false;
        }

        return

    }, [ id ] );

    // Return State Variables.
    return { post, setPost, error, setError, loading, setLoading };
}

export default usePost;