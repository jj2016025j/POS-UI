import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Order from '../page/Order';
import Report from '../page/Report';
import Edit from '../page/Edit';
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
