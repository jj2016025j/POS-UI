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
        history.push(`/order/${table.mainOrderId}`);
    };

    const handleNewOrder = () => {
        console.log("發送新訂單請求")
        console.log(table)
        axios.post(`/mainOrder/createNewOrder`, { tableNumber: table.tableNumber })
            .then(response => {
                const updatedTableInfo = response.data;
                updateTable(table.tableNumber, updatedTableInfo);
                console.log("更新桌號資訊")
            })
            .catch(error => {
                console.error('Error creating new order:', error)
                alert('创建新订单失败');
            });

    };

    const handleViewOrder = () => {
        history.push(`/vieworder/${table.mainOrderId}`);
    };

    const handleCheckout = () => {
        history.push(`/checkout/${table.mainOrderId}`);
    };

    const handlePrintQRCode = () => {
        const isConfirmed = window.confirm("確定再次列印QRCODE？");
        if (isConfirmed) {
            axios.post('/printer/printMainOrder', { mainOrderId: table.mainOrderId, TableNumber: table.TableNumber })
                .then(response => alert('列印指令已發送'))
                .catch(error => console.error('Error on print request:', error));
        }
    };

    const handleCleanCompleted = () => {
        axios.post(`/table/cleanTable`, { TableNumber: table.TableNumber, tablesStatus: '空桌' })
            .then(response => {
                const updatedInfo = response.data;
                updateTable(table.tableNumber, updatedInfo);
            })
            .catch(error => console.error('Error updating table status:', error));
    };

    // const checkOutALL = () => {
    //     axios.put(`/pay/checkoutAll`)
    //         .then(response => {
    //             const updatedTableInfo = response.data;
    //             updateTables(updatedTableInfo);
    //         })
    //         .catch(error => console.error('Error updating table status:', error));
    // };

    return (
        <div className='table'>
            <div className={`tablenumber-tablestatus`}>
                <p className={`${table.tablesStatus === "空桌" ? 'table-status-cleaning' : table.tablesStatus === "點餐中" || table.tablesStatus === "清潔中" ? 'table-status-ordering' : 'table-status-other'}`}>{table.tablesStatus}</p>
            </div>
            <p className='table-number'>{table.tableNumber}</p>
            <hr />
            {table.tablesStatus === "空桌" ? (
                <button className='table-button' onClick={handleNewOrder}>建立新訂單</button>
            ) : table.tablesStatus === "清潔中" ? (
                <button className='table-button' onClick={handleCleanCompleted}>清潔完畢</button>
            ) : (
                <button className='table-button' onClick={handleOrder}>前往點餐</button>
            )}
            <hr />
            <button className='table-button' onClick={handleViewOrder} disabled={!table.mainOrderId}>查看訂單</button>
            <hr />
            <button className='table-button' onClick={handleCheckout} disabled={!table.mainOrderId}>結帳</button>
            <hr />
            <button className='table-button' onClick={handlePrintQRCode} disabled={!table.mainOrderId}>列印點餐QRCODE</button>
            {/* <hr />
            <button className='table-button' onClick={() => checkOutALL()}>一鍵結帳</button> */}
        </div>
    );
}

export default Table;