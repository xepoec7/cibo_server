import React from 'react'
import { Col, Container, List, Row } from 'reactstrap';

const FooterLayout = () => {

    return (
        <div>
            <footer>
                <Container>
                    <Row xs="1" sm="2" md="4">
                        <Col>
                            <h5 className="text-warning">Lokation</h5>
                            <List type='unstyled'>
                                <li>Hintere Zollamtsstraße</li>
                                <li>Vor 2</li>
                                <li>1030 Wien</li>
                            </List>
                        </Col>
                        <Col>
                            <h5 className='text-warning'>Offnungszeiten</h5>
                            <List type='unstyled'>
                                <li>Montag - Freitag</li>
                                <li>Samstag</li>
                                <li>Sonntag</li>
                            </List>
                        </Col>
                        <Col md="2">
                            <h5 className='hidden'>-------</h5>
                            <List type='unstyled'>
                                <li>10⁰⁰ - 15⁰⁰ & 17⁰⁰ - 22⁰⁰</li>
                                <li>11⁰⁰ - 15⁰⁰ & 17⁰⁰ - 22⁰⁰</li>
                                <li>geschlossen</li>
                            </List>
                        </Col>
                        <Col id='contact'>
                            <h2 className="logo-font text-center">Cibo Colorato</h2>
                            <List type='unstyled' className='text-center'>
                                <li>
                                    <a href="" className="text-white"></a>
                                    <a href="" className="text-white"></a>
                                </li>
                                <li>0664 99945222</li>
                            </List>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    )
}

export default FooterLayout;