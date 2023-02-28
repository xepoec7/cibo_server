import React from "react";
import {Col, Container, Row} from 'reactstrap';
import {InView} from 'react-intersection-observer';
 import trailR from '../../assets/img/trail-right.png';
 import trailL from '../../assets/img/trail-left.png';

const DishesComponent = (props) => {

    const settings = props.pageSettings;

    const unHideRotate = (inView, entry) => {
        if (inView) {
            entry.target.classList.add('unHide');
        entry.target.classList.add('rotate');
        }
    }

    return (
        <section id="dishes">
            <Container>
                <Row xs="1" md="2" className="align-items-center">
                    <Col className="text-end">
                        <h3 className="cursive-title">Discover</h3>
                        <h2>UNSERE GERICHTE</h2>
                    </Col>
                    <Col>
                        <h3 className="hidden">-----</h3>
                        <p>{settings.our_dishes_text}</p>
                    </Col>
                </Row>

                <Row xs="1" md="2" className="align-items-center row-space-top">
                    <Col className="text-center">
                        <InView className="hidden" as="div" onChange={(inView, entry) => unHideRotate(inView, entry)}>
                            <img src={"https://cibocolorato.com"+settings.pizza_image} alt="pizza" className="img-fluid" />
                        </InView> 
                    </Col>
                    <Col>
                        <h2 className="cursive-title">Pizza</h2>
                        <p>{settings.pizza_text}</p>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col className="text-center">
                        <InView className="hidden" as="div" onChange={(inView, entry) => props.unHide(inView, entry)}>
                            <img src={trailR} alt="trail-right" className="img-fluid" />
                        </InView>
                    </Col>
                </Row>

                <Row xs="1" md="2" className="align-items-center">
                    <Col className="text-end">
                        <h2 className="cursive-title">Panino Inpasto Pizza</h2>
                        <p>{settings.panino_text}</p>
                    </Col>
                    <Col className="text-center">
                        <InView className="hidden" as="div" onChange={(inView, entry) => unHideRotate(inView, entry)}>
                            <img src={"https://cibocolorato.com"+settings.panino_image} alt="panino" className="img-fluid" />
                        </InView>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col className="text-center">
                        <InView className="hidden" as="div" onChange={(inView, entry) => props.unHide(inView, entry)}>
                            <img src={trailL} alt="trail-left" className="img-fluid" />
                        </InView>
                    </Col>
                </Row>

                <Row xs="1" md="2" className="align-items-center">
                    <Col className="text-center">
                        <InView className="hidden" as="div" onChange={(inView, entry) => unHideRotate(inView, entry)}>
                            <img src={"https://cibocolorato.com"+settings.desert_image} alt="desert" className="img-fluid" />
                        </InView>
                    </Col>
                    <Col>
                        <h2 className="cursive-title">Dessert</h2>
                        <p>{settings.desert_text}</p>
                    </Col>
                </Row>

            </Container>
        </section>
    )
}
export default DishesComponent;