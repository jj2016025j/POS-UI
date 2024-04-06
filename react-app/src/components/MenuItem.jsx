// MenuItem.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function MenuItem({ item, onAddToCart }) {
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCart();
  const { mainOrderId } = useParams();

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart(mainOrderId, item, newQuantity); // 假設 mainOrderId 是這個組件的 prop 或從上層組件獲取
  };

  const handleSubtract = () => {
    const newQuantity = Math.max(0, quantity - 1);
    setQuantity(newQuantity);
    onAddToCart(item, newQuantity);
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
        <button className='order-button' onClick={handleSubtract}>-</button>
        <span>{quantity}</span>
        <button className='order-button' onClick={handleAdd}>+</button>
      </div>
    </div>
  );
}


export default MenuItem;
