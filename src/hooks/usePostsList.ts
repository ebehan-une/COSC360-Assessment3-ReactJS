import { useEffect, useState } from 'react';
import type { Post } from '../types/Post';
import { PostsAPI } from '../api/posts';

/**
 * @name usePostsList
 * @description Custom Hook,
 * @return { Object } { posts, setPosts, error }
 */
export function usePostsList() {

    // State Variables, Updation.
    const [ error, setError ] = useState< string | undefined >( undefined );
    const [ loading, setLoading ] = useState< boolean >(true);
    const [ posts, setPosts ] = useState< Post[] >( [] );

    // API Get Post(s).
    useEffect( () => {

        let isMounted = true;

        PostsAPI.list()
                .then( ( data: Post[] ) => {
                    if ( isMounted ) {
                        setPosts( data )
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
                        console.error( {err} );
                    }
                })
                .finally( () => {
                    if ( isMounted ) {
                        setLoading(false);
                    }
                })

        return () => {
            isMounted = false;
        };

    }, [] );

    // Return State Variables.
    return { posts, setPosts, error, setError, loading, setLoading };
}

export default usePostsList;