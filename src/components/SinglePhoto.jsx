import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Spinner, Form, Row, Container, Button, Col, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

const SinglePhoto = () => {
    const params = useParams();
    const [photo, setPhoto] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [comment, setComment] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/photos/${params.photoId}`);
                setPhoto(response.data);
            } catch (error) {
                console.error(error);
                setHasError(true);
            }
        };

        window.setTimeout(() => fetchData(), 2000);
    }, []);


    const putComment = async () => {
        try {
            const photoCopy = { ...photo }
            photoCopy.comments.push(comment);
            setPhoto(photoCopy);
            setComment("");
            await axios.put(`http://localhost:3001/photos/${params.photoId}`, photo);
        } catch (error) {
            console.error(error);
        }
    }

    const onCommentTextChange = (e) => {
        setComment(e.target.value);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (comment === "") {
            return;
        }
        putComment();
    };

    const buildUI = () => {
        if (hasError) {
            return <h2>I cannot load any picture</h2>;
        }
        if (photo == null) {
            return <Spinner animation="grow" variant="primary" />
        }


        return (
            <>
                <Col xs={12} md={8}>
                    <Card>
                        <Card.Img variant="top" src={`${photo.srcImage}`} />
                        <Card.Body>
                            <Card.Title>{photo.title}</Card.Title>
                            <Card.Text>
                                {photo.desc}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <ListGroup as="ul">
                        <ListGroup.Item as="li" active>
                            Comments
                        </ListGroup.Item>
                        {photo.comments.length > 0 ? photo.comments.map((comment, idx) => <ListGroup.Item key={idx} as="li">{comment}</ListGroup.Item>) : <ListGroup.Item as="li">This picture doesn't have any comment.</ListGroup.Item>}
                    </ListGroup>
                </Col >
                <Col xs={12} md={12}>
                    <Form onSubmit={onFormSubmit}>
                        <br />
                        <br />
                        <Form.Group className="mb-3">
                            <Form.Label>Add a comment...</Form.Label>
                            <Form.Control as="textarea" rows={3} value={comment} onChange={onCommentTextChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>


            </>
        );
    }


    return (
        <Container>
            <Row>
                {buildUI()}
            </Row>
        </Container>
    );
}

export default SinglePhoto;