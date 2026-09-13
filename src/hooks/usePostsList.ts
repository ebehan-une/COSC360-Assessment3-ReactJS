import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '../types/Post';
import { PostsAPI } from '../api/posts';

/**
 * @name usePostsList
 * @description Custom Hook,
 * @return { Object } { posts, setPosts, error }
 */
export function usePostsList() {

    // React Router.
    const navigate = useNavigate();

    // State Variables, Updation.
    const [ error, setError ] = useState< string | null >( null );
    const [ posts, setPosts ] = useState< Post[] >( [] );

    // API Get Post(s).
    useEffect( () => {

        PostsAPI.list()
                .then( ( data: Post[] ) => {
                    setPosts( data )
                })
                .catch( ( err: any ) => {
                    console.error( err );
                    setError( err );
                });

    }, [ navigate, PostsAPI ]);

    // Return State Variables.
    return { posts, setPosts, error };
}

export default usePostsList;