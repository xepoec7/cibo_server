/**
 *  Class for Cart
 * 
 * @class Cart
 * @constructor
 */

export default class Cart {

    constructor() {
        this.client = '';
        this.items = [];
        this.total = 0;
        let cart = JSON.parse(localStorage.getItem('cart')) || false;
        if (cart) {
            this.client = cart.client;
            this.items = cart.items;
            this.total = cart.total;
        }
    }


    // Method for saving changes to localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify({
            client: this.client,
            items: this.items,
            total: this.total
        }));
    }


    // Method for chaning client in cart
    changeClient(client) {
        this.client = client;
        this.saveCart();
    }


    // Method for adding item to cart
    addToCart(product, qty) {
        for (var i=0; i < this.items.lenght; i++) {
            if (product.id === this.items[i].product.id) {
                this.items[i].qty += qty;
                this.items[i].sum += (qty * product.price);
                return;
            }
        }
        this.items.push({product: product, qty: qty, sum: (qty * product.price)});
        this.total += (qty * product.price)
        this.saveCart();
    }


    // Method to remove item from cart 
    removeItem(product) {
        for (var i=0; i < this.items.length; i++) {
            if (product.id === this.items[i].product.id) {
                this.total -= this.items[i].sub;
                this.items.splice(i, 1);
            }
        }
        console.log(this.items.length);
        this.saveCart();
    }


    // Method for removing cart object from localStorage
    destroyCart() {
        localStorage.removeItem('cart');
    }


    // Log cart
    logCart() {
        console.log(this.items);
    }
}