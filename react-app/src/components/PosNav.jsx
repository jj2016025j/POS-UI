import React from 'react';
import { NavLink } from 'react-router-dom';

function PosNav() {

  return (
    <div>
      <h1>PosNav</h1>
      <NavLink className="nav-link active" aria-current="page" to="/pos"><b>首頁</b></NavLink>
      <NavLink className="nav-link active" aria-current="page" to="/pos/edit"><b>編輯</b></NavLink>
      <NavLink className="nav-link active" aria-current="page" to="/pos/report"><b>後臺數據</b></NavLink>
    </div>
  );
}

export default PosNav;