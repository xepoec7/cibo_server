// Import the Action types
import {
    REMOVE_ITEM,
    ADD_TO_CART,
    INCREASE,
    DECREASE,
    CHECKOUT,
    CLEAR,
} from './CartTypes';


const Storage = (cartItems) => {
    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems.length > 0 ? cartItems : [])
    );
};


// Export function to calculate the total price of the cart and the total quantity of the cart
export const sumItems = (cartItems) => {
    Storage(cartItems);
    let itemCount = cartItems.reduce(
        (total, product) => total + product.quantity,
        0
    );
    let total = cartItems
        .reduce((total, product) => total + product.price * product.quantity, 0)
        .toFixed(2);
    return { itemCount, total };
};


// The reducer is listening for an action, which is the type that we defined in the CartTypes.jsx file
const CartReducer = (state, action) => {

    // The switch statement is checking the type of action that is being passed in
    switch (action.type) {

        case ADD_TO_CART:
            if (!state.cartItems.find((item) => item.id === action.payload.id)) {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1,
                });
            }

            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };

        
        case REMOVE_ITEM:
            return {
                ...state,
                ...sumItems(
                    state.cartItems.filter((item) => item.id !== action.payload.id)
                ),
                cartItems: [
                    ...state.cartItems.filter((item) => item.id !== action.payload.id),
                ],
            };


        case INCREASE:
            state.cartItems[
                state.cartItems.findIndex((item) => item.id === action.payload.id)
            ].quantity++;
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };


        case DECREASE:
            state.cartItems[
                state.cartItems.findIndex((item) => item.id === action.payload.id)
            ].quantity--;
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };


        case CHECKOUT:
            return {
                cartItems: [],
                checkout: true,
                ...sumItems([]),
            };


        case CLEAR:
            return {
                cartItems: [],
                ...sumItems([]),
            };

            
        default:
            return state;
    }
};

export default CartReducer;