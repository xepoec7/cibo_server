import React from "react";
import { Outlet } from 'react-router-dom';
import FooterLayout from "./FooterLayout";
import OrderHeaderLayout from './OrderHeaderLayout';

const OrderLayout = () => {
    return (
        <>
            <OrderHeaderLayout />
            <Outlet />
            <FooterLayout />
        </>
    )
}

export default OrderLayout;