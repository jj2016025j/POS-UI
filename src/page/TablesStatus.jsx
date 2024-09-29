/**
 * 取得當前桌號狀態並丟給各桌組件V
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import Title from '../components/Title';

function TablesStatus() {
    const [tables, setTables] = useState([]);
    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = () => {
        axios.get('/order/getAllTableStatus')
            .then(response => setTables(response.data))
            .catch(error => {
                console.error('Error fetching tables status:', error);
                alert('无法获取桌位状态，请检查网络连接');
            });
    };

    const updateTable = (tableId, updatedInfo) => {
        setTables(tables => tables.map(table =>
            table.Id === tableId ? { ...table, ...updatedInfo } : table
        ));
    };

    return (
        <React.Fragment>
            <Title />
            <div className='tables'>
                {tables.map(table => (
                    <Table key={table.Id} table={table} updateTable={updateTable} updateTables={fetchTables} />
                ))}
            </div>
        </React.Fragment>
    );
}

export default TablesStatus;
