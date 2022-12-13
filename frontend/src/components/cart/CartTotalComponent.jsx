import React from "react";
import { Button, Card, CardBody, Container, Table } from "reactstrap";
import Cart from "../../middleware/cart";
import Api from '../../middleware/api-call';
import { useAlert } from "react-alert";

const CartTotalComponent = () => {

    const cart = new Cart();
    const API = new Api();
    const alert = useAlert();


    const buttonHandler = () => {
        API.sendOrder(cart)
            .then((res) => {
                alert.success('Bestellung gesendet!');
            })
            .catch((err) => {
                alert.error('Es hat zum einen Fehler gekommen, versuchen Sie noch einmal...');
            })
    }

    return (
        <Card color="dark" inverse className="row-space-top">
            <CardBody>
                <Container>
                    <Table responsive className="text-white">
                        <tbody>
                            <tr>
                                <td><b>Total</b></td>
                                <td className="text-end"><b>{cart.total} €</b></td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="text-center">
                        <Button onClick={() => buttonHandler()} block size="lg" color="warning">Bestellen</Button>
                    </div>
                </Container>
            </CardBody>
        </Card>
    );
}

export default CartTotalComponent;