import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Api from "../service/ApiService";

const DetailsPage = () => {

    const API = new Api();
    const [searchParams, setSearchParams] = useSearchParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        API.getProduct()
            .then((res) => {
                let data = res.data;
                setProduct(data);
            });
    });

}

export default DetailsPage;