import React from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from "react-router";

import { Root } from "./app/components/Root";
import { Home } from "./app/components/Home";
import { User } from "./app/components/User";

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path={"/"} component={Root}>
          <IndexRoute component={Home} />
          <Route path={"user/:id"} component={User} />
          <Route path={"home"} component={Home} />
        </Route>
        <Route path={"home-single"} component={Home} />
      </Router>
    );
  }
}

render(<App />, window.document.getElementById("app"));
