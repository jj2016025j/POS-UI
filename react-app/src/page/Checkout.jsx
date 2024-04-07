/**
 * 取得主訂單 by id
 * 顯示訂單編號 創建時間
 * 桌號
 * subtotal
 * tax
 * total
 * 查看訂單按鈕 返回查看訂單頁面
 * 
 * 信用卡支付按鈕 (目前設為不啟用)
 * line pay 按鈕 按下後會顯示"請前往確認LINE PAY商家端是否收到正確金額" 按下是會發送結帳請求
 * 現金結帳按鈕 會發送現金結帳請求
 * 以上結帳功能成功後會跳出結帳成功通知 按下確認會跳轉至首頁 或是預設三秒後會跳轉
 * 
 * 下面做一個簡易的計算機
 * 有一個輸入框可以顯示及輸入金額
 * 一個找零的欄位 左邊顯示找零 右邊顯示金額
 * 一個自動輸入等於訂單總額的按鈕
 * 然後下面是數字鍵跟 + - * / = 等按鍵
 */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function Confirmpayment() {
  let { mainOrderId } = useParams();
  const history = useHistory();
  const [orderDetails, setOrderDetails] = useState(null);
  const [inputAmount, setInputAmount] = useState('');
  const [change, setChange] = useState(0);

  useEffect(() => {
    // 假设的API请求URL，请根据实际情况调整
    axios.get(`/order/getMainOrder/${mainOrderId}`)
      .then(response => {
        setOrderDetails(response.data);
      })
      .catch(error => console.error("Error fetching order details:", error));
  }, [mainOrderId]);

  // 這裡要顯示是或否
  // 選擇是就會跳結帳成功
  // 然後按下確認或是等三秒就會返回首頁
  // 发送结账请求的逻辑

  const handleViewOrder = (mainOrderId) => {
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
    // 使用window.confirm替代alert来询问用户是否确认
    const isConfirmed = window.confirm("請前往確認LINE PAY商家端是否收到正確金額");
    setTimeout(() => {
      history.push('/');
    }, 3000);

    if (isConfirmed) {
      // 用户选择了“是”，立即进行结账处理并跳转
      alert("结账成功！");
      history.push('/'); // 立即跳转
    }
  };

  const handleCalculatorInput = (value) => {
    if (value === '=') {
      const result = eval(inputAmount);
      setInputAmount(String(result));
      const total = orderDetails ? orderDetails.Total : 0;
      setChange(result - total);
    } else {
      setInputAmount(inputAmount + value);
    }
  };

  const autoFillTotalAmount = () => {
    if (orderDetails) {
      setInputAmount(String(orderDetails.Total));
    }
  };

  return (
    <div>
      {orderDetails && (
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
      )}
      <button onClick={handleCashPayment}>現金結帳</button>
      <button onClick={handleLinePay}>LINE PAY</button>
      <button disabled>信用卡支付</button>
      <button onClick={handleViewOrder}>查看訂單</button>
      <div>
        <input value={inputAmount} onChange={(e) => setInputAmount(e.target.value)} />
        <div className="text-space-between">
          <p>找零:</p>
          <p>${change}</p>
        </div>
        <button onClick={autoFillTotalAmount}></button>
        {/* 数字键和操作符 */}
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '=', 'C'].map(key => (
          <button key={key} onClick={() => handleCalculatorInput(key)}>{key}</button>
        ))}
      </div>
    </div>
  );
}

export default Confirmpayment;
