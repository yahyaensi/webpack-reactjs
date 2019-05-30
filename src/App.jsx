import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Contact from './components/Contact';
import User from './components/User';
import Error from './components/Error';
import Header from './components/template/Header';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        {/* will be displayed in all pages */}
        <Header />
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            {/* Switch component helps us to render the components only when path matches otherwise 
            it fallbacks to the not found component. */}
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/user/:id" component={User} />
              <Route path="/contact" component={Contact} />
              <Route component={Error} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
