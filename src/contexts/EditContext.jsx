// Context.js
import React, { useRef, createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const EditContext = createContext();

export const useEditContext = () => useContext(EditContext);

export const EditProvider = ({ children }) => {
    const [menuData, setMenuData] = useState({ categories: [], menuItems: [] });
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        getMenuData()
    }, []);

    // 在 Context 中维护 categoryRefs
    const categoryRefs = useRef({});

    const getMenuData = async () => {
        try {
            const response = await axios.get('/menu/getAllMenuItems');

            // 確保 categories 存在，因為 API 只回傳品項
            const categoriesMap = {};

            response.data.forEach(item => {
                const categoryId = item.categoryId;
                if (!categoriesMap[categoryId]) {
                    categoriesMap[categoryId] = {
                        id: categoryId,
                        name: `分類 ${categoryId}`, // 如果 API 沒提供分類名稱，你可以用這種方式生成
                        items: []
                    };
                }
                categoriesMap[categoryId].items.push(item);
            });

            setMenuData({
                categories: Object.values(categoriesMap), // 轉換成陣列
                menuItems: response.data // 保留原始品項
            });

            // 更新 categoryRefs
            categoryRefs.current = Object.values(categoriesMap).reduce((acc, category) => {
                acc[category.id] = React.createRef();
                return acc;
            }, {});

        } catch (error) {
            console.error('Fetching menu data error:', error);
        }
    };

    const scrollToCategory = (categoryId) => {
        const ref = categoryRefs.current[categoryId];
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const addOrUpdateItem = async (item) => {
        // console.log3(item);
        if (!item.menuItemName) {
            alert('請填寫品項名稱');
            return;
        }

        if (!item.categoryId) {
            alert('請選擇品項類別');
            return;
        }

        if (!item.price) {
            alert('請填寫價格');
            return;
        }

        const method = 'post';
        const url = item.id ? `/menu/editMenuItem` : '/menu/addNewMenuItem';
        try {
            await axios[method](url, item);
            getMenuData();
            clearEdit();
        } catch (error) {
            console.error('Error saving menu item:', error);
        }
    };

    const deleteItem = async (item) => {
        try {
            await axios.post(`/menu/deleteMenuItem`,{menuItemId:item.id});
            getMenuData();
            clearEdit();
        } catch (error) {
            console.error('Deleting menu item error:', error);
        }
    };

    const setNewItem = () => {
        setEditingItem({ MenuItemName: "", Price: "", CategoryId: "", image_url: "" });
    };

    const clearEdit = () => {
        setEditingItem(null);
    };

    const value = {
        menuData,
        editingItem,
        setEditingItem,
        addOrUpdateItem,
        deleteItem,
        setNewItem,
        clearEdit,
        scrollToCategory,
        categoryRefs
    };

    return (
        <EditContext.Provider value={value}>
            {/* <EditContext.Provider> */}
            {children}
        </EditContext.Provider>
    )
};
/**
 * 請求資料
 * 新增品項
 * 刪除品項
 * 呼叫新增品項
 * 傳入編輯品項
 * 
 */