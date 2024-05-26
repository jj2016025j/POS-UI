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
            const response = await axios.get('/menu');
            setMenuData(response.data);
            // 更新 categoryRefs
            categoryRefs.current = response.data.categories.reduce((acc, category) => {
                acc[category.Id] = React.createRef();
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
        console.log(item);
        if (!item.MenuItemName) {
            alert('請填寫品項名稱');
            return;
        }

        if (!item.CategoryId) {
            alert('請選擇品項類別');
            return;
        }

        if (!item.Price) {
            alert('請填寫價格');
            return;
        }

        const method = item.id ? 'put' : 'post';
        const url = item.id ? `/menu/${item.id}` : '/menu';
        try {
            await axios[method](url, item);
            getMenuData();
            clearEdit();
        } catch (error) {
            console.error('Error saving menu item:', error);
        }
    };

    const deleteItem = async (itemId) => {
        try {
            await axios.delete(`/menu/items/${itemId}`);
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