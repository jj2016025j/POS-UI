/**
 * 取得品項並依照分類顯示DONE
 * 點擊品項+-號會呼叫usecontext幫忙改變購物車內容DONE
 * 要讀取購物車情況顯示數量UNDO
 */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import MenuItemInfo from './MenuItemInfo';

import { useCart } from '../contexts/CartContext';

function MenuItem({ item }) {
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCart();
  const { mainOrderId } = useParams();

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart(mainOrderId, item, newQuantity);
  };

  const handleSubtract = () => {
    const newQuantity = Math.max(0, quantity - 1);
    setQuantity(newQuantity);
    addToCart(mainOrderId, item, newQuantity);
  };

  return (
    <div className='menuItem'>
      <MenuItemInfo item={item} />
      <div className='horizontally'>
        <button className='order-button' onClick={handleSubtract}>-</button>
        <span>{quantity}</span>
        <button className='order-button' onClick={handleAdd}>+</button>
      </div>
    </div>
  );
}


export default MenuItem;
