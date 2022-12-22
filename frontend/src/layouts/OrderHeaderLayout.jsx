import React, {useContext} from "react";
import { TfiShoppingCart, TfiShoppingCartFull } from "react-icons/tfi";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CartContext from "../context/Cart/CartContext";


const OrderHeaderLayout = () => {

    const { cartItems } = useContext(CartContext);
    return (
        <Container>
            <Card
                color="dark"
                inverse
            >
                <CardBody>
                    <Row xs="2">
                        <Col>
                            <h3 className="cursive-title">Cibo Colorato</h3>
                        </Col>
                        <Col>
                            <h2 className="float-end">
                                {cartItems.length > 0 ? 
                                    <a href="/order/cart/"><TfiShoppingCartFull className="text-warning" /></a>
                                    :<TfiShoppingCart />}
                            </h2>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    )
}

export default OrderHeaderLayout;