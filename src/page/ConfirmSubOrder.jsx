/**
 * 取得訂單內容
 * 顯示訂單內容V
 * 提供送出訂單按鈕 送出成功會跳轉到首頁UNDO
 */
import React, { useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
// import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import Title from '../components/Title';

function ConfirmSubOrder() {
  const history = useHistory();
  const { mainOrderId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const subOrderId = query.get('subOrderId');
  const { getSubOrderInfo } = useCart();

  const subOrder = getSubOrderInfo(mainOrderId);
  console.log(subOrder)
  subOrder.subOrderId = subOrderId
  useEffect(() => {

  }, []);

  const handleSubmitOrder = () => {
    console.log("发送订单请求", subOrderId, subOrder);
    // axios.post(`/subOrder/editSubOrder`, subOrder)
    //   .then(() => {
    //     alert("送出訂單成功")
    //     history.push('/pos'); // 成功后导航回首页
    //   })
    //   .catch(error => {
    //     console.error('Error fetching TableId:', error);
    //   });
    alert("送出訂單成功")
    history.push('/pos'); // 成功后导航回首页
    // const isConfirmed = window.confirm("确认提交订单吗?");
    //     if (isConfirmed) {
    //     }
  };

  return (
    <React.Fragment>
      <Title />
      <div className='function'>
        <div className="outside">
          <div className="comfirm-order-group">
            <div className="sub-order">
              <div className="text-space-between">
                <p>子訂單編號: {subOrder.subOrderId}</p>
                <p>2024-04-12 18:54:06</p>
              </div>
              {/* {subOrder.OrderStatu != null ? (<p>訂單狀態：{subOrder.OrderStatus}</p>) : (<></>)}
              <p>訂單狀態：{subOrder.orderStatus}</p>
              <div className="text-space-between">
                <p>桌號: </p>
              </div> */}
              <div className='text-space-between'>
                <p>總計</p>
                <p>${subOrder.total ? (subOrder.total) : (0)}</p>
              </div>
              <hr />
              {subOrder.items && subOrder.items.length > 0 ? (subOrder.items.map((item, index) => (
                <React.Fragment key={index}>
                  <div className='menu-list-item'>
                    <img src={item.image_url} alt={item.menuItemName} style={{ width: '50px' }} />
                    <div className='menu-item-info'>
                      <p>{item.menuItemName}</p>
                      <div className='text-space-between'>
                        <p>{item.quantity} </p>
                        <p>${item.price}</p>
                        <p>${item.quantity * item.price}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))) : (<></>)}
            </div>
            <button className='send-order-button' onClick={handleSubmitOrder}>送出訂單</button>
          </div>
        </div>
      </div>
    </React.Fragment>
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
