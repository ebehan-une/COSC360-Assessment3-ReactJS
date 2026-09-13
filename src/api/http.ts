
const API = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

/*

export const authHeaders = () => ({

    "Content-Type": "application/json",

    (token ? { Authorization: `Bearer ${ token }` } : {} )

});

export async function api<T>( path: string, init?: RequestInit ): Promise<T> {

    const res = await fetch( `${ API }${ path }`, {
        init, headers: { authHeaders(), (init?.headers || {} )}
    });

    if ( !res.ok ) throw new Error ( `${ res.status } ${ res.statusText }` );

    return (

        res.json() as Promise<T>;

    );

}
*/