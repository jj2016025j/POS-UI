import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PosHome from './page/PosHome';
import Order from './page/Order';
import Phone from './page/Phone';
import Edit from './page/Edit';
import Report from './page/Report';
import Confirmpayment from './page/Confirmpayment';
import PosNav from './components/PosNav';
import Error from './page/Error';
import Header from './components/Header';


function App() {
    return (
        <BrowserRouter>
            <Header />
            <PosNav />
            <Switch>
                <Redirect exact from={`/`} to={`/pos`} />
                <Route exact path={`/pos`} component={PosHome} />
                <Route path={`/pos/order/:trade_no`} component={Order} />
                <Route path={`/pos/phone/:trade_no`} component={Phone} />
                <Route path={`/pos/edit`} component={Edit} />
                <Route path={`/pos/report`} component={Report} />
                <Route path={`/pos/confirmpayment/:trade_no`} component={Confirmpayment} />
                <Route component={Error} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;