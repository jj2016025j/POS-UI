import React from 'react';
import TablesStatus from '../components/TablesStatus';

function PosHome() {

  return (
    <React.Fragment>
      <div className="title-group">
        <h1 className='title'>選擇桌號 Choose table</h1>
      </div>
      <div className="function">
        <TablesStatus />
      </div>
    </React.Fragment>
  );
}

export default PosHome;

