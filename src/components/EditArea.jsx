// EditArea.jsx
import React from 'react';
import SubTitle from '../components/SubTitle';
import { useEditContext } from '../contexts/EditContext';

function EditArea() {
    const { editingItem, isEditing, setEditingItem, clearEdit } = useEditContext();

    const handleSave = () => {
        console.log("Saving edited item:", editingItem);
        // 这里应该包含实际的保存逻辑
        clearEdit(); // 清除编辑状态
    };

    const handleDelete = () => {
        console.log("Deleting item:", editingItem);
        // 这里应该包含实际的删除逻辑
        clearEdit(); // 清除编辑状态
    };

    const handleAdd = () => {
        console.log("Adding new item:", editingItem);
        // 这里应该包含实际的添加逻辑
        clearEdit(); // 清除编辑状态
    };

    const handleChange = (e) => {
        setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
    };

    // if (!editingItem) return null; // 如果没有编辑项，不显示侧边栏

    return (
        <React.Fragment>
            <SubTitle />
            <input
                type="text"
                name="MenuItemName"
                value={"1"}
                onChange={handleChange}
                placeholder="品项名称"
            />
            <input
                type="number"
                name="Price"
                value={"2"}
                onChange={handleChange}
                placeholder="价格"
            />
            <input
                type="text"
                name="image_url"
                value={"3"}
                onChange={handleChange}
                placeholder="图片URL"
            />
            <select
                name="CategoryId"
                value={"4"}
                onChange={handleChange}
            >
                {/* 假设 categories 是通过 Context 或 Props 传入 */}
                {/* {categories.map(category => (
                    <option key={category.Id} value={category.Id}>
                        {category.CategoryName}
                    </option>
                ))} */}
            </select>
            {isEditing ? (
                <>
                    <button onClick={handleSave}>保存</button>
                    <button onClick={handleDelete}>删除</button>
                </>
            ) : (
                <>
                    <button onClick={handleAdd}>新增</button>
                    <button onClick={clearEdit}>取消</button>
                </>
            )}
        </React.Fragment>
    );
}

export default EditArea;
