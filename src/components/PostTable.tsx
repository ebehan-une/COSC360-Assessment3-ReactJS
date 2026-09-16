import Table from 'react-bootstrap/Table';
import type { Post } from '../types/Post';
import PostRow from './PostRow';

/** Properties for PostTable. */
type PostTableProps = {
    posts: Post[],
    handleView: ( id: number ) => void;
    handleEdit: ( id: number ) => void;
    handleDelete: ( id: number ) => void;
}

/**
 * @name PostTable
 * @description Displays an array of Post(s) mapped to a PostRow component.
 * @return { JSX.Element } Bootstrap Table Render.
 */
export function PostTable( { posts, handleView, handleEdit, handleDelete }: PostTableProps ) {
    return (
        <Table striped bordered>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Content</th>
                    <th>Category</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { posts.map( post => (
                    <PostRow
                        key={ post.id }
                        post={ post }
                        onView={ handleView }
                        onEdit={ handleEdit }
                        onDelete={ handleDelete }
                    />
                ))}
            </tbody>
        </Table>
    );
}

export default PostTable;