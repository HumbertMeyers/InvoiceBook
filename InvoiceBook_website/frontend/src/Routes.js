import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home.js";
import Help from "./pages/Help.js";
import Profile from "./pages/Profil.js";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import NotFound from "./pages/NotFound.js";


class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <Route>
          <NotFound />
        </Route>
        {/* Finally, catch all unmatched routes */}
      </Switch>
    );
  }
}

export default Routes;