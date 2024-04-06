import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

function ConfirmSubOrder() {
  const [table, setTable] = useState(null);
  const tableNumber = table ? table.TableNumber : null;
  const history = useHistory();
  const { mainOrderId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const subOrderId = query.get('subOrderId');
  const { cartItems } = useCart();
  const itemsForCurrentTable = cartItems[mainOrderId] || []; // 假设mainOrderId用于标识不同的购物车

  const totalAmount = itemsForCurrentTable.reduce((total, item) => total + item.quantity * item.Price, 0);

  useEffect(() => {

  }, []);

  const handleSubmitOrder = () => {
    const isConfirmed = window.confirm("确认提交订单吗?");
    if (isConfirmed) {
      console.log("发送订单请求", { mainOrderId, cartItems });
      axios.post(`/order/SubOrder/${mainOrderId}`, { cartItems })
        .then(() => {
          alert("送出訂單成功")
          history.push('/pos'); // 成功后导航回首页
        })
        .catch(error => {
          console.error('Error fetching TableId:', error);
        });
    }
  };

  return (
    <div className='function'>
      <div className="outside">
        <div className="comfirm-order-group">
          <div className="sub-order">
            <div className="text-space-between">
              <p>子訂單編號: {subOrderId}</p>
            </div>
            <div className="text-space-between">
              <p>桌號: </p>
            </div>
            <div className="text-space-between">
              <p>2024-04-12 18:54:06</p>
            </div>
            <hr />
            {itemsForCurrentTable.map((item, index) => (
              <React.Fragment>
                <div className='menu-list-item' key={index}>
                  <img src={item.image_url} alt={item.MenuItemName} style={{ width: '50px' }} />
                  <div className='menu-item-info'>
                    <p>{item.MenuItemName}</p>
                    <div className='text-space-between'>
                      <p>{item.quantity} </p>
                      <p>${item.Price}</p>
                      <p>${item.quantity * item.Price}</p>
                    </div>
                  </div>
                </div>
                <hr />
              </React.Fragment>
            ))}
            <div className='text-space-between'>
              <p>總計</p>
              <p>${totalAmount}</p>
            </div>
          </div>
          <button className='send-order-button' onClick={handleSubmitOrder}>送出訂單</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmSubOrder;

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
