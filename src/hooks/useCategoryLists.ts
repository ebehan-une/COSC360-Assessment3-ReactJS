import { useEffect, useState } from 'react';
import type { Category } from '../types/Category';
import { CategoriesAPI } from '../api/categories';

/**
 * @name useCategoryLists
 * @description Custom Hook,
 * @return { Object } { categories, setCategories, error, setError, loading, setLoading }
 */
export function useCategoryLists() {

    // State Variables, Updation.
    const [ error, setError ] = useState< string | undefined >( undefined );
    const [ loading, setLoading ] = useState< boolean >(true);
    const [ categories, setCategories ] = useState< Category[] >( [] );

    // API Get Category(s).
    useEffect( () => {

        let isMounted = true;

        CategoriesAPI.list()
                .then( ( data: Category[] ) => {
                    if ( isMounted ) {
                        setCategories( data )
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
    return { categories, setCategories, error, setError, loading, setLoading };
}

export default useCategoryLists;