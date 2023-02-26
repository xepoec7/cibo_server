import React from "react";
import {Col, Container, Row} from 'reactstrap';
import MenuListComponent from '../components/menu/MenuListComponent';

const MenuPage = () => {

    return (
        <main>
            <Container>
                <Row className="text-center justify-content-center">
                    <Col>
                        <h1 className="cursive-title">Unsere Speisekarte</h1>
                         <br />
                         <hr />
                    </Col>
                </Row>
                <MenuListComponent />
            </Container>
        </main>
    )
}
export default MenuPage;