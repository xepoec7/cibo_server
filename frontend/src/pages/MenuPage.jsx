import React from "react";
import { Col, Container, Row } from "reactstrap";
import MenuListComponent from "../components/menu/MenuListComponent";

const MenuPage = () => {

    return (
        <main>
            <Container>
                <Row className="text-center justify-content-center">
                    <Col>
                        <h1 className="text-uppercase">Speisekarte</h1>
                        <br />
                        <hr />
                        <h3 className="cursive-title">Unsere Speisekarte</h3>
                    </Col>
                </Row>
                <MenuListComponent />
                <br /><br />

            </Container>
        </main>
    );
}

export default MenuPage;