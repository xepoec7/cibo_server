import React, { useContext } from "react";
import { Button, Card, CardBody, Container, Table } from "reactstrap";
import Api from '../../middleware/api-call';
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import CartContext from "../../context/Cart/CartContext";

const CartTotalComponent = () => {

    const { total, client, changeClient } = useContext(CartContext);


    const buttonHandler = () => {
        console.log("Clieckd");
        changeClient('SSSS');
    }

    return (
        <Card color="dark" inverse className="row-space-top">
            <CardBody>
                <Container>
                    <Table responsive className="text-white">
                        <tbody>
                            <tr>
                                <td><b>Total</b></td>
                                <td className="text-end"><b>{total} €</b></td>
                                <td>{client}</td>
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