import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Landing from "./components/Landing.js";
import Login from "./components/Login.js";
import CreateAcct from "./components/CreateAcct.js";
import Main from "./components/Main.js";
import AuthService from "./utilities/auth.js";
import CSS from "../style.css";
import Protect from "./utilities/protectRoutes.js";
import Dashboard from "./components/dashboard.js";
import Services from "./components/services.js";
import Billing from "./components/billing.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.auth = new AuthService();
  }
  // this is the router, the protect class is invoked with each page that should only be seen by a user that is logged in. easy to add additional protected features.
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/createAcct" component={CreateAcct} />
          <Route exact path="/main" component={Protect(Main)} />
          <Route exact path="/dashboard" component={Protect(Dashboard)} />
          <Route exact path="/services" component={Protect(Services)} />
          <Route exact path="/billing" component={Protect(Billing)} />
          <Route component={Landing} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
