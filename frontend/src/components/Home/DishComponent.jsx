import React from "react";
import { Container, Row, Col } from "reactstrap";
import pizzaImg from '../../assets/img/pizza.png';
import paninoImg from '../../assets/img/panino.png';
import desertImg from '../../assets/img/desert.png';
import trailRight from '../../assets/img/trail-right.png';
import trailLeft from '../../assets/img/trail-left.png';
import { InView } from 'react-intersection-observer';

const DishComponent = () => {

    const unHide = (inView, entry) => {
        if (inView) {
            entry.target.classList.remove('hidden');
        }
    };

    const unHideRotate = (inView, entry) => {
        if (inView) {
            entry.target.classList.remove('hidden');
            entry.target.classList.add('unHide');
            entry.target.classList.add('rotate');
        }
    };

    return (
        <section id="dishes">
            <Container>
                <Row xs="1" md="2" className="align-items-center">
                    <Col className="text-end padd-right">
                        <h3 className="cursive-title">Discover</h3>
                        <h2 className="text-uppercase">Unsere Gerichte</h2>
                    </Col>
                    <Col>
                        <h3 className="hidden">-----</h3>
                        <p>
                            Unsere Gerichte sind aus feinsten Zutaten die von Italien auf
                            Ihres Teller kommen.
                        </p>
                    </Col>
                </Row>

                <Row xs="1" md="2" className="align-items-center">
                    <Col className="text-center">
                        <InView className="hidden" as="div" onChange={(inView, entry) => unHideRotate(inView,entry)}>
                            <img src={pizzaImg} alt="oops" className="img-fluid" />
                        </InView>
                    </Col>
                    <Col>
                        <h2 className="cursive-title">Pizza</h2>
                        <p></p>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col className="text-center">
                        <InView className="hidden" as="div" onChange={(inView, entry) => unHide(inView, entry)}>
                            <img src={trailRight} alt="oops" className="img-fluid " />
                        </InView>
                    </Col>
                </Row>

                <Row xs="1" md="2" className="align-items-center">
                    <Col className="text-end">
                        <h2 className="cursive-title">Panino Inpasto Pizza</h2>
                        <p></p>
                    </Col>
                    <Col className="text-center">
                        <InView className="hidden" as="div" onChange={(inView, entry) => unHideRotate(inView,entry)}>
                            <img src={paninoImg} alt="oops" className="img-fluid" />
                        </InView>
                    </Col>
                </Row>

                <Row className="justify-content-center" xs="1" md="1" lg="1">
                    <Col className="text-center">
                        <InView className="hidden" as="div" onChange={(inView, entry) => unHide(inView, entry)}>
                            <img src={trailLeft} alt="oops" className="img-fluid " />
                        </InView>
                    </Col>
                </Row>

                <Row xs="1" md="2" className="align-items-center">
                    <Col className="text-center">
                        <InView className="hidden" as="div" onChange={(inView, entry) => unHideRotate(inView,entry)}>
                            <img src={desertImg} alt="oops" className="img-fluid" />
                        </InView>
                    </Col>
                    <Col>
                        <h2 className="cursive-title">Nachspeise</h2>
                        <p></p>
                    </Col>
                </Row>

            </Container>
        </section>
    );
}

export default DishComponent;