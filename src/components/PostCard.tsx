/** React Imports. */
import { Badge, Card, Col, Row } from 'react-bootstrap';
import { CalendarEvent, Tag } from 'react-bootstrap-icons';

/** Personal Imports. */
import type { Post } from '../types/Post';
import { formatDate } from '../utils/FormatLaravelDate';

/** Post Card Properties. */
type PostCardProps = {
    post?: Post
}

/**
 * @name PostCard
 * @description Displays a Detailed Card of the Posts Data.
 * @param { PostCardProps }
 * @return { JSX.Element } Render the Blog Post Card.
 */
export function PostCard( { post }: PostCardProps ) {
    return (
        <>
            { post && (
            <Card>
                <div className="align-items-center justify-content-between">
                    <Row>
                        <Col className="d-flex justify-content-start">
                            <div className="ms-3 mt-3">
                                <Badge bg="secondary" className="d-flex align-items-center gap-1 py-1 px-2">
                                    <Tag size={12} />
                                    { post.category ? post.category.name : "Uncategorised" }
                                </Badge>
                            </div>
                        </Col>
                        <Col>
                            <Card.Title className="mt-3 text-center">{ post.title }</Card.Title>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <div className="me-3 mt-3">
                                <CalendarEvent className="me-1" size={12} />
                                { formatDate( post.created_at ) }
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Card.Body className="m-3">{ post.content }</Card.Body>
                    </Row>
                </div>
            </Card>
            )}
        </>
    );
}

export default PostCard;