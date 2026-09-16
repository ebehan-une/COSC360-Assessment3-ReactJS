/** React Imports. */
import { Button, Form } from 'react-bootstrap';

/** Personal Imports. */
import type { Category } from '../types';

/** Category Form Properties. */
type CategoryFormProps = {
    category?: Category;
    onSubmit?: ( event: React.SubmitEvent<HTMLFormElement> ) => void;
    submitButtonText: string;
}

/**
 * @name CategoryForm
 * @description Form used for Creating and Updating Post data.
 * @param { Object, void, string }
 * @returns 
 */
export function CategoryForm( { category, onSubmit, submitButtonText }: CategoryFormProps ) {
    return (
        <>
            <Form onSubmit={ onSubmit }>
                <Form.Group className="mb-3">
                    <Form.Label className="fs-5 fw-semibold">Title</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        defaultValue={ category?.name }
                        placeholder="Add a Creative Name!"
                        size="lg"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="fs-5 fw-semibold">Content</Form.Label>
                    <Form.Control
                        name="content"
                        as="textarea"
                        defaultValue={ category?.content }
                        placeholder="Write a brief description of the Category."
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

export default CategoryForm;