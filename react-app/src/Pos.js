import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Order from '../components/pos/Order';
import Report from '../components/pos/Report';
import Edit from '../components/pos/Edit';
// 其他導入...

function Pos() {
    let { path } = useRouteMatch();
    
    return (
        <Switch>
            <Route path={`${path}/order`} component={Order} />
            <Route path={`${path}/report`} component={Report} />
            <Route path={`${path}/edit`} component={Edit} />
            {/* 更多pos下的子路由 */}
        </Switch>
    );
}

export default Pos;
