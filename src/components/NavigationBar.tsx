import { Container, Navbar } from 'react-bootstrap';

/**
 * @name NavigationBar
 * @description Provides a custom Navigation Bar for the Page.
 * @returns { JSX.Element } Render Custom Navbar.
 */
export function NavigationBar() {
    return (
        <Navbar fixed="top">
            <Container>
                Ethan;s Blog ReactJS Site
            </Container>
        </Navbar>
    );
}

export default NavigationBar;