import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {

  return (
    <div>
      <h1>Nav</h1>
      <NavLink className="nav-link active" aria-current="page" to="/pos"><b>首頁</b></NavLink>
      <NavLink className="nav-link active" aria-current="page" to="/orderhistory"><b>訂單歷史</b></NavLink>
      <NavLink className="nav-link active" aria-current="page" to="/editMenuItem"><b>品項管理</b></NavLink>
      <NavLink className="nav-link active" aria-current="page" to="/report"><b>後臺數據</b></NavLink>
      <NavLink className="nav-link active" aria-current="page" to="/role"><b>權限管理</b></NavLink>
      <NavLink className="nav-link active" aria-current="page" to="/setting"><b>設定</b></NavLink>
    </div>
  );
}

export default Nav;