import React from 'react';

function EditMenuItem({ item, onEdit, onDelete }) {
  return (
    <div>
      <img src={item.image_url} alt={item.MenuItemName} style={{ width: '100px', height: '100px' }} />
      <div>品项名称: {item.MenuItemName}</div>
      <div>价格: {item.Price}</div>
      <button onClick={() => onEdit(item)}>编辑</button>
      <button onClick={() => onDelete(item)}>刪除</button>
    </div>
  );
}

export default EditMenuItem;
