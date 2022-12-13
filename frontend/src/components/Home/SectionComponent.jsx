import React from "react";
import { Col, Row } from "reactstrap";
import aboutImg from '../../assets/img/pizzeria.jpg';
import chefImg from '../../assets/img/chef.jpg';

const SectionComponent = (props) => {


    return (
        <>
            <section id="about">
                <Row xs="1" md="2" className='align-items-center'>
                    <Col>
                    <img src={aboutImg} alt="oops" height="100" className="img-fluid" />
                    </Col>
                    <Col className='text-end padd-left-small'>
                    <h3 className="cursive-title">Cibo Colorato</h3>
                    <h2 className="text-uppercase">Über Uns</h2>
                    <br />
                    <p>
                        Bei uns finden Sie die original neapolitanische 
                        Pizza. Auf 450°C Golden gebacken, bringen wir 
                        Ihnen ein Stück Italien nach Wien.
                    </p>
                    </Col>
                </Row>
            </section>

            <section id="chef">
                <Row xs="1" md="2" className='align-items-center'>
                    <Col className='padd-right-small'>
                        <h3 className="cursive-title">Pizza Chef</h3>
                        <h2 className="text-uppercase">Vincenzo Iovine Enzo</h2>
                        <br />
                        <p>
                            Unser Pizzabäcker Enzo aus Neapel/Italien bereitet 
                            mit 30 Jahren Erfahrung jede Pizza nur mit frischen 
                            und erstklassigen Zutaten zu
                        </p>
                        <br />
                        <figure className="text-end">
                            <blockquote className="blockquote">
                            <p>
                                Sie können nicht jeden glücklich machen. Nur eine Pizza kann es.
                            </p>
                            </blockquote>
                            <figcaption className="blockquote-footer">Vincenzo Iovine</figcaption>
                        </figure>
                    </Col>
                    <Col>
                        <img src={chefImg} alt="oops" height="100" className="img-fluid" />
                    </Col>
                </Row>
            </section>
        </>
    );
}

export default SectionComponent;