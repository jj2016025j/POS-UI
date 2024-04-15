import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import Home from '../POS-UI/src/page/forWeb/Home';
import News from '../POS-UI/src/page/forWeb/News';
// import Menu_Base from '../page/forWeb/Menu_Base';
// import Menu_Meat from '../page/forWeb/Menu_Meat';

import About from '../POS-UI/src/page/forWeb/AboutUs';
import Contact from '../POS-UI/src/page/forWeb/ContactUs';

import Nav from '../POS-UI/src/components/forWeb/Nav';
import Footer from '../POS-UI/src/components/forWeb/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

// 其他導入...

function Web() {
    let { path } = useRouteMatch();
    console.log(path);
    return (
        <React.Fragment>
            <Nav />
            <Switch>
                <Redirect from={`${path}/`} to={`${path}/home`} />
                <Route exact path={`${path}/home`} component={Home} />
                <Route path={`${path}/about`} component={About} />
                <Route path={`${path}/contact`} component={Contact} />
                <Route path={`${path}/news`} component={News} />
                {/* <Route path={`${path}/menu_base`} component={Menu_Base} />
                <Route path={`${path}/menu_meat`} component={Menu_Meat} /> */}
            </Switch>
            <Footer />
        </React.Fragment>
    );
}

export default Web;
