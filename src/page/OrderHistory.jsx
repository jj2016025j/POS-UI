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
import Title from '../components/Title';

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
    <React.Fragment>
      <Title />
      <div className='function'>
        <div className='wrap'>
          {orders.map(order => (
            <li className='history-order' key={order.MainOrderId} onClick={() => handleOrderClick(order.MainOrderId)}>
              <div className='text-space-between'>
                <p>訂單編號 : {order.MainOrderId} </p>
                <p>桌號 : {order.TableId}</p>
              </div>
              <div className='text-space-between'>
                <p>{new Date(order.CreateTime).toLocaleString()}</p>
                <p>總金額 : ${order.Total}</p>
              </div>
            </li>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default OrderHistory;
