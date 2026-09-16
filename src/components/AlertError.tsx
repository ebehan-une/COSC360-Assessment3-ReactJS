/** React Imports. */
import { Alert } from 'react-bootstrap';

/** Alert Error Properties. */
type AlertErrorProps = {
    error?: string;
    variant?: 'danger' | 'warning';
}

/**
 * @name AlertError
 * @return { JSX.Element } Custom Render, if Error has occured.
 */
export function AlertError( { error, variant = "danger" }: AlertErrorProps ) {

    // Return Custom Render if Error is defined.
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