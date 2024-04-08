// 應該沒問題 只有一桌結帳過後全部會變成清潔中 其他桌結帳都沒辦法改狀態，不過應該是其他的問題

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function TablesStatus() {
    const [tables, setTables] = useState([]);
    let history = useHistory();

    useEffect(() => {
        getAllTableStatus()
    }, []);

    const getAllTableStatus = () => {
        axios.get('/order/getAllTableStatus')
            .then(response => setTables(response.data))
            .catch(error => {
                setTables(example)
                console.error('Error fetching tables status:', error)
                const isConfirmed = window.confirm("已斷線，是否再次嘗試連線?");
                if (isConfirmed) {
                    getAllTableStatus()
                }
            });
    }

    const handleOrder = (mainOrderId) => {
        history.push(`/order/${mainOrderId}`);
    };

    const handleNewOrder = (TableNumber) => {
        console.log("發送新訂單請求")
        axios.post(`/order/new-order`, { TableNumber })
            .then(response => {
                const updatedTableInfo = response.data;
                console.log(tables)
                console.log(updatedTableInfo)

                setTables(tables => tables.map(table =>
                    table.TableNumber === TableNumber ? { ...table, ...updatedTableInfo } : table
                ));
                console.log(tables)

                console.log("更新桌號資訊")
            })
            .catch(error => console.error('Error creating new order:', error));
    };

    const handleViewOrder = (mainOrderId) => {
        history.push(`/vieworder/${mainOrderId}`);
    };

    const handleCheckout = (mainOrderId) => {
        history.push(`/checkout/${mainOrderId}`);
    };

    const handlePrintQRCode = (MainOrderId, TableNumber) => {
        console.log(`Preparing to send print request for table ${TableNumber}`);
        const isConfirmed = window.confirm("確定再次列印QRCODE？");
        if (isConfirmed) {
            axios.post('/order/printQRcode', { MainOrderId, TableNumber })
                .then(response => alert(response.data.message))
                .catch(error => console.error('Error on print request:', error));
        } else {
            console.log("Print cancelled");
        }
    };

    const handleCleanCompleted = (TableNumber) => {
        axios.post(`/order/clean-table`, { TableNumber, TablesStatus: '空桌' })
            .then(response => {
                const updatedTableInfo = response.data;
                setTables(tables => tables.map(table =>
                    table.TableNumber === TableNumber ? { ...table, ...updatedTableInfo } : table
                ));
            })
            .catch(error => console.error('Error updating table status:', error));
    };

    const checkOutALL = () => {
        axios.put(`/pay/checkoutAll`)
            .then(response => {
                const updatedTableInfo = response.data;
                setTables(updatedTableInfo);
            })
            .catch(error => console.error('Error updating table status:', error));
    };


    return (
        <div className='wrap'>
            {tables.map(table => (
                <div className='table' key={table.Id}>
                    <div className={`tablenumber-tablestatus`}>
                        <p className={`${table.TablesStatus === "空桌" ? 'table-status-cleaning'
                            : table.TablesStatus === "點餐中" || table.TablesStatus === "清潔中" ? 'table-status-ordering'
                                : 'table-status-other'
                            }`}>{table.TablesStatus}</p>
                    </div>
                    <p className='table-number'>{table.TableNumber}</p>
                    <hr />
                    {table.TablesStatus === "空桌" ? (
                        <button className='table-button' onClick={() => handleNewOrder(table.TableNumber)}>建立新訂單</button>
                    ) : table.TablesStatus === "清潔中" ? (
                        <React.Fragment>
                            <button className='table-button' onClick={() => handleCleanCompleted(table.TableNumber)}>清潔完畢</button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <button className='table-button' onClick={() => handleOrder(table.MainOrderId)}>前往點餐</button>
                        </React.Fragment>
                    )}
                    <hr />
                    <button className='table-button' onClick={() => handleViewOrder(table.MainOrderId)} disabled={!table.MainOrderId}>查看訂單</button>
                    <hr />
                    <button className='table-button' onClick={() => handleCheckout(table.MainOrderId)} disabled={!table.MainOrderId}>結帳</button>
                    <hr />
                    <button className='table-button' onClick={() => handlePrintQRCode(table.MainOrderId, table.TableNumber)} disabled={!table.MainOrderId}>列印點餐QRCODE</button>
                    <hr />
                    <button className='table-button' onClick={() => checkOutALL()}>一鍵結帳</button>
                </div>
            ))}
        </div>
    );
}

export default TablesStatus;

let example = [
    { Id: 1, TableNumber: 1, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 2, TableNumber: 2, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 3, TableNumber: 3, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 4, TableNumber: 4, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 5, TableNumber: 5, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 6, TableNumber: 6, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 7, TableNumber: 7, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 8, TableNumber: 8, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 9, TableNumber: 9, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 10, TableNumber: 10, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 11, TableNumber: 11, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 12, TableNumber: 12, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 13, TableNumber: 13, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 14, TableNumber: 14, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 15, TableNumber: 15, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 16, TableNumber: 16, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 17, TableNumber: 17, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 18, TableNumber: 18, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 19, TableNumber: 19, TablesStatus: '空桌', MainOrderId: '' },
    { Id: 20, TableNumber: 20, TablesStatus: '空桌', MainOrderId: '' }
]