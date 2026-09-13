import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePost } from '../hooks/usePost';

/**
 * @name PostDetail
 * @description
 * @returns { JSX.Element }
 */
function PostDetail() {

    // React Router.
    const navigate = useNavigate();
    const { id } = useParams();

    // State Variables, Updation.
    const { post, error } = usePost( id );

    if ( !post ) {
        return (
            <>
                <p>Loading Post...</p>
            </>
        );
    }

    return (

        <>
            <h1>{ post.title }</h1>
            <p>{ post.content }</p>

            <Link to={`/post/edit/${ post.id }`}>
                Edit Post
            </Link>

            <br />
            <br />

            <Link to ="/">
                Back to Posts
            </Link>
        </>

    );

}

export default PostDetail;