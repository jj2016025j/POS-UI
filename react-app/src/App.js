import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './page/Home';
// import Store from '../../example/src/components/Store';
// import About from '../../example/src/components/About';
// import News from '../../example/src/components/News';
// import Contact from '../../example/src/components/Contact';
import Error from './page/Error';
import Web from './routes/Web';
import Pos from './routes/Pos';

function App() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/web" component={Web} />
                    <Route path="/pos" component={Pos} />
                    {/* <Route path="/store" component={Store} />
                    <Route path="/about" component={About} />
                    <Route path="/news" component={News} />
                    <Route path="/contact" component={Contact} />*/}
                    <Route component={Error} /> 
                </Switch>
            </React.Fragment>
        </BrowserRouter>
    );
}

export default App;