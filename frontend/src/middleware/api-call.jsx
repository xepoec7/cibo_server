/**
 * Class for calling API server
 * 
 * @class Api
 * @consturctor
 * @routes
 */

import axios from "axios";

export default class Api {

    constructor() {
        this.api_url = "http://127.0.0.1:8000/api";
        this.client = null;
    }

    init = () => {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        });

        return this.client
    }


    /**
     * 
     * API ROUTES
     * 
     */

    getCategories = () => {
        return this.init().get('/category/');
    };

    getProducts = (category_id) => {
        return this.init().get(`/category/${category_id}`);
    };

    sendOrder = (cart) => {
        return this.init().post('/order/new', cart);
    };

}