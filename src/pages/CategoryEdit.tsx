/** React Imports. */
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

/** Personal Imports. */
import { CategoriesAPI } from '../api/categories';
import { AlertError, CategoryForm, Header, LoadingIcon } from '../components';
import { useCategory } from '../hooks/useCategory';
import type { Category } from '../types/Category';

/**
 * @name CategoryEdit
 * @description Edits an existing Category based on the URL Path: {id}.
 * @returns { JSX.Element } Rendered Page Layout.
 */
function CategoryEdit() {

    // React Router.
    const navigate = useNavigate();
    const { id } = useParams();

    // State Variables, Updation.
    const { category, error: fetchError } = useCategory( id );
    const [ submitting, setSubmitting ] = useState< boolean >( false );
    const [ submitError, setSubmitError ] = useState< string | undefined >( undefined );

    // Handle Update Function.
    function handleUpdate( event: React.SubmitEvent<HTMLFormElement> ) {

        // Prevent full-page Refresh.
        event?.preventDefault();

        const target = event.currentTarget;
        const formData = new FormData(target);

        const updateData: Pick<Category, "name" | "content" > = {
            name: formData.get( 'name' ) as string,
            content: formData.get( 'content' ) as string,
        }

        setSubmitting( true );
        setSubmitError( undefined );

        CategoriesAPI.update( Number( id ), updateData )
                .then( () => {
                    alert( "Category Updated Successfully!" );
                    navigate( `/category` );
                })
                .catch( ( err: unknown ) => {
                    if ( err instanceof Error ) {
                        setSubmitError(err.message);
                    }
                    else {
                        setSubmitError( "An unexpected error has occured." );
                    }
                    console.error( { err } );
                })
                .finally( () => {
                    setSubmitting(false);
                });

    }

    // SPA HTML Render.
    return (
        <Container>
            <Header text="Edit Existing Category" />
            <Button className="me-3 my-3" onClick={ () => navigate('/category') }>Return to Category List</Button>
            { category ? (
                <CategoryForm
                    category={ category }
                    onSubmit={ handleUpdate }
                    submitButtonText={ submitting ? "Updating..." : "Update Category" }
                />
            ) : (
                <LoadingIcon text="Loading Category Details..." />
            )}
            { ( fetchError || submitError ) && (
                <AlertError error={ fetchError || submitError } />
            )}
        </Container>
    );
}

export default CategoryEdit;