import React from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { RiCoupon3Line } from 'react-icons/ri';

const PromoComponent = () => {

    return (
        <Card color="dark" inverse className="row-space-top">
            <CardBody>
                <Container>
                    <Row xs="2" className="align-items-center">
                        <Col>
                            <RiCoupon3Line /> <b>Gutschein</b>
                        </Col>
                        <Col className="text-end">
                            <Button outline color="warning" >Einsetzen</Button>
                        </Col>
                    </Row>
                </Container>
            </CardBody>
        </Card>
    )
}

export default PromoComponent;