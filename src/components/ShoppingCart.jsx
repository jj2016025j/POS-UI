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
      return;
    }

    let subOrderId; // 先宣告變數，讓後面的 .then() 也能存取

    // 1️⃣ 先建立子訂單
    axios.post(`/subOrder/createSubOrder`, { mainOrderId })
      .then((response) => {
        subOrderId = response.data.subOrderId;
        console.log(`新建訂單成功，訂單ID: ${subOrderId}`);

        // 構造訂單內容
        const orderData = {
          subOrderId,
          orderStatus: "製作中",
          menuItems: SubOrderInfo.items.map(item => ({
            menuItemId: item.id,
            quantity: item.quantity
          }))
        };

        // 2️⃣ 更新子訂單內容
        return axios.post(`/subOrder/editSubOrder`, orderData);
      })
      .then(() => {
        console.log("訂單內容更新成功");

        // 3️⃣ 跳轉到確認訂單頁面
        history.push(`/confirmsuborder/${mainOrderId}?subOrderId=${subOrderId}`);
      })
      .catch(error => {
        console.error('Error 訂單處理失敗:', error);
      });
  };


  return (
    <React.Fragment>
      <SubTitle />
      <div className='cart-list-group'>
        <div>
          {SubOrderInfo.items && SubOrderInfo.items.length > 0 ? (
            SubOrderInfo.items.map(item => (
              <div key={item.Id}>
                <p>{item.menuItemName}: {item.quantity} x ${item.price} = ${item.quantity * item.price}</p>
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
    </React.Fragment>
  );
}

export default ShoppingCart;
