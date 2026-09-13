import { useNavigate, useParams } from 'react-router-dom';
import type { Post } from '../types/Post';
import { PostsAPI } from '../api/posts';
import { PostForm } from '../components/PostForm';
import { usePost } from '../hooks/usePost';

/**
 * @name PostEdit
 * @description Edits an existing post based on the URL Path: {id}.
 * @returns {JSX.Element} Rendered Page Layout.
 */
function PostEdit() {

    // React Router.
    const navigate = useNavigate();
    const { id } = useParams();

    // State Variables, Updation.
    const { post, error } = usePost( id );

    // Handle Update Function.
    function handleUpdate( formData: Pick<Post, "title" | "content">) {

        PostsAPI.update( Number( id ), formData )
                .then( () => {
                    alert( "Post Updated Successfully!" );
                    navigate( `/post/${ id }` );
                })
                .catch( ( err: any ) => {
                    console.error( "Failed to Update Post on Laravel Server: ", err );
                });

    }

    // Display Errors.
    if ( error ) {
        <>
            <div>
                { error }
            </div>
        </>
    }

    // SPA HTML Render.
    return (
        <>
            <div>Edit Post.</div>
            <div>
                <PostForm
                    post={ post }
                    onSubmit={ handleUpdate }
                    submitButtonText="Update Post"
                />
            </div>
        </>
    );
}

export default PostEdit;

/*




    // Get Post API.
    //get: ( id: number ) =>
    //    api<Post>( `/api/posts/${ id }` ),



    function handleSubmit( event: React.SubmitEvent<HTMLFormElement> ) {

        event.preventDefault();

        const updatedPost = {

            id: Number( id ),

            title: title,

            content: content,

            updated_at: Date.now()

        }

        console.log("Updated Post: ", updatedPost);

        alert("Post Updated Successfully!");

        navigate( `/post/${ id }` );

    }

    return (
        <>
            <h1>Edit Post</h1>
            <form onSubmit={ handleSubmit }>
                <div>
                    <label>Title</label>
                    <br />

                    < input type="text" value={ title } onChange={ event => setTitle( event.target.value ) } />
                </div>
                
                <br />

                < div >
                    <label>Content</label>

                    < br />

                    <textarea value={ content } onChange={ event => setContent( event.target.value ) }/>


                </div>

                <button type="submit">Create Post</button>

            </form>
        </>
    );

}
*/
