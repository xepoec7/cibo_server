import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import CategoryComponent from "../components/order/CategoryComponent";
import ProductComponent from "../components/order/ProductComponent";

const OrderPage = () => {

    const { client } = useParams();
    const [categoryId, setCategoryId] = useState(1);


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