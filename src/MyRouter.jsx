import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import TablesStatus from './page/home/TablesStatus';
import Menu from './page/menu/Menu';
import ViewOrder from './page/viewOrder/ViewOrder';
import ConfirmSubOrder from './page/ConfirmSubOrder';
import PhoneOrder from './page/PhoneOrder';
import PhoneConfirmorder from './page/PhoneConfirmorder';
import PhoneCompleteOrder from './page/PhoneCompleteOrder';
import Edit from './page/edit/Edit';
import ReportPage from './page/ReportPage';
import Checkout from './page/Checkout';
import OrderHistory from './page/history/OrderHistory';
import RoleManagement from './page/RoleManagement';
import Settings from './page/Settings';

import Error from './page/Error';

import ShoppingCart from './components/ShoppingCart';
import EditArea from './page/edit/EditArea';

function MyRouter() {
    const location = useLocation();
    const showAside = location.pathname.startsWith('/order/') || location.pathname === '/editMenuItem';
    console.log("showAside", showAside)
    return (
        <>
            <section>
                <Switch>
                    <Redirect exact from={`/`} to={`/pos`} />
                    <Route exact path={`/pos`} component={TablesStatus} />
                    <Route path={`/order/:mainOrderId`} component={Menu} />
                    <Route path={`/vieworder/:mainOrderId`} component={ViewOrder} />
                    <Route path={`/confirmsuborder/:mainOrderId`} component={ConfirmSubOrder} />
                    <Route path={`/phoneorder/:mainOrderId`} component={PhoneOrder} />
                    <Route path={`/phoneconfirmorder/:mainOrderId`} component={PhoneConfirmorder} />
                    <Route path={`/phoneCompleteOrder/:mainOrderId`} component={PhoneCompleteOrder} />
                    <Route path={`/checkout/:mainOrderId`} component={Checkout} />
                    <Route path={`/orderhistory`} component={OrderHistory} />
                    <Route path={`/editMenuItem`} component={Edit} />
                    <Route path={`/report`} component={ReportPage} />
                    <Route path="/role" component={RoleManagement} />
                    <Route path="/setting" component={Settings} />
                    <Route component={Error} />
                </Switch>
            </section>
            <aside className={`aside ${showAside ? '' : 'display-none'}`}>
                <Switch>
                    <Route path={`/order/:mainOrderId`} component={ShoppingCart} />
                    <Route path={`/editMenuItem`} component={EditArea} />
                    <Route render={() => <div/>} />
                </Switch>
            </aside >
        </>
    );
}

export default MyRouter;
