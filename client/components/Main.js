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
//your top page. this is where stripe is initialized and passed down. this page renders the nav bar, and holds the 'focus' depending on which route the user is visiting.
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
      billingState: null
    };
    this.auth = new AuthService();
    this.focusChange = this.focusChange.bind(this);
    this.updateBilling = this.updateBilling.bind(this);
  }
  componentDidMount() {
    let profile = this.auth.getProfile(); //puts user id in state and passes to each route
    this.setState({
      user_id: profile.id
    });
    axios
      .get(`/billing/information/${profile.id}`, this.auth.getHeaders()) //if user has billing info saved, this grabs it
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
      .get(`/dashboard/user/${profile.id}`, this.auth.getHeaders()) //this grabs the logged in user's proxies that he/she is subscribed to.
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
    if (this.auth.isTokenExpired(this.auth.getToken())) {
      //changing the route based on click in nav bar. if user has timed out, redirects to login
      this.props.history.push("/login");
    }
    console.log(focus, "<= the new focus");
    this.setState({ focus });
  }

  updateBilling(billingState) {
    console.log(billingState); //when billing info is saved, this rerenders the billing page to reflect that to the user
    this.setState({ billingState });
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
          <Services
            billingState={this.state.billingState}
            profile={this.state.user_id}
          />
        ) : (
          <Billing
            newState={this.state.billingState}
            card={card}
            profile={this.state.user_id}
            stripe={stripe}
            update={this.updateBilling}
          />
        )}
      </div>
    );
  }
}
export default withRouter(Main);
