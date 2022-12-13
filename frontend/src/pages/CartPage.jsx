import React from "react";
import { Container } from "reactstrap";
import HeaderCartComponent from "../components/table/HeaderCartComponent";
import CartItemsComponent from "../components/cart/CartItemsComponent";
import CartTotalComponent from "../components/cart/CartTotalComponent";
import PromoComponent from "../components/cart/PromoComponent";

const CartPage = () => {

    return(
        <div>
            <Container>
                <HeaderCartComponent hasBack title="Bestellung" />
                <CartItemsComponent />
                <PromoComponent />
            </Container>
            <CartTotalComponent />
        </div>
    );
}
export default CartPage;