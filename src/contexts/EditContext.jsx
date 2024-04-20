// Context.js
import React, { createContext, useContext, useState } from 'react';

const EditContext = createContext();

export const useEditContext = () => useContext(EditContext);

export const EditProvider = ({ children }) => {
    const [editingItem, setEditingItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const startEdit = (item) => {
        setEditingItem(item);
        setIsEditing(true);
    };

    const startAdd = () => {
        setEditingItem({ MenuItemName: "", Price: "", CategoryId: "", image_url: "" });
        setIsEditing(false);
    };

    const clearEdit = () => {
        setEditingItem(null);
        setIsEditing(false);
    };

    const value = {
        editingItem,
        isEditing,
        startEdit,
        startAdd,
        clearEdit,
        setEditingItem
    };

    return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
};
