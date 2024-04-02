import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PosHome from './page/PosHome';
import Order from './page/Order';
import ViewOrder from './page/ViewOrder';
import ConfirmSubOrder from './page/ConfirmSubOrder';
import PhoneOrder from './page/PhoneOrder';
import PhoneConfirmorder from './page/PhoneConfirmorder';
import PhoneCompleteOrder from './page/PhoneCompleteOrder';
import Edit from './page/Edit';
import Report from './page/Report';
import Checkout from './page/Checkout';
import OrderHistory from './page/OrderHistory';
import RoleManagement from './page/RoleManagement';
import Settings from './page/Settings';

import Nav from './components/Nav';
import Error from './page/Error';
import Header from './components/Header';

import { CartProvider } from './contexts/CartContext';

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Header />
                <Nav />
                <Switch>
                    <Redirect exact from={`/`} to={`/pos`} />
                    <Route exact path={`/pos`} component={PosHome} />
                    <Route path={`/order/:mainOrderId`} component={Order} />
                    <Route path={`/vieworder/:mainOrderId`} component={ViewOrder} />
                    <Route path={`/confirmsuborder/:mainOrderId`} component={ConfirmSubOrder} />
                    <Route path={`/phoneorder/:mainOrderId`} component={PhoneOrder} />
                    <Route path={`/phoneconfirmorder/:mainOrderId`} component={PhoneConfirmorder} />
                    <Route path={`/phoneCompleteOrder/:mainOrderId`} component={PhoneCompleteOrder} />
                    <Route path={`/checkout/:mainOrderId`} component={Checkout} />
                    <Route path={`/orderhistory`} component={OrderHistory} />
                    <Route path={`/editMenuItem`} component={Edit} />
                    <Route path={`/report`} component={Report} />
                    <Route path="/role" component={RoleManagement} />
                    <Route path="/setting" component={Settings} />
                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;