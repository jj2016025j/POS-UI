/**
 * 取得品項並依照分類顯示V
 * 點擊品項+-號會呼叫usecontext幫忙改變購物車內容V
 */
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
    console.log("mainOrderId", mainOrderId,"item", item,"newQuantity", newQuantity)
    addToCart(mainOrderId, item, newQuantity); // 假設 mainOrderId 是這個組件的 prop 或從上層組件獲取
  };

  const handleSubtract = () => {
    const newQuantity = Math.max(0, quantity - 1);
    setQuantity(newQuantity);
    console.log("mainOrderId", mainOrderId,"item", item,"newQuantity", newQuantity)
    addToCart(mainOrderId, item, newQuantity);  // 確保這裡也使用 addToCart 來更新數量
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
