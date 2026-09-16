import { Container } from 'react-bootstrap';

/** Footer Properties. */
type FooterProps = {
    text: string
};

/**
 * @name Footer
 * @description Basic custom Footer component for Page.
 * @param text Custom text string to display.
 * @returns { JSX.Element } Render Custom Page Footer.
 */
export function Footer( { text }: FooterProps ) {
    return (
        <footer>
            <Container>
                <p className="text-center text-muted">{ text }</p>
            </Container>
        </footer>
    );
}

export default Footer;