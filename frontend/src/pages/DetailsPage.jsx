import React from "react";
import { Col, Container, Row } from "reactstrap";
import AllergensComponent from "../components/details/AllergensComponent";
import  DescriptionContainer  from '../components/details/DescriptionCompoentn';
import ActionComponent from '../components/details/ActionComponent';
import { useLocation, useNavigate } from "react-router-dom";
import Cart from "../middleware/cart";
import { BsChevronLeft } from 'react-icons/bs';
import { useAlert } from "react-alert";
import HeaderCartComponent from "../components/table/HeaderCartComponent";

const DetailsPage = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const alert = useAlert();
    const product = location.state.product;
    const cart = new Cart();


    const toCartHandler = (qty) => {
        cart.addToCart(product, qty);
        alert.show('Ins Wage eingefügt!');
    }



    return (
        <div>
            <Container>
                <HeaderCartComponent hasBack />
                <Row className="row-space-top">
                    <Col>
                        <img src="product.img" alt="oops..." className="img-fluid" />
                    </Col>
                </Row>
                <DescriptionContainer product={product} />
                <AllergensComponent allergens="FAH" />
                <ActionComponent handler={toCartHandler} />
            </Container>
        </div>
    );
}

export default DetailsPage;