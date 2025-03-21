import React, { createContext, useState, useEffect } from "react";

// Create Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage on component mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage when it updates
    const saveCartToLocalStorage = (updatedCart) => {
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    };

    const addToCart = (product,cartQuantity) => {
     setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
    
            if (existingItem) {
                return prevCart;
            }
    
            // Create a new object without the description field
            const { translations, ...restProduct } = product; 
            const newCartItem = {
                ...restProduct,
                translations: {
                    language_code: translations.language_code,
                    name: translations.name
                }, // Excluding description
                quantity: cartQuantity
            };
    
            const newCart = [newCartItem, ...prevCart];
            saveCartToLocalStorage(newCart);
            return newCart;
        });
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
