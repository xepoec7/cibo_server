import React from "react";
import { Col, Container, Row } from "reactstrap";

const HeroComponent = () => {

    return (
        <header className="hero" id="hero">
            <Container fluid>
                <Row>
                    <Col className="hero-text text-center">
                        <h1 className="hero-title text-uppercase">
                            Cibo Colorato wo Pizza beginnt
                        </h1>
                    </Col>
                </Row>
                <Container>
                    <Row>
                        <Col className="text-center">
                            <a href="/menu" className="btn btn-outline-warning btn-lg">Speisekarte</a>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </header>
    );
}

export default HeroComponent;