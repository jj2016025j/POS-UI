import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Home from '../page/Home';
import News from '../page/News';
import About from '../page/AboutUs';
import Contact from '../page/Contact';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

// 其他導入...

function Web() {
    let { path } = useRouteMatch();

    return (
        <Switch>
            <Header />
            <Nav />
            <Route exact path={`${path}/`} component={Home} />
            <Route path={`${path}/about`} component={About} />
            <Route path={`${path}/contact`} component={Contact} />
            <Route path={`${path}/news`} component={News} />
            {/* 更多web下的子路由 */}
            <Footer />
        </Switch>
    );
}

export default Web;
