import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function MenuItem({ item }) {
  const { mainOrderId } = useParams();
  const [quantity, setQuantity] = useState(0);
  const { updateTableOrder } = useCart();

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateTableOrder(mainOrderId, item, newQuantity);
  };

  const handleSubtract = () => {
    if (quantity > 0) { // 确保商品数量大于0时才执行减少操作
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateTableOrder(mainOrderId, item, newQuantity);
    }
  };

  return (
    <div className='menuItem'>
      <div className='horizontally'>
        <img src={item.image_url} alt={item.MenuItemName} style={{ width: '100px', height: '100px' }} />
        <div className='vertically'>
          <p>{item.MenuItemName}</p>
          <p>${item.Price}</p>
        </div>
      </div>
      <div className='horizontally'>
        <button className='order-button' onClick={handleSubtract} disabled={quantity <= 0}>-</button> {/* 禁用减号按钮当数量为零 */}
        <span>{quantity}</span>
        <button className='order-button' onClick={handleAdd}>+</button>
      </div>
    </div>
  );
}

export default MenuItem;
