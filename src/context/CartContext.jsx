import React, { useState, useContext, createContext } from 'react'; // Corregido: createContext bien escrito y sin el 'use' suelto

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser usado dentro de un CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Agregar al carrito
    const addToCart = (product, quantity) => {
        const itemInCart = cart.find(item => item.id === product.id); // Corregido: itemInCart para que coincida con el if
        if (itemInCart){
            const updatedCart = cart.map(item =>
                item.id === product.id 
                ? { ...item, quantity: item.quantity + quantity } 
                : item
            );
            setCart(updatedCart);
        }
        else{
            setCart(prevCart => [...prevCart, { ...product, quantity }]);
        }
    };

    //Eliminar un producto del carrito
    const removeItem = (productoId) => {
        const updatedCart = cart.filter(item => item.id !== productoId);
        setCart(updatedCart);
    };

    //Verificar si un producto está en el carrito
    const isInCart = (productoId) => {
        return cart.some(item => item.id === productoId);
    };

    // Vaciar carrito
    const clearCart = () => {
        setCart([]);
    };
    
    // Cantidad total de items
    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    };

    // Calcular precio total - Corregido: se agregó el 'const'
    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    };

    //Obtener cantidad de un item especifico
    const getCantidadActual = (productoId) => {
        const item = cart.find(item => item.id === productoId);
        return item ? item.quantity : 0;
    };

    return (
        <CartContext.Provider value={{ cart, getCantidadActual, addToCart, clearCart, getCartQuantity, getCartTotal, removeItem, isInCart }}>
            {children}
        </CartContext.Provider>
    );
};