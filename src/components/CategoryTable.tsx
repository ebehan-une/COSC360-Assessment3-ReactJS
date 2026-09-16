/** React Imports. */
import Table from 'react-bootstrap/Table';

/** Personal Imports. */
import type { Category } from '../types';
import CategoryRow from './CategoryRow';

/** Properties for CategoryTable. */
type CategoryTableProps = {
    categories: Category[],
    handleEdit: ( id: number ) => void;
    handleDelete: ( id: number ) => void;
}

/**
 * @name CategoryTable
 * @description Displays an array of Post(s) mapped to a CategoryRow component.
 * @return { JSX.Element } Bootstrap Table Render.
 */
export function CategoryTable( { categories, handleEdit, handleDelete }: CategoryTableProps ) {
    return (
        <Table striped bordered>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { categories.map( category => (
                    <CategoryRow
                        key={ category.id }
                        category={ category }
                        onEdit={ handleEdit }
                        onDelete={ handleDelete }
                    />
                ))}
            </tbody>
        </Table>
    );
}

export default CategoryTable;