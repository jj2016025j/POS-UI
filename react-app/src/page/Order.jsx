import React from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Order() {
    let { trade_no } = useParams();
    {/* 取得後端 */ }

    return (
        <div>
            <h1>Order</h1>
            <p>Trade Number: {trade_no}</p>
            <NavLink className="nav-link active" aria-current="page" to={`/pos/confirmpayment/${trade_no}`}><b>付款頁面</b></NavLink>
        </div>
    );
}

export default Order;