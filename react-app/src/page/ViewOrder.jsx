/**
 * 取得網址中的主訂單號
 * 發送"查詢主訂單及子訂單資訊"請求
 * 
 * 顯示主訂單編號 桌號 建立時間
 * 主訂單內容總計
 * 小費總計 
 * 所有費用總計
 * 
  * 前往結帳按鈕 跳轉至結帳畫面
  * 
 * 顯示所有子訂單
 * 子訂單編號 桌號 建立時間 訂單狀態
 * 所有子訂單內容顯示 每一個都要包含 圖片 名稱 價格 數量 總計 
 * 子訂單總計
 * 
 * "前往點餐"按鈕
 * 跳轉至/order/:mainOrderId
 * 
 * 編輯訂單按鈕 讓所有訂單狀態為"待確認"的訂單的編輯或刪除按鈕顯示
 * 儲存變更按鈕 送出變更 會發送子訂單更新請求 會跳出成功或失敗的訊息
 * 取消編輯按鈕 讓所有編輯或刪除按鈕隱藏
 * 
 * 編輯及刪除按鈕預設隱藏
 */

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function ViewOrder() {
  const { mainOrderId } = useParams();
  const history = useHistory();
  const [orderDetails, setOrderDetails] = useState({mainOrder: null, subOrders: []});

  useEffect(() => {
    axios.get(`/order/getMainAndSubOrder/${mainOrderId}`)
      .then(response => {
        // 确保响应中包含mainOrder和subOrders，如果没有则设置为null或空数组
        setOrderDetails({
          mainOrder: response.data.mainOrder || null, 
          subOrders: response.data.subOrders || []
        });
      })
      .catch(error => {
        console.error("Error fetching order details:", error);
        setOrderDetails({mainOrder: null, subOrders: []}); // 请求失败或找不到订单时的处理
      });
  }, [mainOrderId]);

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
        <h1>查看訂單 VIEW ORDER</h1>
        <div>Order Not Found</div>
      </React.Fragment>
    );
  }

  return (
    <div>
      <div>
        <h2>Main Order</h2>
        <p>Order Number: {orderDetails.mainOrder.MainOrderId}</p>
        <p>Table Number: {orderDetails.mainOrder.TableId}</p>
        <p>Creation Time: {orderDetails.mainOrder.CreateTime}</p>
        <p>Subtotal: ${orderDetails.mainOrder.SubTotal}</p>
        <p>Service Fee: ${orderDetails.mainOrder.ServiceFee}</p>
        <p>Total: ${orderDetails.mainOrder.Total}</p>
        <button onClick={goToCheckout}>前往結帳</button>
        <button onClick={goToOrderPage}>前往點餐</button>
        <button onClick={goToOrderPage}>取消此訂單</button>
      </div>
      <div>
        <h2>Sub Orders</h2>
        {orderDetails && orderDetails.subOrders.map(subOrder => (
          <div key={subOrder.SubOrderId}>
            <p>Sub Order Number: {subOrder.SubOrderId}</p>
            <p>Status: {subOrder.OrderStatus}</p>
            <p>Creation Time: {subOrder.CreateTime}</p>
            <p>Total: ${subOrder.SubTotal}</p>
            {subOrder.items && subOrder.items.map(item => (
              <div key={item.MenuItemId}>
                <img src={item.image_url} alt={item.name} style={{ width: '50px', height: '50px' }} />
                <p>Name: {item.name}</p>
                <p>Price: ${item.unit_price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.total_price}</p>
              </div>
            ))}
            {subOrder.OrderStatus === '待確認' && (
              <>
                <button onClick={() => handleEditSubOrder(subOrder.SubOrderId)}>编辑</button>
                <button onClick={() => handleDeleteSubOrder(subOrder.SubOrderId)}>删除</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


/**

  * 
 * 顯示所有子訂單
 * 子訂單編號 建立時間 訂單狀態
 * 所有子訂單內容顯示 每一個都要包含 圖片 名稱 價格 數量 總計 
 * 子訂單總計
 * 
 * "前往點餐"按鈕
 * 跳轉至/order/:mainOrderId
 * 
 * 編輯訂單按鈕 讓所有訂單狀態為"待確認"的訂單的編輯或刪除按鈕顯示
 * 儲存變更按鈕 送出變更 會發送子訂單更新請求 會跳出成功或失敗的訊息
 * 取消編輯按鈕 讓所有編輯或刪除按鈕隱藏
 * 
 * 編輯及刪除按鈕預設隱藏
 */
export default ViewOrder;
