import React, { useEffect, useState } from "react";
import {Col, Container, Row} from 'reactstrap';

const HeroCompoent = (props) => {

    return (
        <header className="hero" id="hero" style={{backgroundImage: `url("https://cibocolorato.com`+ props.pageSettings.hero_image +`")`}}>
            <Container fluid>
                <Row>
                    <Col className="hero-text text-center">
                        <h1 className="hero-title text-warning">
                            {props.pageSettings.hero_title}
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