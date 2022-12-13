import React from "react";
import Cart from '../../middleware/cart';
import { Button, Card, CardBody, Col, Row } from "reactstrap";

const CartItemsComponent = () => {

    const cart = new Cart();

    let items_cards = [];
    if (cart.items.length == 0) {
        items_cards.push(<Card color="dark" inverse><CardBody className="text-center"><p>Wage leer...</p></CardBody></Card>)
    }
    cart.items.forEach((item) => {
        items_cards.push(<Card key={item.product.id} color="dark" inverse>
            <CardBody>
                <Row xs="2">
                    <Col className="col-3"><img src={item.img} alt="oops..." className="img-fluid" /></Col>
                    <Col className="col-9">
                        <Row xs="2">
                            <Col className="col-10">{item.product.name}</Col>
                            <Col className="col-2 text-end"><Button onClick={() => cart.removeItem(item.product)} color="danger" close></Button></Col>
                        </Row>
                        <Row xs="2" style={{marginTop: "10px"}}>
                            <Col className="col-2">{item.product.time}</Col>
                            <Col className="col-10 text-end">
                                <Button size="sm">-</Button>
                                {item.qty}
                                <Button size="sm">+</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-start">
                                {item.sum} €
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>);
    });

    return(
        <div className="row-space-top">
            {items_cards}
        </div>
    );
}

export default CartItemsComponent;