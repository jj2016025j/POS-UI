import React from 'react';
import { NavLink } from 'react-router-dom';
import TablesStatus from '../components/TablesStatus';

function PosHome() {

  return (
    <div>
      <h1>POS System</h1>
      <NavLink className="nav-link active" aria-current="page" to="/pos/order/1"><b>櫃台點餐</b></NavLink>
      <NavLink className="nav-link active" aria-current="page" to="/pos/phone/2"><b>手機點餐</b></NavLink>
      <TablesStatus />
    </div>
  );
}

export default PosHome;

