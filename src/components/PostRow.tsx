import Button from 'react-bootstrap/Button';
import type { Post } from "../types/Post";

/** Properties for PostRow. */
type PostProps = { 
    post: Post;
    onView?: ( id: number ) => void;
    onEdit?: ( id: number ) => void;
    onDelete?: ( id: number ) => void;
}

/**
 * @name PostRow
 * @description Displays an individual row of Post data.
 * @param {Object, void, void, void}
 * @returns {JSX.Element} Bootstrap Table Row Render.
 */
export function PostRow( { post, onView, onEdit, onDelete }: PostProps ) {
    return (
        <tr>
            <td>{ post.id }</td>
            <td>{ post.title }</td>
            <td>{ post.content }</td>
            <td>{ post.created_at }</td>
            <td>
                <Button variant="info" onClick={ () => onView?.( post.id ) }>View</Button>
                <Button variant="primary" onClick={ () => onEdit?.( post.id )}>Edit</Button>
                <Button variant="danger" onClick={ () => onDelete?.( post.id )}>Delete</Button>
            </td>
        </tr>
    );
}