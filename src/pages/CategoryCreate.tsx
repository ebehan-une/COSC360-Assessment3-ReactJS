/** React Imports. */
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/** Personal Imports. */
import { CategoriesAPI } from '../api/categories';
import { AlertError, CategoryForm, Header } from '../components';
import type { Category } from '../types/Category';

/**
 * @name CategoryCreate
 * @description
 * @returns { JSX.Element } Rendered Page Layout.
 */
function CategoryCreate() {

    // React Router.
    const navigate = useNavigate();

    // State Variables, Updation.
    const [ submitting, setSubmitting ] = useState< boolean >( false );
    const [ submitError, setSubmitError ] = useState< string | undefined >( undefined );

    // Handle Create Function.
    function handleCreate( event: React.SubmitEvent<HTMLFormElement> ) {

        // Prevent full-page Refresh.
        event?.preventDefault();

        const target = event.currentTarget;
        const formData = new FormData(target);

        const createData: Pick< Category, "name" | "content" > = {
            name: formData.get( 'title' ) as string,
            content: formData.get( 'content' ) as string,
        }

        setSubmitting( true );
        setSubmitError( undefined );

        CategoriesAPI.create( createData )
                .then( () => {
                    alert( "Category created successfully! ");
                    navigate( `/category/` );
                })
                .catch( ( err: unknown ) => {
                    if ( err instanceof Error ) {
                        setSubmitError( err.message );
                    }
                    else {
                        setSubmitError( "An unexpected error has occured." );
                    }
                    console.error( err );
                })
                .finally( () => {
                    setSubmitting(false);
                });

    }

    // SPA HTML Render.
    return (
        <Container>
            <Header text="Create New Category" />
            <Button className="me-3 my-3" onClick={ () => navigate('/category') }>Return to Category List</Button>
            <CategoryForm
                onSubmit={ handleCreate }
                submitButtonText={ submitting ? "Creating..." : "Create Category" }
            />
            { submitError && (
                <AlertError error={ submitError }/>
            )}
        </Container>
    );
}

export default CategoryCreate;