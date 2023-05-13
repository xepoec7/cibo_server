import React from "react";
import {useSearchParams} from 'react-router-dom';
import { Container } from "reactstrap";
import BoardComponent from '../components/order/BoardComponent';

const OrderPage = () => {

    const [searchParam, setSearchParam] = useSearchParams();
    const client = searchParam.get("client")? searchParam.get('client') : "online";


    return (
        <Container>
            <BoardComponent />
        </Container>
    )
}

export default OrderPage;