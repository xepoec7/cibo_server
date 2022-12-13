import React from "react";
import Cart from '../../middleware/cart';
import { Card, CardBody, Col, Row } from "reactstrap";
import { TfiShoppingCart, TfiShoppingCartFull } from 'react-icons/tfi';
import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";

const HeaderCartComponent = (props) => {

    const cart = new Cart();
    const navigate = useNavigate();
    
    let cartEmptyFull = cart.items.length > 0 ? <a href="/tableservice/cart/"><TfiShoppingCartFull className="text-warning"/></a> : <TfiShoppingCart />;

  
    return(
        <Card  color="dark" inverse style={{borderRadius: "15px"}}>
            <CardBody>
                <Row xs="3">
                    <Col>
                        {props.hasBack == true ? <BsChevronLeft onClick={() => navigate(-1)} style={{fontSize: "32px"}} /> : null}
                    </Col>
                    <Col>
                        <h3 className="cursive-title text-center">
                            {props.title !== undefined ? props.title : ""}
                        </h3>
                    </Col>
                    <Col>
                        <h2 className="float-end">
                            {cartEmptyFull}
                        </h2>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default HeaderCartComponent;