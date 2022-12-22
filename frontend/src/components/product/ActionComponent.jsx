import React, {useState, useContext} from "react";
import { TfiShoppingCart } from "react-icons/tfi";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import CartContext from "../../context/Cart/CartContext";

const ActionComponent = (props) => {


    const { addToCart, increase, cartItems, sumItems, itemCount } = useContext(CartContext)
    const product = props.product;
    const [qty, setQty] = useState(1);

    // Check whether the product is in the cart or not
    const isInCart = () => {
        return !!cartItems.find((item) => item.id === product.id);
    }


    return (
        <div className="row-space-top">
            <Row xs="2">
                <Col>
                    <Card color="dark" inverse>
                        <CardBody className="text-center">
                            <Button
                                size="sm"
                                onClick={() => qty > 1? setQty(qty-1) : setQty(qty)}>-
                            </Button>
                            <span>{qty}</span>
                            <Button size="sm" onClick={() => setQty(qty+1)}>+</Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card color="dark" inverse>
                        <CardBody className="text-center">
                            {!isInCart() && (
                                <Button
                                    size="sm"
                                    color="warning"
                                    outline
                                    onClick={() => addToCart(product)}
                                >
                                    <TfiShoppingCart /> Einfügen
                                </Button>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ActionComponent;
