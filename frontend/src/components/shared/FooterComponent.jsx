import React from "react";
import {Col, Container, List, Row} from 'reactstrap';

const FooterComponent = () => {

    return (
        <footer>
            <Container>
                <Row xs="1" sm="2" md="4">
                    <Col>
                        <h5 className="text-warning">Lokation</h5>
                        <List type="unstyled">
                            <li>ADR</li>
                            <li>NUM</li>
                            <li>PLZ</li>
                        </List>
                    </Col>
                    <Col>
                        <h5 className="text-warning">Offnungszeiten</h5>
                        <List type="unstyled">
                            <li>Montag - Freitag</li>
                            <li>Samstag</li>
                            <li>Sonntag</li>
                        </List>
                    </Col>
                    <Col>
                        <h5 className="hidden">---</h5>
                        <List type="unstyled">
                            <li>mo</li>
                            <li>sa</li>
                            <li>su</li>
                        </List>
                    </Col>
                    <Col id="contact">
                        <h2 className="logo-font text-center">Cibo Colorato</h2>
                        <List type="unstyled" className="text-center">
                            <li>soc</li>
                            <li>tel</li>
                        </List>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default FooterComponent;