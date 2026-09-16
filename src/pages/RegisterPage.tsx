import { Container } from 'react-bootstrap';

import { AlertError, Header } from '../components'

export function RegisterPage() {
    return (
        <Container>
            
            <Header text="Login" />

            <AlertError />
        </Container>

    );
}

export default RegisterPage;