import React, {useState, useEffect} from "react";
import { Col, Nav, NavItem, Row, NavLink } from "reactstrap";
import Api from '../../middleware/api-call';

const CategoryComponent = (props) => {

    const API = new Api();
    const setCategoryId = props.setCategoryId;
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        API.getCategories()
            .then((res) => {
                let data = res.data;
                setCategories(data);
            });
    }, []);


    // Handler to change categories, remove css active class from previous active link and add to clicked 
    const clickHandler = (elem, id) => {
        setCategoryId(id);
        document.querySelector('.active').classList.remove('active');
        elem.target.classList.add('active');
    }



    return (
        <div className="row-space-top">
            <Row>
                <Col>
                    <h4>Kategorien</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Nav pills className="justify-content-center">
                        {categories?.map((category) => (
                            <NavItem
                                key={category.id}
                                onClick={(elem) => clickHandler(elem, category.id)}
                            >
                                <NavLink active={category.id === categories[0].id}>{category.name}</NavLink>
                            </NavItem>
                        ))}
                    </Nav>
                </Col>
            </Row>
        </div>
    )
}

export default CategoryComponent;