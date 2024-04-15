/**
 * 取得localstorage內資料V
 * 提供增減各桌購物車內商品的數量的功能，並在數量為0時移除V
 * 在改動購物車時自動計算總額並更新V
 * 每次更動購物車都要儲存到localstorageV
 */
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [SubOrderInfo, setCartItems] = useState({});

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('SubOrderInfo'));
        if (storedCartItems) {
            setCartItems(storedCartItems);
        }
    }, []);

    // 购物车数据有更新时，同步到 localStorage
    useEffect(() => {
        console.log("SubOrderInfo", SubOrderInfo);
        localStorage.setItem('SubOrderInfo', JSON.stringify(SubOrderInfo));
    }, [SubOrderInfo]);

    const updateCartSummary = (itemsForTable) => {
        const total = itemsForTable.reduce((total, item) => total + item.quantity * item.Price, 0);

        return {
            total
        };
    };

    const addToCart = (mainOrderId, newItem, newQuantity) => {
        setCartItems(prevItems => {
            let itemsForTable = prevItems[mainOrderId]?.items || [];
            console.log("itemsForTable", itemsForTable.map(item => `${item.Id} (${typeof item.Id})`));
            // console.log("newItem", `${newItem.Id} (${typeof newItem.Id})`);
            const existItemIndex = itemsForTable.findIndex(item => item.Id === newItem.Id);
            console.log("找到位置", existItemIndex)
            if (existItemIndex > -1) {
                if (newQuantity > 0) {
                    console.log("更新數量", newQuantity)
                    itemsForTable = itemsForTable.map((item, index) =>
                        index === existItemIndex ? { ...item, quantity: newQuantity } : item
                    );
                } else {
                    console.log("移除該商品", newQuantity)

                    itemsForTable = itemsForTable.filter((item, index) => index !== existItemIndex);
                }
            } else if (newQuantity > 0) {
                console.log("添加新商品", newQuantity)
                itemsForTable = [...itemsForTable, { ...newItem, quantity: newQuantity }];
            } else {
                console.log("不知道做了甚麼")
            }
            console.log("itemsForTable", itemsForTable.map(item => `${item.Id} (${typeof item.Id})`));

            const updatedTableInfo = updateCartSummary(itemsForTable);
            console.log("updatedTableInfo", updatedTableInfo);

            return {
                ...prevItems,
                [mainOrderId]: {
                    ...prevItems[mainOrderId],
                    items: itemsForTable,
                    ...updatedTableInfo
                }
            };
        });
    };

    const getSubOrderInfo = (mainOrderId) => {
        return SubOrderInfo[mainOrderId] || {};
    };


    return (
        <CartContext.Provider value={{ SubOrderInfo, addToCart, getSubOrderInfo }}>
            {children}
        </CartContext.Provider>);
};
