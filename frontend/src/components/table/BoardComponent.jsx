import React from "react";
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row } from "reactstrap";

const BoardComponent = (props) => {

    const products = props.products;

    let productCards = [];
    products.forEach((product) => {
        productCards.push(<Col onClick={() => props.handler(product)} key={product.id}><Card color="dark" inverse>
            <img src={product.img} alt="no image" />
            <CardBody className="text-center">
                <CardTitle tag="h5">{product.name}</CardTitle>
                <CardSubtitle>{product.time}</CardSubtitle>
                <CardText>
                    <b>{product.price} €</b>
                </CardText>
            </CardBody>
        </Card></Col>);
    });

    return (
        <Row xs="2" className="row-space-top">
            {productCards}
        </Row>
    );
}

export default BoardComponent;