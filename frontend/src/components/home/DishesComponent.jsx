import React from "react";
import {Col, Container, Row} from 'reactstrap';
import {InView} from 'react-intersection-observer';

const DishesComponent = (props) => {

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
                        <p>{props.our_dishes_text}</p>
                    </Col>
                </Row>

                <Row xs="1" md="2" className="align-items-center">
                    <Col className="text-center">
                        <InView className="hidden" as="div" onChange={(inView, entry) => unHideRotate(inView, entry)}>
                            <img src="{props.pizza_image}" alt="pizza" className="img-fluid" />
                        </InView> 
                    </Col>
                    <Col>
                        <h2 className="cursive-title">Pizza</h2>
                        <p>{props.piza_text}</p>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col className="text-center">
                        <InView classID="hidden" as="div" onChange={(inView, entry) => unHide(inView, entry)}>
                            <img src="" alt="trail-right" className="img-fluid" />
                        </InView>
                    </Col>
                </Row>

                <Row xs="1" md="2" className="align-items-center">
                    <Col className="text-end">
                        <h2 className="cursive-title">Panino Inpasto Pizza</h2>
                        <p>{props.panino_text}</p>
                    </Col>
                    <Col className="text-center">
                        <InView className="hidden" as="div" onChange={(inView, entry) => unHideRotate(inView, entry)}>
                            <img src="{props.panino_image}" alt="panino" className="img-fluid" />
                        </InView>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col className="text-center">
                        <InView classID="hidden" as="div" onChange={(inView, entry) => unHide(inView, entry)}>
                            <img src="" alt="trail-left" className="img-fluid" />
                        </InView>
                    </Col>
                </Row>

                <Row xs="1" md="2" className="align-items-center">
                    <Col className="text-center">
                        <InView className="hidden" as="div" onChange={(inView, entry) => unHideRotate(inView, entry)}>
                            <img src="{props.desert_image" alt="desert" className="img-fluid" />
                        </InView>
                    </Col>
                    <Col>
                        <h2 className="cursive-title">Desert</h2>
                        <p>{props.desert_text}</p>
                    </Col>
                </Row>

            </Container>
        </section>
    )
}
export default DishesComponent;