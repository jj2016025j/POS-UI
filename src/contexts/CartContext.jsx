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
        const total = itemsForTable.reduce((total, item) => total + item.quantity * item.price, 0);

        return {
            total
        };
    };

    const addToCart = (mainOrderId, newItem, newQuantity) => {
        setCartItems(prevItems => {
            let itemsForTable = prevItems[mainOrderId]?.items || [];
    
            if (!newItem.id) {
                console.error("商品 ID 無效:", newItem);
                return prevItems;
            }
    
            // 確保 `findIndex` 比對時 `Id` 正確
            const existItemIndex = itemsForTable.findIndex(item => item.id === newItem.id);
    
            if (existItemIndex > -1) {
                // 如果品項已經存在，更新數量或刪除
                if (newQuantity > 0) {
                    itemsForTable = itemsForTable.map((item, index) =>
                        index === existItemIndex ? { ...item, quantity: newQuantity } : item
                    );
                } else {
                    itemsForTable = itemsForTable.filter((_, index) => index !== existItemIndex);
                }
            } else if (newQuantity > 0) {
                // 如果品項不存在，添加新商品
                itemsForTable = [...itemsForTable, { ...newItem, quantity: newQuantity }];
            }
    
            const updatedTableInfo = updateCartSummary(itemsForTable);
    
            return {
                ...prevItems,
                [mainOrderId]: {
                    ...prevItems[mainOrderId],
                    menuItems: itemsForTable,
                    ...updatedTableInfo
                }
            };
        });
    };

    const getSubOrderInfo = (mainOrderId) => {
        console.log(SubOrderInfo)
        console.log(SubOrderInfo[mainOrderId])
        return SubOrderInfo[mainOrderId] || { items: [], total: 0 };
    };

    return (
        <CartContext.Provider value={{ SubOrderInfo, addToCart, getSubOrderInfo }}>
            {children}
        </CartContext.Provider>);
};
