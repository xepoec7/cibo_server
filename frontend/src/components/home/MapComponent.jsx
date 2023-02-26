import React from "react";
import {Col, Container, Row} from 'reactstrap';

const MapComponent = () => {

    return (
        <section id="#location">
            <Container fluid>
                <Row xs="1">
                    <Col>
                        <iframe className='gmap'
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.750871114026!2d16.384688614435774!3d48.21141435399635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d077f26c5aec5%3A0x9debc392c5263b06!2sCibo%20Colorato!5e0!3m2!1sde!2sat!4v1662846588490!5m2!1sde!2sat" 
                            width="100%" height="450"  
                            allowFullScreen="" loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">        
                        </iframe>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default MapComponent;