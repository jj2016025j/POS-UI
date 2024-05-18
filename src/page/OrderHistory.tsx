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
import Title from '../components/Title';
import { Table, Button } from 'antd';
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
    history.push(`/vieworder/${mainOrderId}`);
  };

  const columns = [
    {
      title: '訂單編號',
      dataIndex: 'MainOrderId',
      showSorterTooltip: { target: 'full-header' },
      sorter: (a, b) => a.MainOrderId - b.MainOrderId,
    },
    {
      title: '桌號',
      dataIndex: 'TableId',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.TableId - b.TableId,
    },
    {
      title: '總金額',
      dataIndex: 'Total',
      sorter: (a, b) => a.Total - b.Total,
    },
    {
      title: '操作',
      dataIndex: 'MainOrderId',
      key: 'MainOrderId',
      render: (MainOrderId) => <Button onClick={() => handleOrderClick(MainOrderId)}>查看訂單</Button>,
    },
    {
      title: '創建時間',
      dataIndex: 'CreateTime',
      sorter: (a, b) => a.CreateTime - b.CreateTime,
      render: (CreateTime) => {
        return Date(CreateTime).toLocaleString()
      }
    },
  ];


  return (
    <React.Fragment>
          <Title />
          <Table
            columns={columns}
            dataSource={orders}
            showSorterTooltip={{ target: 'sorter-icon' }}
          />

    </React.Fragment>
  );
}

export default OrderHistory;
