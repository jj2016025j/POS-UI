/**
 * 取得當前桌號狀態並丟給各桌組件V
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/Table';

function TablesStatus() {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        axios.get('/order/getAllTableStatus')
            .then(response => setTables(response.data))
            .catch(error => {
                console.error('Error fetching tables status:', error);
                alert('無法獲取桌位狀態，請檢查網路連接');
            });
    }, []);

    const updateTable = (tableId, updatedInfo) => {
        setTables(tables => tables.map(table => 
            table.Id === tableId ? { ...table, ...updatedInfo } : table
        ));
    };

    const updateTables = (updatedInfo) => {
        setTables(updatedInfo);
    };

    return (
        <div className='wrap'>
            {tables.map(table => (
                <Table key={table.Id} table={table} updateTable={updateTable} updateTables={updateTables}/>
            ))}
        </div>
    );
}

export default TablesStatus;
