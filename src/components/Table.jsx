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
import axios from 'axios';
import { Button, Card, Dropdown, Space } from 'antd';

function Table({ table, updateTable, updateTables }) {

    const handleNewOrder = () => {
        console.log("發送新訂單請求")
        axios.post(`/order/new-order`, { TableNumber: table.TableNumber })
            .then(response => {
                const updatedTableInfo = response.data;
                updateTable(table.Id, updatedTableInfo);
                console.log("更新桌號資訊")
            })
            .catch(error => {
                console.error('Error creating new order:', error)
                alert('创建新订单失败');
            });

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
                const updatedInfo = response.data;
                updateTable(table.Id, updatedInfo);
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

    const items = [
        {
            key: '1',
            label: (
                <>
                    {table.TablesStatus === "空桌" ? (
                        <button className='table-button' onClick={handleNewOrder}>建立新訂單</button>
                    ) : table.TablesStatus === "清潔中" ? (
                        <button className='table-button' onClick={handleCleanCompleted}>清潔完畢</button>
                    ) : (
                        <a rel="noopener noreferrer" href={`/order/${table.MainOrderId}`}>
                            前往點餐
                        </a>
                    )}
                </>
            ),
        },
        {
            key: '2',
            label: (
                <a rel="noopener noreferrer" href={`/vieworder/${table.MainOrderId}`}>
                    <button className='table-button' disabled={!table.MainOrderId}>查看訂單</button>
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a rel="noopener noreferrer" href={`/checkout/${table.MainOrderId}`}>
                    <button className='table-button' disabled={!table.MainOrderId}>前往結帳</button>
                </a>
            ),
        },
        {
            key: '4',
            label: (
                <a rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    <button className='table-button' onClick={handlePrintQRCode} disabled={!table.MainOrderId}>列印QRCode</button>
                </a>
            ),
        },
    ];

    return (
        <Card align='center' className='table center'>
            <Space align='center' direction="vertical">
                <div className={`tablenumber-tablestatus`}>
                    <p className={`${table.TablesStatus === "空桌" ? 'table-status-cleaning' : table.TablesStatus === "點餐中" || table.TablesStatus === "清潔中" ? 'table-status-ordering' : 'table-status-other'}`}>{table.TablesStatus}</p>
                </div>
                <p className='table-number'>{table.TableNumber}</p>
                <Dropdown menu={{ items }} placement="bottom" >
                    <Button className='table-button'>功能</Button>
                </Dropdown>
                <Button className='table-button' onClick={() => checkOutALL()}>一鍵結帳</Button>
            </Space>
        </Card>
    );
}

export default Table;