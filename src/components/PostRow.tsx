import { Button, Dropdown, SplitButton } from 'react-bootstrap';

import { useAuth } from '../context/AuthContext';
import type { Post } from "../types/Post";
import { formatDate } from '../utils/FormatLaravelDate';


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
 * @param { Object, void, void, void }
 * @returns { JSX.Element } Bootstrap Table Row Render.
 */
export function PostRow({ post, onView, onEdit, onDelete }: PostProps) {

    const { authenticated } = useAuth();

    return (
        <tr>
            <td>{ post.id }</td>
            <td>{ post.title }</td>
            <td>{ post.content }</td>
            <td>
                { post.category? post.category.name : "" }
            </td>
            <td>{ formatDate( post.created_at ) }</td>
            <td>
                { authenticated ? (
                    <SplitButton
                        title="View"
                        onClick={ () => onView?.( post.id ) }
                        onSelect={ ( eventKey ) => {
                            if ( eventKey === "edit" ) {
                                onEdit?.( post.id );
                            }
                            if ( eventKey === "delete" ) {
                                onDelete?.( post.id );
                            }
                        }}>
                        <Dropdown.Item eventKey="edit">Edit</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="delete" className="text-danger">Delete</Dropdown.Item>
                    </SplitButton>
                ) : (
                    <Button onClick={ () => onView?.( post.id ) }>View</Button>
                )}
            </td>
        </tr>
    );
}

export default PostRow;