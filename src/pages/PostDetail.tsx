/** React Imports. */
import { Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

/** Personal Imports. */
import { AlertError, Header, LoadingIcon, PostCard } from '../components';
import { usePost } from '../hooks/usePost';

/**
 * @name PostDetail
 * @description
 * @returns { JSX.Element } Rendered Page Layout.
 */
function PostDetail() {

    // React Router.
    const { id } = useParams();
    const navigate = useNavigate();

    // State Variables, Updation.
    const { post, error: fetchError } = usePost( id );

    // SPA HTML Render.
    return (
        <Container>
            <Header text="Post Details" />
            <Button className="me-3 my-3" onClick={ () => navigate('/') }>Return to Post List</Button>
            { post ? (
                <article>
                    <PostCard
                        post={ post }
                    />
                </article>
            ) : (
                <LoadingIcon text="Loading Post Details..." />
            )}
            { fetchError && (
                <AlertError error={ fetchError } />
            )}
        </Container>
    );
}

export default PostDetail;