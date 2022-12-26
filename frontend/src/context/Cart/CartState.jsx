import { useReducer } from "react";
import CartContext from './CartContext';
import CartReducer from './CartReducer';
import { sumItems } from './CartReducer';



// Local Storage
const storage = localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems"))
: [];

const local_client = localStorage.getItem("client")
? JSON.parse(localStorage.getItem("client"))
: 'online';

const CartState = ({ children }) => {

    // Initial State of the cart
    const initialState = {
        cartItems: storage,
        ...sumItems(storage),
        checkout: false,
        client: local_client,
    };

    
    // Set up the reducer
    const [state, dispatch] = useReducer(CartReducer, initialState);


    // Function to handle when an item is added from the store into the Cart
    const addToCart = (payload, qty=1) => {
        dispatch({ type: "ADD_TO_CART", payload, qty});
    };


    // Function to handle when an item that is in the cart is added again
    const increase = (payload) => {
        dispatch({ type: "INCREASE", payload });
    };


    // Function to handle when an item is removed from the cart
    const decrease = (payload) => {
        dispatch({ type: "DECREASE", payload });
    };


    // Function to remove an item from the cart
    const removeFromCart = (payload) => {
        dispatch({ type: "REMOVE_ITEM", payload });
    };


    // Function to clear the cart
    const clearCart = () => {
        dispatch({ type: "CLEAR" });
    };


    // Function to handle when the user clicks the checkout button
    const handleCheckout = () => {
        dispatch({ type: "CHECKOUT" });
    };


    // Function to handle client change
    const changeClient = (payload) => {
        dispatch({ type: "CHANGE_CLIENT", payload });
    };


    return (
        // Add the functions that have been defined above int to Context provider
        <CartContext.Provider
            value={{
                showCart: state.showCart,
                cartItems: state.cartItems,
                addToCart,
                removeFromCart,
                increase,
                decrease,
                handleCheckout,
                clearCart,
                changeClient,
                ...state,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartState;