import React, { useContext } from "react";
import CartContext from '../../context/Cart/CartContext';
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { formatCurrency } from '../../utils';

const CartItemsComponent = () => {

    const { cartItems, removeFromCart, decrease, increase, handleCheckout, total } = useContext(CartContext);

    console.log(total);
    
    return(
        <div className="row-space-top">
            {cartItems?.map((item) => (
                <Card key={item.id} color="dark" inverse>
                    <CardBody>
                        <Row xs="2">
                            <Col className="col-3"><img src={item.img} alt="oppps..." className="img-fluid" /></Col>
                            <Col className="col-9">
                                <Row xs="2">
                                    <Col className="col-10">{item.name}</Col>
                                    <Col className="col-2 text-end"><Button onClick={() => removeFromCart(item)} color="danger" close></Button></Col>
                                </Row>
                                <Row xs="2" style={{marginTop: "10px"}}>
                                    <Col className="col-2">{item.time}</Col>
                                    <Col className="col-10 text-end">
                                        <Button onClick={() => decrease(item)} size="sm">-</Button>
                                        {item.quantity}
                                        <Button onClick={() => increase(item)} size="sm">+</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-start">
                                        {formatCurrency(total)} €
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}

export default CartItemsComponent;