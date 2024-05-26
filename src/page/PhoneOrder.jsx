import React from 'react';
import { useParams } from 'react-router-dom';
import Title from '../components/Title';

function Phone() {
  let { trade_no } = useParams();
  {/* 取得後端 */ }

  return (
    <React.Fragment>
      <Title />
      <div>
        <p>Trade Number: {trade_no}</p>
      </div>
    </React.Fragment>
  );
}

export default Phone;