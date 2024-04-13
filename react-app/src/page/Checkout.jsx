/**
 * 顯示訂單金額
 * 提供現金結帳按鈕V
 * LINE PAY按鈕UNDO
 * 信勇卡支付按鈕UNDO
 * 跳轉置查看訂單功能V
 * 
 * 找零功能顯示
 * 
 * 送出訂單要清空購物車UNDO
 */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Calculator from '../components/Calculator';

function Confirmpayment() {
  let { mainOrderId } = useParams();
  const history = useHistory();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    axios.get(`/order/getMainOrder/${mainOrderId}`)
      .then(response => {
        setOrderDetails(response.data);
      })
      .catch(error => console.error("Error fetching order details:", error));
  }, [mainOrderId]);

  const handleViewOrder = () => {
    history.push(`/vieworder/${mainOrderId}`);
  };

  const handleCashPayment = () => {
    const isConfirmed = window.confirm("確定結帳?");
    if (isConfirmed) {
      axios.post(`/pay/checkout/${mainOrderId}`)
        .then(() => {
          alert("结账成功！");
          history.push('/');
        })
        .catch(error => {
          // console.error('Error fetching tables status:', error)
          console.log(error.response)
        });
    }
  };

  const handleLinePay = () => {
    const isConfirmed = window.confirm("請前往確認LINE PAY商家端是否收到正確金額");
    if (isConfirmed) {
      // UNDO 結帳請求
      alert("结账成功！");
      history.push('/');
    }
  };

  return (
    <div className='checkout-funtion'>
      <div className='sub-order'>
        {orderDetails ? (
          <>
            <div className="text-space-between">
              <p>Trade Number: {mainOrderId}</p>
              <p>{new Date(orderDetails.CreateTime).toLocaleString()}</p>
            </div>
            <p>桌號: {orderDetails.TableId}</p>
            <p>訂單加總: ${orderDetails.SubTotal}</p>
            <p>小費: ${orderDetails.ServiceFee}</p>
            <p>總金額: ${orderDetails.Total}</p>
          </>
        ) : (
          <>
            <div className="text-space-between">
              <p>Trade Number: 無此訂單</p>
              <p>{new Date().toLocaleString()}</p>
            </div>
            <p>桌號: 無</p>
            <p>訂單加總: 無</p>
            <p>小費: 無</p>
            <p>總金額: 無</p>
          </>
        )}
        <button className='cash-payment' onClick={handleCashPayment}>現金結帳</button>
        <button className='lind-pay' onClick={handleLinePay}>LINE PAY</button>
        <button className='credit-card' disabled>信用卡支付</button>
        <button className='cash-payment' onClick={handleViewOrder}>查看訂單</button>
      </div>
      <Calculator />
    </div>
  );
}

export default Confirmpayment;
