import React from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";

const OrderCompletePage = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state.order;


    let item_list = [];
    for (let i = 0; i < order.items.length; i++) {
        const item = order.items[i];
        item_list.push(<tr key={item.product.id}>
            <td>{i + 1}</td>
            <td>{item.product.name}</td>
            <td>{item.qty}</td>
            <td>{item.sum} €</td>
        </tr>);
    }

    return (
        <div>
            <Container>
                <Card>
                    <CardBody>
                        <Row>
                            <Col>
                                <h4>Ihre Bestellung würde zum Chef gesendet</h4>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
} 

export default OrderCompletePage;