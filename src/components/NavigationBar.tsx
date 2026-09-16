/** React Imports. */
import { Container, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/** Personal Imports. */
import { NavLogin } from './NavLogin';

/**
 * @name NavigationBar
 * @description Provides a custom Navigation Bar for the Page.
 * @returns { JSX.Element } Render Custom Navbar.
 */
export function NavigationBar() {

    const navigate = useNavigate();

    // Return to Home Page.
    function handleRoot() {
        navigate('/');
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand onClick={ handleRoot }>COSC360 Assessment 3 Front End</Navbar.Brand>
                <NavLogin />
            </Container>
        </Navbar>
    );
}

export default NavigationBar;