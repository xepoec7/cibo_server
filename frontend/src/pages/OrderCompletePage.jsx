import React from "react";
import { Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import HeaderCartComponent from "../components/table/HeaderCartComponent";
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
                <HeaderCartComponent title="Ihre Bestellung" />
                <Row className="row-space-top">
                    <Col className="text-center">
                        <BsFillCheckCircleFill className="text-success" style={{fontSize: "65px"}}/>
                        <br /><br />
                        <p className="text-success">Bestellung gesendet</p>
                    </Col>
                </Row>
                <Card color="dark" inverse className="row-space-top">
                    <CardBody>
                        <Table dark responsive striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Artikel</th>
                                    <th>Einheit</th>
                                    <th>Summe</th>
                                </tr>
                            </thead>
                            <tbody>
                                {item_list}
                            </tbody>
                            <tfoot>
                                <tr className="text-end">
                                    <td colSpan="4">Summe Total: {order.total} €</td>
                                </tr>
                            </tfoot>
                        </Table>
                    </CardBody>
                </Card>
                <Row className="row-space-top" style={{marginBottom: "30px"}}>
                    <Col className="text-center">
                        <Button onClick={() => navigate('/')} outline size="lg" color="warning">Züruck zum Homepage</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
} 

export default OrderCompletePage;