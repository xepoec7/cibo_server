import React from "react";
import { Col, Row } from "reactstrap";
import { FaAllergies, FaClock } from 'react-icons/fa';

const DescriptionComponent = (props) => {

    const product = props.product;

    return (
        <div className="row-space-top">
            <Row xs="2">
                <Col><h4>{product.name}</h4></Col>
                <Col className="text-end"><p>{product.price} €</p></Col>
            </Row>
            <Row>
                <Col><p>{product.desc}</p></Col>
            </Row>
            <Row xs="2">
                <Col className="float-start">
                    <FaAllergies />
                    <p>{product.allergens}</p>
                </Col>
                <Col className="flaot-end">
                    <FaClock />
                    <p>{product.time}</p>
                </Col>
            </Row>
        </div>
    );
}

export default DescriptionComponent;