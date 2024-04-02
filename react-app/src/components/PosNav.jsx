import React from 'react';
import { NavLink } from 'react-router-dom';

function PosNav() {

  return (
    <div>
      <h1>PosNav</h1>
      <NavLink className="nav-link active" aria-current="page" to="/pos"><b>首頁</b></NavLink>
      <NavLink className="nav-link active" aria-current="page" to="/history"><b>訂單歷史</b></NavLink>
      <NavLink className="nav-link active" aria-current="page" to="/pos/edit"><b>品項管理</b></NavLink>
      <NavLink className="nav-link active" aria-current="page" to="/pos/report"><b>後臺數據</b></NavLink>
      <NavLink className="nav-link active" aria-current="page" to="/pos/role"><b>權限管理</b></NavLink>
      <NavLink className="nav-link active" aria-current="page" to="/pos/setting"><b>設定</b></NavLink>
    </div>
  );
}

export default PosNav;