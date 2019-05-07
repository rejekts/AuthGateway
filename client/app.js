import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Landing from "./Landing.js";
import Login from "./Login.js";
import CreateAcct from "./CreateAcct.js";
import Main from "./Main.js";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/createAcct" component={CreateAcct} />
      <Route exact path="/main" component={Main} />
      <Route component={Landing} />
    </Switch>
  </BrowserRouter>
);

export default App;
