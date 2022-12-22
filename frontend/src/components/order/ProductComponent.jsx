import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Row } from "reactstrap";
import Api from "../../middleware/api-call";


const ProductComponent = (props) => {

    const API = new Api();
    const navigate = useNavigate();
    const categoryId = props.categoryId;
    const [products, setProducts] = useState([]);

    
    useEffect(() => {
        API.getProducts(categoryId)
            .then((res) => {
                let data = res.data;
                setProducts(data);
            });
    }, [categoryId]);


    return (
        <div className="row-space-top">
            <Row xs="2">
                {products?.map((product) => (
                    <Card
                        key={product.id}
                        color="dark"
                        inverse
                        onClick={() => navigate('product', {state: {product:product}})}
                    >
                        <img src={product.img} alt="no-image" className="img-fluid" />
                        <CardBody className="text-center">
                            <CardTitle tag="h5">{product.name}</CardTitle>
                            <CardSubtitle>{product.time}</CardSubtitle>
                            <CardText>{product.price}</CardText>
                        </CardBody>
                    </Card>
                ))}
            </Row>
        </div>
    )
}

export default ProductComponent;