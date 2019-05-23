import React from "react";
import AuthService from "../utilities/auth.js";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Nav from "./nav.js";
import Dashboard from "./dashboard.js";
import Services from "./services.js";
import Billing from "./billing.js";

const stripe = Stripe("pk_test_OlwkpT4F6iqWnxxsxYV14LVA00aubL2pG3");
const elements = stripe.elements();

const cardStyle = {
  base: {
    color: "#32325d",
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a"
  }
};
const card = elements.create("card", { style: cardStyle });

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 0,
      user_proxies: [],
      focus: "Dashboard",
      billingState: ""
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
      .get(`/billing/information/${profile.id}`, this.auth.getHeaders())
      .then(response => {
        if (response.status !== 204) {
          let newState = response.data[0];
          newState.filledOut = true;
          console.log(newState);
          this.setState({ billingState: newState });
        }
      })
      .catch(err => {
        console.log("negative get response");
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
          <Billing
            newState={this.state.billingState}
            card={card}
            profile={this.state.user_id}
            stripe={stripe}
          />
        )}
      </div>
    );
  }
}
export default withRouter(Main);
