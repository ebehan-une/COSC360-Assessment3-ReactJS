import { Button, Form } from 'react-bootstrap';
import type { Post } from '../types/Post';

/** Post Form Properties. */
type PostFormProps = {
    post?: Post;
    onSubmit?: ( event: React.SubmitEvent<HTMLFormElement> ) => void;
    submitButtonText: string;
}

/**
 * @name PostForm
 * @description Form used for Creating and Updating Post data.
 * @param { Object, void, string }
 * @returns 
 */
export function PostForm( { post, onSubmit, submitButtonText }: PostFormProps ) {
    return (
        <>
            <Form onSubmit={ onSubmit }>
                <Form.Group className="mb-3">
                    <Form.Label className="fs-5 fw-semibold">Title</Form.Label>
                    <Form.Control
                        name="title"
                        type="text"
                        defaultValue={ post?.title }
                        placeholder="Add a Creative Title!"
                        size="lg"
                    />           
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fs-5 fw-semibold">Content</Form.Label>
                    <Form.Control
                        name="content"
                        as="textarea"
                        defaultValue={ post?.content }
                        rows={ 3 }
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button type="submit">{ submitButtonText }</Button>
                </Form.Group>
            </Form>
        </>
    );
}

export default PostForm;