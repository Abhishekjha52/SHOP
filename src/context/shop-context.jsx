import React, { createContext, useState } from "react"
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {//it generally provides default cart values with 0, in caseif we create new product it will handle of creating a new product
    let cart = {};
    for (let i = 1; i < PRODUCTS.length + 1; i++) {//id's start with one so loop starts with 1
        cart[i] = 0;
    }
    return cart;
}


const ShopContextProvider = (props) => {


    const [cartItems, setCartItems] = useState(getDefaultCart());

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.price;
            }
        }

        return totalAmount;
    }


    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
    }

    const contextValue = { cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount };

    //console.log(cartItems);
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;