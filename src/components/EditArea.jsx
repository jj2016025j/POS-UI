// EditArea.jsx
import React, { useEffect, useState } from 'react';
import SubTitle from '../components/SubTitle';
import { useEditContext } from '../contexts/EditContext';

function EditArea() {
    const {
        menuData,
        editingItem,
        setEditingItem,
        addOrUpdateItem,
        clearEdit
    } = useEditContext();
    const [preview, setPreview] = useState(editingItem?.image_url || '');
    // const handleChange = (e) => {
    //     setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
    // };

    useEffect(() => {
        if (editingItem?.image_url) {
            setPreview(editingItem.image_url);
        }
    }, [editingItem?.image_url]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image_url' && files && files[0]) {
            const file = files[0];
            setEditingItem({ ...editingItem, image_url: URL.createObjectURL(file) });
            // 生成文件预览
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setEditingItem({ ...editingItem, [name]: value });
        }
        console.log(editingItem);
    };

    return (
        <React.Fragment>
            <SubTitle />
            <div className="edit-context">
                <input
                    type="text"
                    name="MenuItemName"
                    value={editingItem?.MenuItemName || ''}
                    onChange={handleChange}
                    placeholder="請輸入品項名稱"
                />
                <select
                    name="CategoryId"
                    value={editingItem?.CategoryId || ''}
                    onChange={handleChange}
                >
                    <option value="">請選擇分類</option>
                    {menuData.categories.map(category => (
                        <option key={category.Id} value={category.Id}>
                            {category.CategoryName}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="Price"
                    value={editingItem?.Price || ''}
                    onChange={handleChange}
                    placeholder="請輸入價格"
                />
                <input
                    type="file"
                    name="image_url"
                    // value={editingItem?.image_url || ''}
                    onChange={handleChange}
                    placeholder="請選擇圖片"
                />
                {preview && <img src={preview} alt="Preview" style={{ width: '300px', height: '300px' }} />}

            </div>
            <div className="edit-button-group">
                <button className='save-button' onClick={() => addOrUpdateItem(editingItem)}>保存</button>
                <button className='cancel-button' onClick={clearEdit}>取消</button>
            </div>
        </React.Fragment>
    );
}

export default EditArea;
