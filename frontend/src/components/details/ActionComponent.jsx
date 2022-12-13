import React, { useState } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { TfiShoppingCart } from 'react-icons/tfi';
import { useNavigate } from "react-router-dom";

const ActionComponent = (props) => {

    const [qty, setQty] = useState(1);

    const navigate = useNavigate();

    const addBtnHandler = () => {
        props.handler(qty);
        setQty(1);
    }

    return (
        <div className="row-space-top">
            <Row xs="2">
                <Col>
                    <Card color="dark" inverse>
                        <CardBody className="text-center">
                            <Button  size="sm" onClick={() => qty > 1 ? setQty(qty - 1) : setQty(qty)}>-</Button>
                            <span className="left-right-margin-sm">{qty}</span>
                            <Button size="sm" onClick={() => setQty(qty + 1)}>+</Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card color="dark" inverse>
                        <CardBody>
                            <Button onClick={addBtnHandler} block outline color="warning" size="sm"><TfiShoppingCart /> Ins Wage</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ActionComponent;