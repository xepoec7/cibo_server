import React from "react";
import {Col, Container, Row} from 'reactstrap';
import {InView} from 'react-intersection-observer';


const AboutComponent = (props) => {

    const settings = props.pageSettings;

    return (
        <Container>
            <section id="about">
                <InView className="hidden" as="div" onChange={(inView, entry) => props.unHide(inView, entry)}>
                    <Row xs="1" md="2" className="align-items-center">
                        <Col>
                            <img src={"http://127.0.0.1:8000"+ settings.about_us_image} alt="ops" className="img-fluid" />
                        </Col>
                        <Col className="text-end padd-left-sm">
                            <h3 className="cursive-title">Cibo Colorato</h3>
                            <h2 className="text-uppercase">Über Uns</h2>
                            <br />
                            <p> {settings.about_us}</p>
                        </Col>
                    </Row>
               </InView>
                
            </section>
            <section>
                <InView className="hidden" as="div" onChange={(inView, entry) => props.unHide(inView, entry)}>
                    <Row xs="1" md="2" className="align-items-center">
                        <Col>
                            <h3 className="cursive-title">Pizza Chef</h3>
                            <h2 className="text-uppercase">{settings.pizza_chef_name}</h2>
                            <br />
                            <p> {settings.pizza_chef_desc}</p>
                            <br />
                            <figure className="text-end">
                                <blockquote className="blockquote">
                                    <p>{settings.pizza_chef_quote}</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    {settings.pizza_chef_name}
                                </figcaption>
                            </figure>
                        </Col>
                        <Col className="text-end padd-left-sm">
                            <img src={"http://127.0.0.1:8000"+settings.pizza_chef_image} alt="chef" className="img-fluid" />
                        </Col>
                    </Row>
                </InView>   
            </section>
        </Container>
    )
} 

export default AboutComponent;