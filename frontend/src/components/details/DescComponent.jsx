import React from "react";
import { Col, Row } from "reactstrap";

const DescComponent = (props) => {

    const product = props.product;

    return (
        <div className="row-space-top">
            <Row xs="2">
                <Col><h3 className="text-warning">{product.name}</h3></Col>
                <Col className="text-end">{product.price} €</Col>
            </Row>
            <Row>
                <Col><p>{product.ingredient}</p></Col>
            </Row>
            <Row>
                <Col className="float-end">

                    <p>{product.time}</p>
                </Col>
            </Row>
        </div>
    )
}

export default DescComponent;