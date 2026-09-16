import { Spinner } from 'react-bootstrap';

/** Loading Icon Properties. */
type LoadingIconProps = {
    text: string
}

/**
 * @name LoadingIcon
 * @description Custom Loading Icon Function.
 * @param { string } text A custom Phrase for Fetching Data from the Laravel Server.
 * @returns { JSX.Element } Custom Loading Icon Render.
 */
export function LoadingIcon( { text = "Loading..." }: LoadingIconProps ) {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
            <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">{ text }</span>
            </Spinner>
            { text && <small className="text-muted fw-semibold">{ text }</small>}
        </div>
    );
}

export default LoadingIcon;