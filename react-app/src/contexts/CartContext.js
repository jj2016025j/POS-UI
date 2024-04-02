import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (tableId, newItem, newQuantity) => {
        setCartItems(prevItems => {
            // 获取当前桌号的购物车，如果没有则初始化为空数组
            const itemsForTable = prevItems[tableId] || [];
            // 检查购物车中是否已存在该项目
            const existItemIndex = itemsForTable.findIndex(item => item.Id === newItem.Id);
            if (existItemIndex > -1) {
                // 如果存在，则更新该项目的数量
                const updatedItems = itemsForTable.map((item, index) => 
                    index === existItemIndex ? { ...item, quantity: newQuantity } : item
                );
                return { ...prevItems, [tableId]: updatedItems };
            } else {
                // 如果不存在，则添加新项目
                const updatedItems = [...itemsForTable, { ...newItem, quantity: newQuantity }];
                return { ...prevItems, [tableId]: updatedItems };
            }
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
