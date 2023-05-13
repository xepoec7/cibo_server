import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardText, CardTitle, Col, Nav, NavItem, NavLink, Row } from "reactstrap";
import Api from "../../service/ApiService";

const BoardComponent = () => {

    const API = new Api();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        API.getCategories()
            .then((res) => {
                let data = res.data;
                setCategories(data);

                if (data.length > 0) {
                    API.getProductsByCategory(data[0].id)
                        .then((res2) => {
                            let data2 = res2.data;
                            setProducts(data2);
                        });
                }
            });
    }, []);

    const categoryClick = (event, cat_id) => {
        let old_active = document.getElementsByClassName('active');
        old_active[0].classList.remove('active');
        event.target.classList.add('active');
        API.getProductsByCategory(cat_id)
            .then((res) => {
                let data = res.data;
                setProducts(data)
            });
    };


    return (
        <>
            <Row className="row-space-top">
                <Col>
                    <Nav fill pills>
                        {categories.map(category => (
                            <NavItem key={category.id} onClick={(event) => categoryClick(event, category.id)}>
                                {category.id === categories[0].id ? (
                                    <NavLink active>{category.name}</NavLink>
                                ):
                                    <NavLink >{category.name}</NavLink>
                                }
                            </NavItem>
                        ))}
                    </Nav>
                </Col>
            </Row>

            <Row className="row-space-top" xs="2" md="2" lg="4">
                {products.map(product => (
                    <Col key={product.id}>
                        <Card className="menu-item" key={product.id} color="dark" inverse >
                            <div className="text-center">
                                <img src={"https://cibocolorato.com"+product.image} alt="img" className="img-fluid" width="150" />
                                <hr />
                            </div>
                            <CardBody>
                                <CardTitle>
                                    <b className="text-warning">{product.name}</b>
                                </CardTitle>
                            </CardBody>
                            <CardFooter>
                                <p className="float-end">{product.price} €</p>
                            </CardFooter>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default BoardComponent;