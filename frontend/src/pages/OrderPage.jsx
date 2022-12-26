import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "reactstrap";
import CategoryComponent from "../components/order/CategoryComponent";
import ProductComponent from "../components/order/ProductComponent";
import CartContext from '../context/Cart/CartContext';

const OrderPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { changeClient, client } = useContext(CartContext);
    const [categoryId, setCategoryId] = useState(1);

    useEffect(() => {
        let client_param = searchParams.get("client") || false;
        if (client_param) {
            changeClient(client_param);
        }
    }, []);

    return (
        <div>
            <Container>
                <CategoryComponent categoryId={categoryId} setCategoryId={setCategoryId} />
                <ProductComponent categoryId={categoryId} />
            </Container>
        </div>
    )
}

export default OrderPage;