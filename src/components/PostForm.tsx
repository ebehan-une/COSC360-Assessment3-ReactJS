import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import type { Post } from '../types/Post';

type PostFormProps = {
    post?: Post;
    onSubmit?: ( event: ) => void;
    submitButtonText: string;
}

/**
 * @name PostForm
 * @description Form used for Creating and Updating Post data.
 * @param {Object, void, string}
 * @returns 
 */
export function PostForm( { post, onSubmit, submitButtonText }: PostFormProps ) {

    return (
        <>
            <Form onSubmit={ onSubmit }>
                <div>
                    <label>Title</label>
                    <input
                </div>
                <div>

                </div>
                <Button onClick="submit">{ submitButtonText }</Button>



                <div>
                    <label>Content</label>
                </div>

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


            </Form>
        </>
    );
}

export default PostForm;

/*




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



}
*/