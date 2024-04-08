import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    console.log("cartItems", cartItems);

    // 初始化时从 localStorage 加载购物车数据
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCartItems) {
            setCartItems(storedCartItems);
        }
    }, []);

    // 购物车数据有更新时，同步到 localStorage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);


    const addToCart = (tableId, newItem, newQuantity) => {
        setCartItems(prevItems => {
            // 获取当前桌号的购物车，如果没有则初始化为空数组
            const itemsForTable = prevItems[tableId] || [];
            console.log("itemsForTable", itemsForTable);
            const existItemIndex = itemsForTable.findIndex(item => item.Id === newItem.Id);
            if (existItemIndex > -1) {
                // 如果存在，则更新该项目的数量
                const updatedItems = itemsForTable.map((item, index) =>
                    index === existItemIndex ? { ...item, quantity: newQuantity } : item
                );
                console.log("updatedItems", updatedItems);

                return { ...prevItems, [tableId]: updatedItems };
            } else {
                // 如果不存在，则添加新项目
                const updatedItems = [...itemsForTable, { ...newItem, quantity: newQuantity }];
                console.log("updatedItems", updatedItems);
                return { ...prevItems, [tableId]: updatedItems };
            }

            const updatedItems = { ...prevItems, [tableId]: itemsForTable };
            localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // 更新 localStorage
            return updatedItems;
        });
    };

    const SERVICE_FEE_RATE = 0.1; // 服務費率

    const generateOrderSummary = (tableId) => {
        // 新增函數來生成訂單摘要
        const itemsForTable = cartItems[tableId] || [];
        const subtotal = itemsForTable.reduce((total, item) => total + item.quantity * item.Price, 0);
        const serviceFee = subtotal * SERVICE_FEE_RATE;
        const total = subtotal + serviceFee;

        return {
            tableId,
            items: itemsForTable,
            subtotal,
            serviceFee,
            total
        };
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, generateOrderSummary }}>
            {children}
        </CartContext.Provider>);
};
