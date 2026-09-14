import { useNavigate } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import { PostsAPI } from '../api/posts';
import { AlertError, Header, LoadingIcon, PostTable } from '../components';
import { usePostsList } from '../hooks/usePostsList';

/**
 * @name PostsList
 * @description Displays an array of Post(s) from the Laravel Server.
 * @returns { JSX.Element } Rendered Page Layout.
 */
function PostsList() {

    // React Router.
    const navigate = useNavigate();

    // State Variable, Updation.
    const { posts, setPosts, error: fetchError } = usePostsList();

    // Handle Navigate Functions.
    const handleView = ( id: number ) => navigate( `/post/${ id }` );
    const handleEdit = ( id: number ) => navigate( `/post/edit/${ id }` );

    // Handle Delete Function.
    const handleDelete = async ( id: number ) => {
        
        const confirmed = window.confirm( "Are you sure you want to delete this post?" );

        if ( !confirmed ) {
            return;
        }

        const originalPosts = posts;

        // Visually Remove Post.
        setPosts( prevPosts => prevPosts.filter( post => post.id !== id ) );

        try {

            await PostsAPI.remove( id );
        
        }
        catch ( err: any ) {

            console.error("Error removing post: ", err );
            alert( "Failed to delete post. Please try again. ");

            // Amend Posts.
            setPosts( originalPosts );

        }
    
    }

    // SPA HTML Render.
    return (
        <Container>

            <Header text="List of Posts" />

            { posts ? (
                <PostTable
                    posts={ posts }
                    handleView={ handleView }
                    handleEdit={ handleEdit }
                    handleDelete={ handleDelete }
                />
            ) : (
                <LoadingIcon text="Loading Post List..." />
            )}

            { fetchError && (
                <AlertError error={ fetchError } />
            )}

        </Container>
    );
}

export default PostsList;