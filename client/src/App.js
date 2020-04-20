import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav/nav";
import Search from "./pages/Search/search";
import Saved from "./pages/Saved/saved";
import NoMatch from "./pages/NoMatch/nomatch";

import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <div id="main-content">
          <Nav />
          <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/saved" component={Saved} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;