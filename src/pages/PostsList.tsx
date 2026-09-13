import { useNavigate } from 'react-router-dom';
//import type { Post } from '../types/Post';
import { PostsAPI } from '../api/posts';
import { PostTable } from '../components/PostTable';
import { usePostsList } from '../hooks/usePostsList';

/**
 * @name PostsList
 * @description Displays an array of Post(s) from the Laravel Server.
 * @returns {JSX.Element} Rendered Page Layout.
 */
function PostsList() {

    // React Router.
    const navigate = useNavigate();

    // State Variable, Updation.
    const { posts, setPosts, error } = usePostsList();

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

    // Display Errors.
    if ( error ) {
        
        return (
            <>
                <div>
                    { error }
                </div>
            </>
        );

    }

    // SPA HTML Render.
    return (
        <>
            <div>List of Posts</div>
            <div>
                <PostTable
                    posts={ posts }
                    handleView={ handleView }
                    handleEdit={ handleEdit }
                    handleDelete={ handleDelete }
                />
            </div>
        </>
    );
}

export default PostsList;