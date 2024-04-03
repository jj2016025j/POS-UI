// MenuItem.js
import React, { useState } from 'react';

function MenuItem({ item, onAddToCart }) {
    const [quantity, setQuantity] = useState(0);
  
    const handleAdd = () => {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onAddToCart(item, newQuantity);
    };
  
    const handleSubtract = () => {
      const newQuantity = Math.max(0, quantity - 1);
      setQuantity(newQuantity);
      onAddToCart(item, newQuantity);
    };
  
    return (
      <div>
        <img src={item.image_url} alt={item.MenuItemName} style={{ width: '100px', height: '100px' }} />
        <p>{item.MenuItemName} - ${item.Price}</p>
        <button onClick={handleSubtract}>-</button>
        <span>{quantity}</span>
        <button onClick={handleAdd}>+</button>
      </div>
    );
  }
  

export default MenuItem;
