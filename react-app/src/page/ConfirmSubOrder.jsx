/** 
取得網址訂單號
標題顯示"確認訂單 COMFIRM"
取得當前暫存的購物車內容
顯示桌號
所有品項 圖片 名稱 數量 總價
所有品項的總價

然後有一個送出訂單的按鈕
按下後會跳出 "確認送出訂單嗎?"
確認後會發送請求
成功後會返回首頁
 <Route exact path={`/pos`} component={PosHome} />
*/

import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function ConfirmSubOrder() {
  const history = useHistory();
  const { mainOrderId } = useParams();
  const { cartItems } = useCart();
  const itemsForCurrentTable = cartItems[mainOrderId] || []; // 假设mainOrderId用于标识不同的购物车

  const totalAmount = itemsForCurrentTable.reduce((total, item) => total + item.quantity * item.Price, 0);

  const handleSubmitOrder = () => {
    const isConfirmed = window.confirm("确认提交订单吗?");
    if (isConfirmed) {
      // 发送订单请求的逻辑
      console.log("发送订单请求", { mainOrderId, cartItems });
      // 假设订单请求成功
      history.push('/pos'); // 成功后导航回首页
    }
  };

  return (
    <div>
      <h1>确认订单 CONFIRM</h1>
      {/* <p>桌号: {tableNumber}</p> */}
      {itemsForCurrentTable.map((item, index) => (
        <div key={index}>
          <img src={item.image_url} alt={item.MenuItemName} style={{ width: '50px' }} />
          <p>{item.MenuItemName}: {item.quantity} x ${item.Price} = ${item.quantity * item.Price}</p>
        </div>
      ))}
      <h3>总计: ${totalAmount}</h3>
      <button onClick={handleSubmitOrder}>提交订单</button>
    </div>
  );
}

export default ConfirmSubOrder;
