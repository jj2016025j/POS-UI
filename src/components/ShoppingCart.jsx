/**
 * 取得當前訂單
 * 
 * 顯示當前品項內容V
 * 跳轉至確認訂單頁面V
 */
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import SubTitle from '../components/SubTitle';

import { useCart } from '../contexts/CartContext';

function ShoppingCart() {
  const history = useHistory();

  const { mainOrderId } = useParams();
  const { getSubOrderInfo } = useCart();

  const SubOrderInfo = getSubOrderInfo(mainOrderId);
  // console.log("SubOrderInfo",SubOrderInfo)
  // console.log("SubOrderInfo",SubOrderInfo)

  const handleConfirmOrder = () => {
    if (SubOrderInfo.items.length === 0) {
      alert("購物車是空的，請添加品項後再確認訂單。");
    } else {
      axios.post(`/order/addSubOrder/${mainOrderId}`)
        .then((response) => {
          const subOrderId = response.data.SubOrderId;
          console.log(`新建訂單成功，訂單ID: ${subOrderId}`);
          history.push(`/confirmsuborder/${mainOrderId}?subOrderId=${subOrderId}`);
        })
        .catch(error => {
          console.error('Error fetching TableId:', error);
        });
    }
  };

  return (
    <aside>
      <SubTitle />
      <div className='cart-list-group'>
        <div>
          {SubOrderInfo.items && SubOrderInfo.items.length > 0 ? (
            SubOrderInfo.items.map(item => (
              <div key={item.Id}>
                <p>{item.MenuItemName}: {item.quantity} x ${item.Price} = ${item.quantity * item.Price}</p>
              </div>
            ))
          ) : (
            <p>訂單為空</p>
          )}
        </div>
      </div>
      <div className='cart-total-group'>
        <div className='text-space-between'>
          <p>TOTAL</p>
          <p>${SubOrderInfo.total ? (SubOrderInfo.total) : (0)}</p>
        </div>
        <button className='confirm-order-button' onClick={handleConfirmOrder}>確認訂單</button>
      </div>
    </aside >
  );
}

export default ShoppingCart;
