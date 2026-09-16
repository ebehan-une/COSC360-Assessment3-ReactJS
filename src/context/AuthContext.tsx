/** React Imports. */
import React, { createContext, useContext, useState, useEffect } from 'react';

/** Personal Imports. */
import { UsersAPI } from '../api/users';
import type { LoginCredentials, RegisterCredentials, User } from '../types';

/** Authorization Context Properties. */
interface AuthContextProps {

    user: User | null;
    token: string | null;
    
    // State Variables.
    authenticated: boolean;
    error: string | undefined;
    loading: boolean;

    // Functions.
    handleLogin: ( credentials: LoginCredentials ) => Promise< void >;
    handleRegister: ( credentials: RegisterCredentials ) => Promise< void >;
    handleLogout: () => Promise< void >;
}

const AuthContext = createContext< AuthContextProps | undefined >( undefined );

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    // State Variables, Updation.
    const [ error, setError ] = useState< string | undefined >( undefined );
    const [ loading, setLoading ] = useState< boolean >( true );
    const [ token, setToken ] = useState< string | null >( localStorage.getItem( 'auth_token' ) );
    const [ user, setUser ] = useState< User | null >(null);

    // On App Startup:
    useEffect( () => {

        const handleStartup = async () => {

            if ( !token ) {
                setLoading( false );
                return;
            }

            try {
                const fetchUser = await UsersAPI.user( token );
                setUser( fetchUser );
            }
            catch ( err: unknown ) {

                if ( err instanceof Error ) {
                    setError( err.message );
                }
                else {
                    setError( "An unexpected error has occured." );
                }

                console.error( { err } );
                handleLogout();

            }
            finally {
                setLoading( false );
            }

        }

        // Call Handle Startup.
        handleStartup();

    }, [ token ] );

    // Global Login Function.
    const handleLogin = async ( credentials: LoginCredentials ) => {

        setError( undefined );

        try {

            // Laravel Sanctum CSRF Cookie.
            await UsersAPI.csrf();

            // Submit Login Credentials.
            const response = await UsersAPI.login( credentials );

            setUser( response as unknown as User );
            setToken( response.token );
            localStorage.setItem( 'auth_token', response.token );

        }
        catch ( err: unknown ) {

            if ( err instanceof Error ) {
                setError( err.message );
            }
            else {
                setError( "An unexpected error has occured." );
            }

            throw err;

        }

    };

    // Global Register Function.
    const handleRegister = async ( credentials: RegisterCredentials ) => {

        setError( undefined );

        try {

            // Laravel Sanctum CSRF Cookie.
            await UsersAPI.csrf();

            // Submit Registration Credentials.
            const response = await UsersAPI.register( credentials );

            setUser( response.user );
            setToken( response.token );
            localStorage.setItem( 'auth_token', response.token ); 

        }
        catch ( err: unknown ) {

            if ( err instanceof Error ) {
                setError( err.message );
            }
            else {
                setError( "An unexpected error has occured." );
            }

            throw err;
        }

    };

    // Global Logout Function.
    const handleLogout = async () => {

        setError( undefined );

        try {
            await UsersAPI.logout( token );
        }
        catch ( err: any ) {
            setError( err.message || "An unexpected error has occured." );
        }
        finally {
            setUser( null );
            setToken( null );
            localStorage.removeItem( 'auth_token' );
        }

    };

    // Make all State Variables and Functions available to Children.
    return (
        <AuthContext.Provider value={{
            user,
            token,
            authenticated: !!user,
            error,
            loading,
            handleLogin,
            handleRegister,
            handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {

    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    return context;

};