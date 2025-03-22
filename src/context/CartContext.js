import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

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

    const addToCart = (product, cartQuantity) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
            let updatedCart;
            
            if ((product.type === "service" || product.type === "hawan" || product.type === "jaap") && existingItemIndex !== -1) {
                toast.error("You can only add one product at a time! ❌");
                return prevCart;
            }
    
            if (existingItemIndex !== -1) {
                // If the item exists, update its quantity
                updatedCart = [...prevCart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + cartQuantity,
                };
                toast.info("Item already exists in the cart! Quantity updated 🛒");
            } else {
                // If the item is new, add it to the cart
                const { translations, ...restProduct } = product;
                const newCartItem = {
                    ...restProduct,
                    translations: {
                        language_code: translations.language_code,
                        name: translations.name,
                    },
                    quantity: cartQuantity,
                };
    
                updatedCart = [newCartItem, ...prevCart];
                toast.success("Item added to cart successfully! 🛍️");
            }
    
            // Save the updated cart to localStorage
            saveCartToLocalStorage(updatedCart);
    
            return updatedCart;
        });
    };
    
    

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
