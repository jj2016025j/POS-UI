import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Store from './components/Store';
import About from './components/About';
import News from './components/News';
import Contact from './components/Contact';
import Error from './components/Error';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Nav />
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/store" component={Store} />
                    <Route path="/about" component={About} />
                    <Route path="/news" component={News} />
                    <Route path="/contact" component={Contact} />
                    <Route component={Error} />
                </Switch>
                <Footer />
            </React.Fragment>
        </BrowserRouter>
    );
}

export default App;