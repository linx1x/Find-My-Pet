import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter,
  Link,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

//Components
import signup from "./signup.jsx";
import login from "./login.jsx";
import map from "./map.jsx";

class UnconnectedApp extends Component {
  render = () => {
    return (
      <div className="MainFrame">
        <Router>
          <Route exact={true} path="/" component={map} />
          <Route exact={true} path="/login" component={login} />
          <Route exact={true} path="/signup" component={signup} />
        </Router>
      </div>
    );
  };
}
let App = connect()(UnconnectedApp);
export default App;
