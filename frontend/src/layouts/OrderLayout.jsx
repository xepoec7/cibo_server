import React from "react";
import {Outlet} from 'react-router-dom';
import FooterComponent from '../components/shared/FooterComponent';

const OrderLayout = () => {
    return (
        <>
            <Outlet />
            <FooterComponent />
        </>
    )
}

export default OrderLayout;