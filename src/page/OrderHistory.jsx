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
import TableAlpha from '../components/TableAlpha';

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
    console.log(mainOrderId)
    // 使用 history.push 来跳转到查看订单页面
    if(mainOrderId)
    history.push(`/vieworder/${mainOrderId}`);
  };

  const columns = [
    {
      title: '名稱',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      sorter: true,
      width: 100,
    },
    {
      title: '網址',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      sorter: true,
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      filters: [
        { text: '在線', value: 'online' },
        { text: '離線', value: 'offline' },
      ],
      width: 80,
    },
    {
      title: '自動錄影',
      dataIndex: 'auto_record',
      key: 'auto_record',
      align: 'center',
      width: 100,
      filters: [
        { text: '自動錄影', value: 'true' },
        { text: '不自動錄影', value: 'false' },
      ],
    },
    {
      title: '其他選項',
      key: 'options',
      align: 'center',
      width: 100,
    },
    {
      title: '操作',
      key: 'operate',
      align: 'center',
      width: 100,
    }]

  return (
    <React.Fragment>
      <Title />
      <TableAlpha
        rowKey='id'
        columns={columns}
        dataSource={orders}
        onRow={(record) => ({
            onClick: () => handleOrderClick(record), // 點擊行時觸發的事件
        })}
      />
      {/* <div className='function'>
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
      </div> */}
    </React.Fragment>
  );
}

export default OrderHistory;
