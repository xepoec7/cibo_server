/**
 * Class for calling backend API server
 * 
 * @class Api
 * 
 */
import axios from 'axios';

export default class Api {

    constructor() {
        this.api_url = "https://cibocolorato.com/api/v1";
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

    /*
    * API ROUTES
    */

    getPageSettings = () => {
        return this.init().get('/settings/');
    }


    getCategories = () => {
        return this.init().get('/category/');
    }


    getProductsByCategory = (category_id) => {
        return this.init().get(`/category/${category_id}`);
    }


    sendOrder = (order) => {
        return this.init().post('/order/', order);
    }


    statusOrder = (order_id) => {
        return this.init().get(`/order/${order_id}/status`);
    }


    checkPromo = (promo_code) => {
        return this.init().get(`/promo/${promo_code}/check`);
    }


    applyPromo = (order_id, promo) => {
        return this.init().get(`/order/${order_id}/discount/${promo}`);
    }
}