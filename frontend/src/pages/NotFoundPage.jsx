import React from "react";
import { Container, Row, Col } from "reactstrap";

const NotFoundPage = () => {

    return (
        <Container>
            <section>
                <Row className="text-center">
                    <Col>
                        <h1>Ooops, diese Seite existiert nicht...</h1>
                        <a href="/" className="btn btn-warning btn-lg">Züruck zum Home</a>
                    </Col>
                </Row>
            </section>
        </Container>
    );
}

export default NotFoundPage;