import React from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import DescComponent from '../components/product/DescComponent';
import AlergensComponent from '../components/product/AlergensComponent';
import ActionComponent from '../components/product/ActionComponent';

const ProductPage = () => {

    const location = useLocation();
    const product = location.state.product;


    return (
        <div>
            <Container>
                <Row className="row-space-top">
                    <Col>
                        <img src={product.img} alt="oops..." className="img-fluid" />
                    </Col>
                </Row>
                <DescComponent product={product} />
                <AlergensComponent />
                <ActionComponent product={product} />
            </Container>
        </div>
    )
}

export default ProductPage;