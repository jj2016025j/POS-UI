import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Home from '../page/Home';
import About from '../page/About';
import Contact from '../page/Contact';
import News from '../page/News';
// 其他導入...

function Web() {
    let { path } = useRouteMatch();
    
    return (
        <Switch>
            <Route exact path={`${path}/`} component={Home} />
            <Route path={`${path}/about`} component={About} />
            <Route path={`${path}/contact`} component={Contact} />
            <Route path={`${path}/news`} component={News} />
            {/* 更多web下的子路由 */}
        </Switch>
    );
}

export default Web;
