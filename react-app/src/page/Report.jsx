import React from 'react';
import AllData from '../components/AllData';
import LastMonthData from '../components/LastMonthData';

function Report() {
    return (
        <React.Fragment>
            <h1>Report</h1>
            <AllData />
            <hr />
            <LastMonthData />
            <br />
        </React.Fragment >
    );
}

export default Report;
