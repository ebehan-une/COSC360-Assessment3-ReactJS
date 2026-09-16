/** React Imports. */
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/** Personal Imports. */
import { CategoriesAPI } from '../api/categories';
import { AlertError, CategoryTable, Header, LoadingIcon } from '../components';
import { useCategoryLists } from '../hooks/useCategoryLists';

/**
 * @name CategoriesList
 * @description Displays an array of Category(s) from the Laravel Server.
 * @returns { JSX.Element } Rendered Page Layout.
 */
function CategoriesList() {

    // React Router.
    const navigate = useNavigate();

    // State Variable, Updation.
    const { categories, setCategories, error: fetchError } = useCategoryLists();

    // Handle Navigate Functions.
    const handleEdit = ( id: number ) => navigate( `/category/edit/${ id }` );

    // Handle Delete Function.
    const handleDelete = async ( id: number ) => {
        
        const confirmed = window.confirm( "Are you sure you want to delete this post?" );

        if ( !confirmed ) {
            return;
        }

        const originalPosts = categories;

        // Visually Remove Category.
        setCategories( prevCategories => prevCategories.filter( category => category.id !== id ) );

        try {
            await CategoriesAPI.remove( id );
        }
        catch ( err: any ) {

            console.error("Error removing post: ", err );
            alert( "Failed to delete post. Please try again. ");

            // Amend Categories.
            setCategories( originalPosts );
        }
    
    }

    // SPA HTML Render.
    return (
        <Container>
            <Header text="List of Created Categories" />
            <Button className="me-3 my-3" onClick={ () => navigate('/') }>Return to Post List</Button>
            <Button className="me-3 my-3" onClick={ () => navigate('/category/create') }>Create New Category</Button>
            { categories ? (
                <CategoryTable
                    categories={ categories }
                    handleEdit={ handleEdit }
                    handleDelete={ handleDelete }
                />
            ) : (
                <LoadingIcon text="Loading Category List..." />
            )}
            { fetchError && (
                <AlertError error={ fetchError } />
            )}
        </Container>
    );
}

export default CategoriesList;