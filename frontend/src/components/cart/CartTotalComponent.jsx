import React, { useContext } from "react";
import { Button, Card, CardBody, Container, Table } from "reactstrap";
import Api from '../../middleware/api-call';
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import CartContext from "../../context/Cart/CartContext";

const CartTotalComponent = () => {

    const { total, client, cartItems, handleCheckout } = useContext(CartContext);
    const API = new Api();
    const alert = useAlert();


    const orderBtnHandler = () => {
        let items = [];
        cartItems.map(item => {
            let i = {product: item.id, qty: item.quantity};
            items.push(i);
        });
        let data = {client: client, orderitems: items};
        console.log(items);
        API.sendOrder(data)
            .then(() => {
                handleCheckout();
                alert.success("Ihre Bestellung ist zum Küche gesendet!");
            })
            .catch(() => {
                alert.error("Auf fehler aufgetreten, bitte versuchen Sie noch einmal");
            });
    };

    return (
        <Card color="dark" inverse className="row-space-top">
            <CardBody>
                <Container>
                    <Table responsive className="text-white">
                        <tbody>
                            <tr>
                                <td><b>Total</b></td>
                                <td className="text-end"><b>{total} €</b></td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="text-center">
                        <Button onClick={() => orderBtnHandler()} block size="lg" color="warning">Bestellen</Button>
                    </div>
                </Container>
            </CardBody>
        </Card>
    );
}

export default CartTotalComponent;