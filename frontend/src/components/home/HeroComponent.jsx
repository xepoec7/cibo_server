import React from "react";
import {Col, Container, Row} from 'reactstrap';

const HeroCompoent = (props) => {

    const settings = props.settings;

    return (
        <header className="hero" id="hero" style={{backgroundImage: settings.hero_image}}>
            <Container fluid>
                <Row>
                    <Col className="hero-text text-center">
                        <h1 className="hero-title text-uppercase">
                            {settings.hero-title}
                        </h1>
                    </Col>
                </Row>
                <Container>
                    <Col className="text-center">
                        <a href="/menu" className="btn btn-outline-warning btn-lg">Speisekarte</a>
                    </Col>
                </Container>
            </Container>
        </header>
    )

}

export default HeroCompoent;