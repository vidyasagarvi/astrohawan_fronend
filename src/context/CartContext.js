import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define initial state
const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [], // Initialize cart items from localStorage
    // Add other states if needed
};

// Create context
const CartContext = createContext();

// Custom hook to use CartContext
export const useCart = () => useContext(CartContext);

// Reducer function to manage state updates
const cartReducer = (state, action) => {
    switch (action.type) {
       
        case 'ADD_TO_CART':
            const productId = action.payload;
            const existingItem = state.cartItems.find(item => item.productId === productId);

            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item.productId === productId
                            ? { ...item, quantity: item.quantity + action.quantity }
                            : item
                    ),
                };
            } else {
                // Product does not exist in cart, add new entry
                return {
                    ...state,
                    cartItems: [...state.cartItems, { productId, quantity: action.quantity }],
                };
            }


        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.productId !== action.payload),
            };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.productId === action.payload.productId
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                ).filter(item => item.quantity > 0), // Ensure no items have a quantity less than 1
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cartItems: [],
            };
        case 'LOAD_CART_ITEMS':
            return {
                ...state,
                cartItems: action.payload,
            };
        default:
            return state;
    }
};

// CartProvider component to wrap around your app
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart items from localStorage on component mount
    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            dispatch({ type: 'LOAD_CART_ITEMS', payload: JSON.parse(storedCartItems) });
        }
    }, []);

    // Save cart items to localStorage whenever cartItems state changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
