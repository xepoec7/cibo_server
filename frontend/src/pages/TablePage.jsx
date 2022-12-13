import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import HeaderCartComponent from "../components/table/HeaderCartComponent";
import MenuTabsComponent from "../components/table/MenuTabsComponent";
import BoardComponent from "../components/table/BoardComponent";
import { useState } from "react";
import Api from '../middleware/api-call';
import Cart from '../middleware/cart';
import '../components/table/table.css';

const TablePage = () => {

    const navigate = useNavigate();
    const API = new Api();
    const {table} = useParams();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const cart = new Cart();
    cart.changeClient(table);

    const onCategoryClick = (category_id) => {
        API.getProducts(category_id)
            .then((res) => {
                let data = res.data;
                setProducts(data);
            })
    };

    const onProductClick = (product) => {
        navigate('/tableservice/product', {state:{product:product}})
    }; 

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
    }, []);

    return(
        <div>
            <Container>
                <HeaderCartComponent hasBack title="Cibo Colorato" />
                <MenuTabsComponent categories={categories} handler={onCategoryClick} />
                <BoardComponent products={products} handler={onProductClick} />
            </Container>
        </div>
    );
}

export default TablePage;