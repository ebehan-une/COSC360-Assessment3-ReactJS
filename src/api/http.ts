const API = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const getCookie = ( name: string ): string | null => {
    const value = `; ${ document.cookie }`;
    const parts = value.split( `; ${ name }=` );

    if ( parts.length === 2 ) {
        return decodeURIComponent(parts.pop()?.split(';').shift() || '');
    }

    return null;
};

export const authHeaders = ( token?: string | null ) => {
    
    const csrfToken = getCookie( 'XSRF-TOKEN' );

    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        ...( csrfToken ? { "X-XSRF-TOKEN": csrfToken } : {} ),
        ...( token ? { Authorization: `Bearer ${ token }` } : {} ),
    };
};

export async function api<T>( path: string, init?: RequestInit, token?: string | null ): Promise<T> {
    
    if ( typeof path != 'string' ) {
        console.error( "API Error, Path must be a String: ", path );
        throw new TypeError( `Invalid API path: ${ path }` );
    }
    
    try {

        const res = await fetch( `${ API }${ path }`, {
            ...init,
            credentials: "include",
            headers: {
                ...authHeaders( token ),
                ...(init?.headers || {} ),
            },
        });

        if (res.status === 204) {
            return {} as T;
        }

        if ( !res.ok ) {
            throw new Error( `${ res.status } ${ res.statusText}` );
        }

        return res.json() as Promise<T>;
    }
    catch ( err ) {
        throw err;
    }
}