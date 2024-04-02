import React from 'react';
import { useParams } from 'react-router-dom';

function Confirmpayment() {
  let { trade_no } = useParams();
      {/* 取得後端 */}

  return (
    <div>
      <h1>Order</h1>
      <p>Trade Number: {trade_no}</p>
    </div>
  );
}

export default Confirmpayment;