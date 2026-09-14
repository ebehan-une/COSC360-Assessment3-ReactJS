import { Spinner } from 'react-bootstrap';

/** Loading Icon Properties. */
type LoadingIconProps = {
    text: string
}

/**
 * @name LoadingIcon
 * @description Custom Loading Icon Function.
 * @param
 * @returns { JSX.Element }
 */
export function LoadingIcon( { text = "Loading..." }: LoadingIconProps ) {
    return (
        <>
            <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">{ text }</span>
            </Spinner>
            { text && <small className="text-muted fw-semibold">{ text }</small>}
        </>
    );
}

export default LoadingIcon;