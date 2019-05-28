import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import axios from "axios";
import AuthService from "../utilities/auth.js";
import Cart from "./cart.js";

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableCount: 0,
      options: []
    };
    this.auth = new AuthService();
  }
  componentDidMount() {
    //get proxy count
    axios
      .get("/proxies/available", this.auth.getHeaders())
      .then(results => {
        console.log(results.data);
        let currentCount = results.data;
        const options = [];
        for (let x = 0; x <= currentCount; x++) {
          options.push({ key: x, text: `${x}`, value: x });
        }
        this.setState({ availableCount: currentCount, options });
      })
      .catch(err => {
        console.log(err);
        console.log("Error retrieving proxy count");
      });
  }
  render() {
    return (
      <Container>
        <Header as="h1">Services</Header>
        <Header as="h2">These are auto-renewing monthly subscriptions</Header>
        <Header as="h3">Proxies available: {this.state.availableCount}</Header>
        <Header as="h4">Price per individual proxy: $250 USD/monmonth</Header>
        <Header as="h4">Price per 5 or more proxies: $225 USD/mon</Header>
        {this.props.billingState ? (
          <Cart options={this.state.options} max={this.state.availableCount} />
        ) : (
          <Header as="h4">
            Please fill out billing information to continue
          </Header>
        )}
      </Container>
    );
  }
}

export default withRouter(Services);
