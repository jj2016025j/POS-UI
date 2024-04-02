/**
 * 找到最近的50筆訂單
 * 
 * 顯示標題 訂單歷史 History
 *  
 * 每一筆訂單顯示 訂單編號 桌號 創建時間 總金額 
 * 點擊訂單會跳到查看訂單頁面 /vieworder/:mainOrderId
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get('/order/getrecentorders')
      .then(response => {
        setOrders(response.data); 
      })
      .catch(error => {
        console.error('Error fetching order history:', error);
      });
  }, []);

  const handleOrderClick = (mainOrderId) => {
    // 使用 history.push 来跳转到查看订单页面
    history.push(`/vieworder/${mainOrderId}`);
  };

  return (
    <div>
      <h1>订单历史 History</h1>
      <ul>
        {orders.map(order => (
          <li key={order.MainOrderId} onClick={() => handleOrderClick(order.MainOrderId)}>
            订单编号: {order.MainOrderId}, 桌号: {order.TableId}, 创建时间: {new Date(order.CreateTime).toLocaleString()}, 总金额: ${order.Total}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderHistory;
