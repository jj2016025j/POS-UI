import React, { createContext, useContext, useEffect, useState } from 'react';

const TablesContext = createContext();

export const useCart = () => useContext(TablesContext);

export const CartProvider = ({ children }) => {
    const [TablesInfo, setTablesInfo] = useState({ tables: [] });
    console.log("TablesInfo", TablesInfo);

    useEffect(() => {
        const storedTablesInfo = JSON.parse(localStorage.getItem('TablesInfo'));
        if (storedTablesInfo) {
            setTablesInfo(storedTablesInfo);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('TablesInfo', JSON.stringify(TablesInfo));
    }, [TablesInfo]);

    const updateTableOrder = (tableId, item, quantity) => {
        setTablesInfo(prevTablesInfo => {
            let itemsForTable = prevTablesInfo[tableId]?.items || [];
            const existingItemIndex = itemsForTable.findIndex(existingItem => existingItem.Id === item.Id);

            if (existingItemIndex > -1) {
                // 如果品项存在且新数量为0，则移除该品项
                if (quantity === 0) {
                    itemsForTable = itemsForTable.filter((_, index) => index !== existingItemIndex);
                } else {
                    // 更新品项数量
                    itemsForTable = itemsForTable.map((currentItem, index) =>
                        index === existingItemIndex ? { ...currentItem, quantity: quantity } : currentItem
                    );
                }
            } else {
                // 新增品项
                itemsForTable = [...itemsForTable, { ...item, quantity: quantity }];
            }

            // 更新后的桌子订单
            const updatedTableOrder = { items: itemsForTable };

            // 计算订单摘要
            const { subtotal, serviceFee, total } = calculateOrderSummary(tableId, itemsForTable);

            // 将订单摘要信息加入到桌子订单中
            updatedTableOrder.summary = { subtotal, serviceFee, total };

            // 更新TablesInfo
            const updatedTablesInfo = { ...prevTablesInfo, [tableId]: updatedTableOrder };
            localStorage.setItem('TablesInfo', JSON.stringify(updatedTablesInfo));

            return updatedTablesInfo;
        });
    };

    // 修改 calculateOrderSummary 接受 items 参数，直接计算而非从 TablesInfo 获取
    const calculateOrderSummary = (tableId, itemsForTable) => {
        const subtotal = itemsForTable.reduce((total, { quantity, Price }) => total + (quantity * Price), 0);
        const SERVICE_FEE_RATE = 0.1; // 服務費率
        const serviceFee = subtotal * SERVICE_FEE_RATE;
        const totalAmount = subtotal + serviceFee;

        return { subtotal, serviceFee, total: totalAmount };
    };

    return (
        <TablesContext.Provider value={{ TablesInfo, updateTableOrder, calculateOrderSummary }}>
            {children}
        </TablesContext.Provider>);
};
