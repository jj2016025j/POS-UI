import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import SubTitle from '../components/SubTitle';

import { useCart } from '../contexts/CartContext';

function ShoppingCart() {
  const history = useHistory();

  const { mainOrderId } = useParams();
  const { cartItems } = useCart();
  const itemsForTable = cartItems[mainOrderId] || [];
  const totalAmount = itemsForTable.reduce((total, item) => total + item.quantity * item.Price, 0);

  const handleConfirmOrder = () => {
    // 检查购物车是否为空
    if (itemsForTable.length === 0) {
      // 如果购物车为空，则显示警告
      alert("購物車是空的，請添加品項後再確認訂單。");
    } else {
      // 如果购物车不为空，则跳转到确认订单页面
      history.push(`/confirmsuborder/${mainOrderId}`);
    }
  };

  return (
    <aside>
      <SubTitle />
      <div className='cart-list-group'>
        <div>
          {itemsForTable.map(item => (
            <div key={item.Id}>
              <p>{item.MenuItemName}: {item.quantity} x ${item.Price} = ${item.quantity * item.Price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='cart-total-group'>
        <div className='text-space-between'><p>TOTAL</p><p>${totalAmount}</p></div>
        <button className='confirm-order-button' onClick={handleConfirmOrder}>確認訂單</button>
      </div>
    </aside >
  );
}

export default ShoppingCart;
