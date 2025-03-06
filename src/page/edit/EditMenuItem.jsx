// EditMenuItem.jsx
import React from 'react';
import MenuItemInfo from '../../components/MenuItemInfo';
import { useEditContext } from '../../contexts/EditContext'

function EditMenuItem({ item }) {
  const {
    deleteItem,
    setEditingItem
  } = useEditContext();

  const handleDelete = (itemId) => {
    if (window.confirm("是否確定移除此品項")) {
      deleteItem(itemId)
    }
  };

  return (
    <div className='menuItem'>
      <MenuItemInfo item={item} />
      <div className="edit-item-button-group">
        <button className='edit-button' onClick={() => setEditingItem(item)}>編輯</button>
        <button className='delete-button' onClick={() => handleDelete(item)}>刪除</button>
      </div>
    </div>
  );
}

export default EditMenuItem;
