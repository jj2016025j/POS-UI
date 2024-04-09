import React from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

function ConfirmSubOrder() {
  const history = useHistory();
  const { mainOrderId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const subOrderId = query.get('subOrderId');
  const { TablesInfo } = useCart(); // 使用useCart hook来获取桌子的订单信息

  // 从TablesInfo获取当前桌子的订单项和订单摘要
  const itemsForCurrentTable = TablesInfo[mainOrderId]?.items || [];
  const orderSummary = TablesInfo[mainOrderId]?.summary;

  const handleSubmitOrder = async () => {
    // const isConfirmed = window.confirm("確認提交訂單嗎?");
    // if (isConfirmed) {
      try {
        console.log("發送訂單請求", { subOrderId, itemsForCurrentTable });
        const response = await axios.post(`/order/SubOrder/${subOrderId}`, { items: itemsForCurrentTable });
        alert("送出訂單成功");
        history.push('/pos'); // 成功後導航回首頁
      } catch (error) {
        console.error('Error fetching TableId:', error);
        // 在这里可以添加用户友好的错误提示
        alert("送出訂單失敗，請稍後重試。");
      }
    // }
  };
  

  return (
    <div className='function'>
      <div className="outside">
        <div className="confirm-order-group">
          <div className="sub-order">
            <div className="text-space-between">
              <p>子訂單編號: {subOrderId}</p>
            </div>
            <div className="text-space-between">
              <p>桌号: {mainOrderId}</p> {/* 假设mainOrderId即为桌号 */}
            </div>
            {/* 以下显示时间的部分应根据实际需求调整 */}
            <div className="text-space-between">
              <p>{new Date().toLocaleString()}</p>
            </div>
            <hr />
            {itemsForCurrentTable.map((item, index) => (
              <React.Fragment key={index}>
                <div className='menu-list-item'>
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
              <p>总计</p>
              <p>${orderSummary?.total || 0}</p>
            </div>
          </div>
          <button className='send-order-button' onClick={handleSubmitOrder}>送出訂單</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmSubOrder;
