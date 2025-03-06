/**
 * 取得網址中的主訂單號
 * 取得該訂單內容 傳給主訂單及子訂單組件V
 * 
 * 前往結帳按鈕 跳轉至結帳畫面V
 * 提供跳轉至點餐頁面的功能V
 * 
 * 以下還沒做UNDO
 * 
 * 取消訂單
 * 編輯訂單按鈕 讓所有訂單狀態為"待確認"的訂單的編輯或刪除按鈕顯示
 * 儲存變更按鈕 送出變更 會發送子訂單更新請求 會跳出成功或失敗的訊息
 * 取消編輯按鈕 讓所有編輯或刪除按鈕隱藏
 * 編輯及刪除按鈕預設隱藏
 */

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Title from '../../components/Title';

function ViewOrder() {
  const { mainOrderId } = useParams();
  const history = useHistory();
  const [orderDetails, setOrderDetails] = useState({ mainOrder: null, subOrders: [] });

  useEffect(() => {
    axios.post(`/mainOrder/getMainOrderInfo`, { mainOrderId })
      .then(main_response => {
        axios.post(`/subOrder/getSubOrderInfo`, { mainOrderId })
          .then(sub_response => {

            // 确保响应中包含mainOrder和subOrders，如果没有则设置为null或空数组
            setOrderDetails({
              mainOrder: main_response.data || null,
              subOrders: sub_response.data || []
            });
          })
      })
      .catch(error => {
        console.error("Error fetching order details:", error);
        setOrderDetails({ mainOrder: null, subOrders: [] }); // 请求失败或找不到订单时的处理
      });
  }, [mainOrderId]);

  if (!orderDetails.mainOrder) {
    return (
      <React.Fragment>
        <Title />
        <div>Loading......</div>
      </React.Fragment>
    );
  }

  const goToCheckout = () => history.push(`/checkout/${mainOrderId}`);
  const goToOrderPage = () => history.push(`/order/${mainOrderId}`);

  const handleEditSubOrder = (subOrderId) => {
    // 编辑子订单的逻辑
  };

  const handleDeleteSubOrder = (subOrderId) => {
    // 删除子订单的逻辑
  };

  // 如果没有找到订单（mainOrder为null）
  if (!orderDetails.mainOrder) {
    return (
      <React.Fragment>
        <Title />
        <div>Order Not Found</div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Title />
      <div className='main-order-group'>
        <div className='main-order'>
          <div className="text-space-between">
            <p>訂單編號：{orderDetails.mainOrder.mainOrderId}</p>
            <p>{orderDetails.mainOrder.createTime}</p>
          </div>
          <p>桌號：{orderDetails.mainOrder.tableNumber}</p>
          <p>小計：${orderDetails.mainOrder.subTotal}</p>
          <p>服務費(10%)：${orderDetails.mainOrder.serviceFee}</p>
          <p>總計：${orderDetails.mainOrder.total}</p>
          <button className='to-checkout' onClick={goToCheckout}>前往結帳</button>
        </div>
        <div className='button-group'>
          <button className='go-to-order' onClick={goToOrderPage}>繼續點餐</button>
          <button className='edit-order' onClick={goToOrderPage}>編輯訂單</button>
          <button className='cancel-order' onClick={goToOrderPage}>取消此訂單</button>
        </div>
      </div>
      <div className='function sub-orders'>
        {orderDetails && orderDetails.subOrders.map(subOrder => (
          <div key={subOrder.SubOrderId} className='sub-order'>
            <div className="text-space-between">
              <p>子訂單編號：</p>
              <p>2024-04-12 18:54:06</p>
            </div>
            <p>{subOrder.SubOrderId}</p>
            {subOrder.OrderStatu != null ? (<p>訂單狀態：{subOrder.OrderStatus}</p>) : (<></>)}
            <p>訂單狀態：{subOrder.OrderStatus}</p>
            <div className="text-space-between">
              <p>桌號: </p>
            </div>
            <div className='text-space-between'>
              <p>小計：</p>
              <p>${subOrder.total ? (subOrder.total) : (0)}</p>
            </div>
            <hr />
            {subOrder.items && subOrder.items.length > 0 ? (subOrder.items.map((item, index) => (
              <React.Fragment key={index}>
                <div className='menu-list-item'>
                  <img src={item.image_url} alt={item.name} style={{ width: '50px', height: '50px' }} />
                  <div className='menu-item-info'>
                    <p>{item.name}</p>
                    <div className='text-space-between'>
                      <p>${item.unit_price}</p>
                      <p>{item.quantity} </p>
                      <p>${item.quantity * item.unit_price}</p>
                    </div>
                  </div>
                </div>
                <hr />
              </React.Fragment>
            ))) : (<></>)}

            {subOrder.OrderStatus === '待確認' && (
              <>
                <button onClick={() => handleEditSubOrder(subOrder.SubOrderId)}>編輯</button>
                <button onClick={() => handleDeleteSubOrder(subOrder.SubOrderId)}>刪除</button>
              </>
            )}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default ViewOrder;

/**
 * 顯示主訂單編號 桌號 建立時間
 * 主訂單內容總計
 * 小費總計 
 * 所有費用總計
 * 
 * 顯示所有子訂單
 * 子訂單編號 桌號 建立時間 訂單狀態
 * 所有子訂單內容顯示 每一個都要包含 圖片 名稱 價格 數量 總計 
 * 子訂單總計
 */
