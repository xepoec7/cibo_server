import React, { useEffect, useState } from "react";
import Api from '../service/ApiService';
import logo from "../logo-rounded.png";
import { Col, Container, Row } from "reactstrap";

const TerminalPage = () => {

    const API = new Api();
    const [openOrders, setOpenOrders] = useState([]);
    const [doneOrders, setDoneOrders] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            API.getOrders()
                .then((res) => {
                    let data = res.data;
                    setOpenOrders(data.open);
                    setDoneOrders(data.done);
                });
        }, 20000);
        return () => clearInterval(interval);
    });

    return (
        <main>
            <Container >
                <Row className="full-height">
                    <Col>
                        <Row className="order-open-row">
                            <Col>
                                <h3>Bestellungen</h3>
                                {openOrders.map((order) => (
                                    <span className="order-open">{order.orderNr}</span>
                                ))}
                            </Col>
                        </Row>
                        <Row className="order-done-row">
                            <Col>
                                <h3 className="text-warning">Fertig</h3>
                                {doneOrders.map((order) => (
                                    <span className="order-done">{order.orderNr}</span>
                                ))}
                            </Col>
                        </Row>
                    </Col>

                    <Col>
                        <Row style={{ height: "100%" }} className="align-items-center">
                            <Col xs="12" className="text-center">
                                <img width="400" className="img-fluid pulse" src={logo} alt="logo" />
                                <h2 className="cursive-title">Cibo Colorato</h2>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default TerminalPage;