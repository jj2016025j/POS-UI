import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Home from '../components/web/Home';
import About from '../components/web/About';
import Contact from '../components/web/Contact';
import News from '../components/web/News';
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