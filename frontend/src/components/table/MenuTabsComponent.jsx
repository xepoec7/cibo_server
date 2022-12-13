import React from "react";
import { Col, Nav, NavItem, NavLink, Row } from "reactstrap";

const MenuTabsComponent = (props) => {

    const categories = props.categories;

    let navList = [];
    categories.forEach((category) => {
        if (category.id === categories[0].id) {
            navList.push(<NavItem key={category.id} onClick={() => props.handler(category.id)}>
                <NavLink id={category.id} active>{category.name}</NavLink>
            </NavItem>)
        } else {
            navList.push(<NavItem key={category.id} onClick={() => props.handler(category.id)}>
                <NavLink id={category.id}>{category.name}</NavLink>
            </NavItem>)
        }
    });

    return (
        <div className="row-space-top">
            <Row>
                <Col>
                    <h4>Finden</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Nav pills className="justify-content-center">
                        {navList}
                    </Nav>
                </Col>
            </Row>
        </div>
    );
}

export default MenuTabsComponent;