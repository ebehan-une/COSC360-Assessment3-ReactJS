/** React Imports. */
import React, { useState } from 'react';
import { Button, Form, InputGroup, Navbar, Toast, ToastContainer } from 'react-bootstrap';
import { LockFill, ExclamationTriangleFill } from 'react-bootstrap-icons';

/** Personal Imports. */
import { useAuth } from '../context/AuthContext';
import type { LoginCredentials } from '../types';

/**
 * @name NavLogin
 * @description Provides a Login Form for the Navigation Bar.
 * @returns { JSX.Element } Renders a Login Form.
 */
export function NavLogin() {

    // State Variables, Updation.
    const [ email, setEmail ] = useState< string >("");
    const [ password, setPassword ] = useState< string >("");

    const { authenticated, user, handleLogin, handleLogout, loading } = useAuth();
    const [ showError, setShowError ] = useState< boolean >(false);
    const [ submitError, setSubmitError ] = useState< string | undefined >( undefined );
    const [ submitting, setSubmitting ] = useState< boolean >( false );
    const [ validated, setValidated ] = useState < boolean > ( false );

    // Form Submission using AuthProvider.
    const handleSubmit = async ( event: React.SubmitEvent<HTMLFormElement> ) => {

        // Prevent full-page Refresh.
        event.preventDefault();

        setSubmitting( true );
        setSubmitError( undefined );

        if ( event.currentTarget.checkValidity() === false ) {
            event.stopPropagation();
            setSubmitting( false );
            setValidated( true );
            return;
        }

        //setValidated( true );

        const credentials: LoginCredentials = {
            email: email.trim(),
            password: password
        }

        try {
            await handleLogin( credentials );
            console.log( "Logged in Successfully." );

            setEmail("");
            setPassword("");
            setValidated(false);
        }
        catch ( err: any ) {
            setSubmitError( err.message || "An unexpected error has occured." );
            setShowError( true );
        }
        finally {
            setSubmitting( false );
        }

    };

    return (
        <>
            { authenticated ? (
                <>
                    { user && (
                        <Navbar.Text className="ms-auto me-3">Signed in as { user.name }.</Navbar.Text>
                    )}
                    <Button variant="primary" onClick={ handleLogout }>Logout</Button>
                </>
            ) : (
                <Form 
                    onSubmit={ handleSubmit }
                    className="d-flex align-flex-items-center"
                    noValidate
                    validated={ validated }
                >
                    <InputGroup className="me-2">
                        <InputGroup.Text id="email-addon">@</InputGroup.Text>
                        <Form.Control
                            name="email"
                            type="email"
                            value={ email }
                            onChange={ (event) => setEmail( event.target.value ) }
                            placeholder="user@example.com"
                            aria-describedby="email-addon"
                            required
                        />
                    </InputGroup>
                    <InputGroup className="me-2">
                        <InputGroup.Text id="password-addon">
                            <LockFill id="password-addon" />
                        </InputGroup.Text>
                        <Form.Control
                            name="password"
                            type="password"
                            value={ password }
                            onChange={ (event) => setPassword( event.target.value ) }
                            placeholder="password"
                            aria-describedby="password-addon"
                            required
                        />
                    </InputGroup>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={ submitting || loading }
                    >
                        Login
                    </Button>
                </Form>
            )}
            <ToastContainer position="top-center" className="p-3">
                <Toast
                    show={ showError }
                    onClose={ () => setShowError( false ) }
                    delay={ 5000 }
                    autohide
                >
                    <Toast.Header closeVariant="white" className="bg-danger text-white border-0">
                        <ExclamationTriangleFill className="text-danger me-2" />
                        <strong className="me-auto text-danger">Authentication Error</strong>
                        <small className="text-muted">Just now</small>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        { submitError }
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default NavLogin;