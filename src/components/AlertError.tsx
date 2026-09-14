import { Alert } from 'react-bootstrap';

/** Alert Error Properties. */
type AlertErrorProps = {
    error?: string;
    variant?: 'danger' | 'warning';
}

/**
 * 
 */
export function AlertError( { error, variant = "danger" }: AlertErrorProps ) {

    if ( error ) {
        return (
            <div className="mt-3">
                <Alert variant={ variant }>{ error }</Alert>
            </div>
        );
    }

    // Nothing to display.
    return null;
}

export default AlertError;