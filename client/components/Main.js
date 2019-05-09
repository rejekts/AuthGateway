import React from "react";
import AuthService from "../utilities/auth.js";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Nav from "./nav.js";
import Dashboard from "./dashboard.js";
import Services from "./services.js";
import Billing from "./billing.js";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 0,
      user_proxies: [],
      focus: "Dashboard"
    };
    this.auth = new AuthService();
    this.focusChange = this.focusChange.bind(this);
  }
  componentDidMount() {
    let profile = this.auth.getProfile();
    console.log(profile.id);
    this.setState({
      user_id: profile.id
    });
    axios
      .get(`/dashboard/user/${profile.id}`, this.auth.getHeaders())
      .then(response => {
        //response = JSON.parse(response);
        console.log(response, "success!");
        let user_proxies = response.data;
        this.setState({ user_proxies });
      })
      .catch(err => {
        // err = JSON.parse(err);
        console.log(err, "error");
      });
  }
  focusChange(e, focus) {
    e.preventDefault();
    console.log(focus, "<= the new focus");
    this.setState({ focus });
  }

  render() {
    return (
      <div id="topContainer">
        <Nav change={this.focusChange} />
        {this.state.focus === "Dashboard" ? (
          <Dashboard
            profile={this.state.user_id}
            user_proxies={this.state.user_proxies}
          />
        ) : this.state.focus === "Services" ? (
          <Services profile={this.state.user_id} />
        ) : (
          <Billing profile={this.state.user_id} />
        )}
      </div>
    );
  }
}
export default withRouter(Main);
