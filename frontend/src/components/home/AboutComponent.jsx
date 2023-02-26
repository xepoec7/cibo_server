import React from "react";
import {Col, Row} from 'reactstrap';
import {InView} from 'react-intersection-observer';


const AboutComponent = (props) => {

    return (
        <>
            <section id="about">
                <Row xs="1" md="2" className="align-items-center">
                    <InView className="hidden" as="div" onChange={(inView, entry) => unHide(inView, entry)}>
                        <Col>
                            <img src="{props.img}" alt="ops" className="img-fluid" />
                        </Col>
                        <Col className="text-end padd-left-sm">
                            <h3 className="cursive-title">Cibo Colorato</h3>
                            <h2 className="text-uppercase">Über Uns</h2>
                            <br />
                            <p> {props.about_us}</p>
                        </Col>
                    </InView>
                </Row>
            </section>
            <section>
                <Row xs="1" md="2" className="align-items-center">
                    <InView className="hidden" as="div" onChange={(inView, entry) => unHide(inView, entry)}>
                        <Col>
                            <h3 className="cursive-title">Pizza Chef</h3>
                            <h2 className="text-uppercase">{props.pizza_chef_name}</h2>
                            <br />
                            <p> {props.pizza_chef_desc}</p>
                            <br />
                            <figure className="text-end">
                                <blockquote className="blockquote">
                                    <p>{pizza_chef_quote}</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    {pizza_chef_name}
                                </figcaption>
                            </figure>
                        </Col>
                        <Col className="text-end padd-left-sm">
                            <img src="{props.pizza_chef_image}" alt="chef" className="img-fluid" />
                        </Col>
                    </InView>
                </Row>
            </section>
        </>
    )
} 

export default AboutComponent;