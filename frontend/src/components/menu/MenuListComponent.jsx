import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, CardBody, CardText, CardTitle, Col, Nav, NavItem, NavLink, Row } from "reactstrap";
import Api from '../../middleware/api-call';

const MenuListComponent = () => {

    const API = new Api();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        API.getCategories()
            .then((res) => {
                let data = res.data;
                setCategories(data);

                if (data.length > 0) {
                    API.getProducts(data[0].id)
                        .then((res) => {
                            let data = res.data;
                            setProducts(data);
                        })
                }
            })
            .catch((err) => {
                console.error("Error: ", err.message);
            });
    }, []);

   
    let navList = [];
    categories.forEach((category) => {
        if (category.id === categories[0].id) {
            navList.push(<NavItem key={category.id} onClick={(event) => navClickHandler(event)}>
                <NavLink id={category.id} active>{category.name}</NavLink>
            </NavItem>)
        } else {
            navList.push(<NavItem key={category.id} onClick={(event) => navClickHandler(event)}>
                <NavLink id={category.id}>{category.name}</NavLink>
            </NavItem>)
        }
    });

    let productCards = [];
    products.forEach((product) => {
        productCards.push(<Card className="menu-item" key={product.id} color="dark" inverse>
            <CardBody>
                <CardTitle><b className="text-warning">{product.name}</b> <p className="float-end">{product.price} €</p></CardTitle>
                <CardText>{product.ingredient}</CardText>
            </CardBody>
        </Card>)
    });


    const navClickHandler = (event) => {
        let old_active = document.getElementsByClassName('active');
        old_active[0].classList.remove('active');
        event.target.classList.add('active');
        API.getProducts(event.target.id)
            .then((res) => {
                let data = res.data;
                setProducts(data);
            })
    };


    return (
        <>
            <Row className="menu-header">
                <Col>
                    <Nav fill pills>
                        {navList}
                    </Nav>
                </Col>
            </Row>
            <Row className="menu-body" sm="1" md="1" lg="2">
                {productCards}
            </Row>
        </>
    );

}

export default MenuListComponent;