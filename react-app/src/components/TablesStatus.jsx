import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function TablesStatus() {
    const [tables, setTables] = useState([]);
    let history = useHistory();

    useEffect(() => {
        axios.get('/order/getAllMainOrder')
            .then(response => setTables(response.data))
            .catch(error => console.error('Error fetching tables status:', error));
    }, []);

    const handleOrder = (mainOrderId) => {
        history.push(`/order/${mainOrderId}`);
    };

    const handleNewOrder = (TableNumber) => {
        axios.post(`/order/new-order`, { TableNumber })
            .then(response => {
                const updatedTableInfo = response.data;
                setTables(tables => tables.map(table =>
                    table.TableNumber === TableNumber ? { ...table, ...updatedTableInfo } : table
                ));
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
        const isConfirmed = window.confirm("确定再次列印吗？");
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

    return (
        <div className='wrap'>
            {tables.map(table => (
                <div className='table' key={table.Id}>
                    <div className='text-space-between'>
                        <p>{table.TableNumber}桌</p>
                        <p>{table.TablesStatus}</p>
                    </div>
                    <hr />
                    {table.TablesStatus === "空桌" ? (
                        <button onClick={() => handleNewOrder(table.TableNumber)}>建立新訂單</button>
                    ) : table.TablesStatus === "清潔中" ? (
                        <React.Fragment>
                            <button onClick={() => handleCleanCompleted(table.TableNumber)}>清潔完畢</button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <button onClick={() => handleOrder(table.MainOrderId)}>前往點餐</button>
                        </React.Fragment>
                    )}
                    <hr />
                    <button onClick={() => handleViewOrder(table.MainOrderId)} disabled={!table.MainOrderId}>查看訂單</button>
                    <hr />
                    <button onClick={() => handleCheckout(table.MainOrderId)} disabled={!table.MainOrderId}>結帳</button>
                    <hr />
                    <button onClick={() => handlePrintQRCode(table.MainOrderId, table.TableNumber)} disabled={!table.MainOrderId}>列印點餐QRCODE</button>
                </div>
            ))}
        </div>
    );
}

export default TablesStatus;
