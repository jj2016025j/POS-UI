import React from 'react';
import AllData from '../components/AllData';
import LastMonthData from '../components/LastMonthData';
import Title from '../components/Title';

function Report() {
    return (
        <React.Fragment>
            <Title />
            <AllData />
            <hr />
            <LastMonthData />
            <br />
        </React.Fragment >
    );
}

export default Report;
