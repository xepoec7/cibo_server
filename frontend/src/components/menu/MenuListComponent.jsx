import React, { useEffect, useState } from "react";
import { Card, CardText, CardTitle, Col, Nav, NavItem, NavLink, Row } from 'reactstrap';
import Api from '../../service/ApiService';


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
                    API.getProductsByCategory(data[0].id)
                        .then((res2) => {
                            let data2 = res2.data;
                            setProducts(data2);
                        })
                }
            })
    },[]);

    
    const navClick = (event, cat_id) => {
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
                            <NavItem key={category.id} onClick={(event) => navClick(event, category.id)}>
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
            <Row className="row-space-top" sm="2" md="2" lg="4">
                {products.map(product => (
                        <Card className="menu-item" key={product.id} color="dark" inverse>
                            <img src={"https://cibocolorato.com"+product.image} alt="img" className="img-fluid" />
                            <hr />
                            <CardTitle>
                                <b className="text-warning">{product.name}</b>
                                <p className="float-end">{product.price} €</p>
                            </CardTitle>
                            <CardText>{product.ingredient}</CardText>
                            <br />
                        </Card>
                ))}
            </Row>
        </>
    )
}
export default MenuListComponent;