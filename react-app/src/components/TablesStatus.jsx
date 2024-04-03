import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function TablesStatus() {
    const [tables, setTables] = useState([]);
    let history = useHistory();
    const { updateTableNumber, updateMainOrderId } = useCart();

    useEffect(() => {
        axios.get('/order')
            .then(response => setTables(response.data))
            .catch(error => console.error('Error fetching tables status:', error));
    }, []);

    const handleOrder = (mainOrderId) => {
        history.push(`/order/${mainOrderId}`);
    };

    const handleViewOrder = (mainOrderId) => {
        history.push(`/vieworder/${mainOrderId}`);
    };

    const handleCheckout = (mainOrderId) => {
        history.push(`/checkout/${mainOrderId}`);
    };

    const handlePrintQRCode = (tableNumber) => {
        console.log(`Print QR Code for table ${tableNumber}`);
        const isConfirmed = window.confirm("确定再次列印吗？");
        if (isConfirmed) {
            console.log(`Sending print request for table ${tableNumber}`);
            // 实现发送打印请求的逻辑
            // 要打印的是桌號還是訂單ID的QRCODE
            // sendPrintRequest(mainOrderId); 
            // sendPrintRequest(tableNumber); 
        } else {
            // 用户点击了"否"，不执行任何操作
            console.log("Print cancelled");
        }
    };

    return (
        <div className='tables'>
            {tables.map(table => (
                <ul className='table' key={table.Id}>
                    <li>{table.TableNumber}桌</li>
                    <li>{table.TablesStatus}</li>
                    {table.TablesStatus !== "空桌" && table.TablesStatus !== "清潔中" && (
                        <React.Fragment>
                            <li><buttom onClick={() => handleOrder(table.TableNumber)}>点餐</buttom></li>
                            <li><buttom onClick={() => handleViewOrder(table.TableNumber)}>查看订单</buttom></li>
                            <li><buttom onClick={() => handleCheckout(table.TableNumber)}>结帐</buttom></li>
                            <li><buttom onClick={() => handlePrintQRCode(table.TableNumber)}>列印点餐QR码</buttom></li>
                        </React.Fragment>
                    )}
                </ul>
            ))}
        </div>
    );
}

export default TablesStatus;
