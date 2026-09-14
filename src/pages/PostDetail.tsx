/** React Imports. */
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

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

    // State Variables, Updation.
    const { post, error: fetchError } = usePost( id );

    // SPA HTML Render.
    return (
        <Container>

            <Header text="Post Details" />

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