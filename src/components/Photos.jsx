import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/photos");
                setPhotos(response.data);
            } catch (error) {
                console.error(error);
                setHasError(true);
            }
        };
        window.setTimeout(() => fetchData(), 2000);
    }, []);

    const buildUI = () => {
        if (hasError) {
            return <h2>I cannot load any picture</h2>;
        }
        if (photos.length === 0) {
            return <Spinner animation="grow" variant="primary" />
        }


        return photos.map(({ id, srcThumbnail, title, shortDesc }) => (
            <>
                <Col xs={6} md={4} key={id}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`${srcThumbnail}`} />
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>
                                {shortDesc}
                            </Card.Text>
                            <Button variant="primary">
                                <NavLink to={`/photo/${id}`} className="nav-link">
                                    See more
                                </NavLink>
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <br />
            </>
        ));
    }

    return (
        <>
            <h1>Pictures</h1>
            <br />
            <Container>
                <Row>
                    {buildUI()}
                </Row>
            </Container>
        </>
    );
}

export default Photos;