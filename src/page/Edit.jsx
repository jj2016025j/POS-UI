import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItemForEdit from '../components/MenuItemForEdit';

function ItemEdit() {
    const [menuData, setMenuData] = useState({ categories: [], menuItems: [] });
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        axios.get('/menu')
            .then(response => {
                setMenuData(response.data);
            })
            .catch(error => {
                console.error('Fetching menu data error: ', error);
            });
    }, []);

    const handleEdit = (item) => {
        // 设置当前正在编辑的菜单项
        setEditingItem({ ...item });
    };

    const handleDelete = (itemId) => {
        if (window.confirm("确定要删除这个菜单项吗？")) {
            axios.delete(`/menu/items/${itemId}`)
                .then(() => {
                    // 提示删除成功并重新加载数据或移除该项
                    alert("菜单项删除成功");
                    setMenuData(prevData => ({
                        ...prevData,
                        menuItems: prevData.menuItems.filter(item => item.Id !== itemId)
                    }));
                })
                .catch(error => {
                    console.error('Deleting item error: ', error);
                });
        }
    };

    const handleSave = (editedItem) => {
        // 假设这是发送更新请求到后端的操作
        console.log("Saving edited item:", editedItem);
        // 这里应该包含实际的保存逻辑
        // 成功后的操作
        setEditingItem(null); // 清除编辑状态
    };

    const handleAddNewItem = () => {
        // 设置一个新的空白菜单项以开始添加
        console.log("Adding new item");
        // 这里应该包含实际的添加新项逻辑
        setEditingItem({ MenuItemName: "", Price: "", CategoryId: "", image_url: "" });
    };

    return (
        <div>
            <button onClick={handleAddNewItem}>新增品项</button>

            {menuData.categories && Array.isArray(menuData.categories) && menuData.categories.map(category => (
                <div key={category.Id}>
                    <h2>{category.CategoryName}</h2>
                    {menuData.menuItems && Array.isArray(menuData.menuItems) && menuData.menuItems.filter(item => item.CategoryId === category.Id).map(item => (
                        <div key={item.Id}>
                            <MenuItemForEdit item={item} onEdit={handleSave} onDelete={handleDelete} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ItemEdit;
