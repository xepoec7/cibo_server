import React from "react";
import { Col, Row } from "reactstrap";
import {InView } from "react-intersection-observer";

const BlockComponent = (props) => {

    if (props.left) {
        return (
            <section>
                <Row xs="1" md="2" className="align-items-center">
                    <Col>
                    <InView className="hidden" as="div" onChange={(inView, entry) => unHide(inView, entry)}>
                            <img src={props.img} alt="oops" className="img-fluid " />
                        </InView>
                    </Col>
                    <Col className="text-end padd-left-small">
                        <h3 className="cursive-title">{props.title}</h3>
                        <h2 className="text-uppercase">{props.subtitle}</h2>
                        <br />
                        <p>
                            {props.desc}
                        </p>
                    </Col>
                </Row>
            </section>
        );
    }

    return (
        <section>
            <Row xs="1" md="2" className="align-item-center">
                <Col className="padd-right-small" >
                    <h3 className="cursive-title">{props.title}</h3>
                    <h2 className="text-uppercase">{props.subtitle}</h2>
                    <br />
                    <p>
                        {props.desc}
                    </p>
                    <br />
                    <figure className="text-end">
                        <blockquote className="blockquote">
                            <p>
                                {props.quote}
                            </p>
                        </blockquote>
                        <figure className="blockquote-footer">{props.quoteName}</figure>
                    </figure>
                </Col>
                <Col>
                    <InView className="hidden" as="div" onChange={(inView, entry) => unHide(inView, entry)}>
                        <img src={props.img} alt="oops" className="img-fluid " />
                    </InView>
                </Col>
            </Row>
        </section>
    );
}

export default BlockComponent;