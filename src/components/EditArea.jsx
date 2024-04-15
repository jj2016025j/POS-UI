import React from 'react';
import { useHistory } from 'react-router-dom';
function EditArea() {

    // function ShoppingCart({ SubOrderInfo, mainOrderId }) {
    //     const history = useHistory();
    //     const totalAmount = SubOrderInfo.reduce((total, item) => total + (item.quantity * item.Price), 0);

    //     const handleConfirmOrder = () => {
    //         history.push(`/confirmsuborder/${mainOrderId}`);
    //     };

    // const handleDelete = (itemId) => {
    //     if (window.confirm("确定要删除这个菜单项吗？")) {
    //         axios.delete(`http://localhost:8080/menu/items/${itemId}`)
    //             .then(() => {
    //                 // 提示删除成功并重新加载数据或移除该项
    //                 alert("菜单项删除成功");
    //                 setMenuData(prevData => ({
    //                     ...prevData,
    //                     menuItems: prevData.menuItems.filter(item => item.Id !== itemId)
    //                 }));
    //             })
    //             .catch(error => {
    //                 console.error('Deleting item error: ', error);
    //             });
    //     }
    // };

    // const handleSave = (editedItem) => {
    //     // 假设这是发送更新请求到后端的操作
    //     console.log("Saving edited item:", editedItem);
    //     // 这里应该包含实际的保存逻辑
    //     // 成功后的操作
    //     setEditingItem(null); // 清除编辑状态
    // };

    return (
        <React.Fragment>
            <h2>品項編輯</h2>
            {/* <img src={editingItem.image_url} alt={editingItem.MenuItemName} style={{ width: '100px', height: '100px' }} />

                <input
                    type="text"
                    name="image_url"
                    value={editingItem.image_url}
                    placeholder="图片URL"
                />
                <input
                    type="text"
                    name="MenuItemName"
                    value={editingItem.MenuItemName}
                    placeholder="品项名称"
                />
                <input
                    type="number"
                    name="Price"
                    value={editingItem.Price}
                    placeholder="价格"
                />
                <select
                    name="CategoryId"
                    value={editingItem.CategoryId}
                >
                    {menuData.categories.map(category => (
                        <option key={category.Id} value={category.Id}>
                            {category.CategoryName}
                        </option>
                    ))}
                </select> */}
            {/* <button onClick={handleSave}>保存</button>
                <button onClick={handleDelete}>刪除</button> */}
        </React.Fragment >
    );
}

export default EditArea;
