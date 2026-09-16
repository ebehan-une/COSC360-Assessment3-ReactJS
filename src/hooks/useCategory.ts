import { useEffect, useState } from 'react';
import type { Category } from '../types/Category';
import { CategoriesAPI } from '../api/categories';

/**
 * @name useCategory
 * @description Custom Hook, used for CategoriesAPI.get() Function.
 * @return { Object } { category, setCategory, error, setError, loading, setLoading }
 */
export function useCategory( id: string | undefined ) {

    // State Variables, Updation.
    const [ error, setError ] = useState< string | undefined >( undefined );
    const [ loading, setLoading ] = useState< boolean >( true );
    const [ category, setCategory ] = useState< Category | undefined >( undefined );

    // API Get Post.
    useEffect( () => {

        // Prevent Memory Leaks.
        let isMounted = true;

        CategoriesAPI.get ( Number( id ) )
                .then( ( data: Category ) => {
                    if ( isMounted ) {
                        setCategory(data);
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

    }, [ id ] );

    // Return State Variables.
    return { category, setCategory, error, setError, loading, setLoading };
}

export default useCategory;