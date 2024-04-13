/**
 * 取得當前桌號狀態並顯示
 * 建立訂單V、清潔完畢V
 * 前往點餐V
 * 查看訂單V
 * 結帳V
 * 列印QRCODEV
 * 一鍵結帳V
 */
import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Table({ table, updateTable, updateTables }) {
    let history = useHistory();

    const handleOrder = () => {
        history.push(`/order/${table.MainOrderId}`);
    };

    const handleNewOrder = () => {
        console.log("發送新訂單請求")
        axios.post(`/order/new-order`, { TableNumber: table.TableNumber })
            .then(response => {
                const updatedTableInfo = response.data;
                updateTable(table.Id, updatedTableInfo);
                console.log("更新桌號資訊")
            })
            .catch(error => console.error('Error creating new order:', error));
    };

    const handleViewOrder = () => {
        history.push(`/vieworder/${table.MainOrderId}`);
    };

    const handleCheckout = () => {
        history.push(`/checkout/${table.MainOrderId}`);
    };

    const handlePrintQRCode = () => {
        const isConfirmed = window.confirm("確定再次列印QRCODE？");
        if (isConfirmed) {
            axios.post('/order/printQRcode', { MainOrderId: table.MainOrderId, TableNumber: table.TableNumber })
                .then(response => alert('列印指令已發送'))
                .catch(error => console.error('Error on print request:', error));
        }
    };

    const handleCleanCompleted = () => {
        axios.post(`/order/clean-table`, { TableNumber: table.TableNumber, TablesStatus: '空桌' })
            .then(response => {
                alert('桌子已清潔完畢');
            })
            .catch(error => console.error('Error updating table status:', error));
    };

    const checkOutALL = () => {
        axios.put(`/pay/checkoutAll`)
            .then(response => {
                const updatedTableInfo = response.data;
                updateTables(updatedTableInfo);
            })
            .catch(error => console.error('Error updating table status:', error));
    };

    return (
        <div className='table'>
            <div className={`tablenumber-tablestatus`}>
                <p className={`${table.TablesStatus === "空桌" ? 'table-status-cleaning' : table.TablesStatus === "點餐中" || table.TablesStatus === "清潔中" ? 'table-status-ordering' : 'table-status-other'}`}>{table.TablesStatus}</p>
            </div>
            <p className='table-number'>{table.TableNumber}</p>
            <hr />
            {table.TablesStatus === "空桌" ? (
                <button className='table-button' onClick={handleNewOrder}>建立新訂單</button>
            ) : table.TablesStatus === "清潔中" ? (
                <button className='table-button' onClick={handleCleanCompleted}>清潔完畢</button>
            ) : (
                <button className='table-button' onClick={handleOrder}>前往點餐</button>
            )}
            <hr />
            <button className='table-button' onClick={handleViewOrder} disabled={!table.MainOrderId}>查看訂單</button>
            <hr />
            <button className='table-button' onClick={handleCheckout} disabled={!table.MainOrderId}>結帳</button>
            <hr />
            <button className='table-button' onClick={handlePrintQRCode} disabled={!table.MainOrderId}>列印點餐QRCODE</button>
            <hr />
            <button className='table-button' onClick={() => checkOutALL()}>一鍵結帳</button>
        </div>
    );
}

export default Table;