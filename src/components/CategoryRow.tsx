/** React Imports. */
import { Button } from 'react-bootstrap';

/** Personal Imports. */
import type { Category } from "../types";
import { formatDate } from '../utils/FormatLaravelDate';

/** Properties for CategoryRow. */
type CategoryRowProps = { 
    category: Category;
    onEdit?: ( id: number ) => void;
    onDelete?: ( id: number ) => void;
}

/**
 * @name CategoryRow
 * @description Displays an individual row of Category data.
 * @param { Object, void, void, void }
 * @returns { JSX.Element } Bootstrap Table Row Render.
 */
export function CategoryRow({ category, onEdit, onDelete }: CategoryRowProps ) {
    return (
        <tr>
            <td>{ category.id }</td>
            <td>{ category.name }</td>
            <td>{ category.content }</td>
            <td>{ formatDate( category.created_at ) }</td>
            <td>
                <Button variant="warning" onClick={ () => onEdit?.( category.id ) } className="me-3">Edit</Button>
                <Button variant="danger" onClick={ () => onDelete?.(category.id ) }>Delete</Button>
            </td>
        </tr>
    );
}

export default CategoryRow;