import React from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {SiCodechef} from 'react-icons/si';

const OrderCompletePage = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    const order_id = location.state.id;


    return (
        <div className="row-space-top">
            <Container>
                <Card inverse color="dark">
                    <CardBody>
                        <Row>
                            <Col className="text-center">
                                <SiCodechef style={{fontSize: "7rem", color: "#ffc107"}} />
                                <br /><br />
                                <h4>Vielen Dank! Ihre Bestellung ist am Chef gesendet</h4>
                                <br />
                                <Button onClick={() => {navigate("/order/")}} size="lg" color="warning">Züruck zum Menü</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
} 

export default OrderCompletePage;