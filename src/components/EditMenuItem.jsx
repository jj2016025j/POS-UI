// EditMenuItem.jsx
import React from 'react';
import axios from 'axios';
import MenuItemInfo from './MenuItemInfo';

function EditMenuItem({ item, setMenuData }) {

  /**
   * 編輯按鈕會讓編輯區的內容變為當前品項內容
   * 刪除按鈕會跳出是否刪除該品項的提示訊息
   * 確認後會發送請求
   * 如果成功就刷新
   */

  // const handleEdit = (item) => {
  //     // 设置当前正在编辑的菜单项
  //     setEditingItem({ ...item });
  //     editingItem
  // };

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

  const onEdit = (item) => {
    // Logic to set the item in an edit form
    console.log('Editing', item);
  };

  return (
    <div className='menuItem'>
      <MenuItemInfo item={item} />
      <button onClick={() => onEdit(item)}>编辑</button>
      <button onClick={() => handleDelete(item)}>删除</button>
    </div>
  );
}

export default EditMenuItem;
