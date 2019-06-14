import React from "react";
import {
  Button,
  Form,
  Input,
  Container,
  Header,
  Grid
} from "semantic-ui-react";
import axios from "axios";
import AuthService from "../utilities/auth.js";
import { withRouter } from "react-router-dom";

class Billing extends React.Component {
  //billing route, either collects billing information, or declares its already saved with the option to update it.
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      name: "",
      billingAddress1: "",
      billingAddress2: "",
      billingCity: "",
      billingState: "",
      billingZip: "",
      filledOut: false,
      token: null
    };
    this.auth = new AuthService();
  }
  componentDidMount() {
    if (this.props.newState !== null) {
      //f
      this.setState(this.props.newState);
    }
    this.setState({ user_id: this.props.profile });
    this.props.card.mount("#cardElements");
  }
  inputChange(e) {
    e.preventDefault();
    //let err = e.target.id + "Error"; //if you want to add errors to specific fields, there is no validation here
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleUpdate(e) {
    e.preventDefault();
    this.setState({ filledOut: false }, () => {
      this.props.card.mount("#cardElements");
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("INITIAL ROUTE");
    this.props.stripe.createToken(this.props.card).then(result => {
      if (result.error) {
        let errorElement = document.getElementById("card-errors");
        errorElement.textContent = result.error.message;
      } else {
        let payload = {
          user_id: this.state.user_id,
          token: result.token.id,
          name: this.state.name,
          billingAddress1: this.state.billingAddress1,
          billingAddress2: this.state.billingAddress2,
          billingCity: this.state.billingCity,
          billingState: this.state.billingState,
          billingZip: this.state.billingZip
        };
        axios
          .post("/billing/information", payload, this.auth.getHeaders())
          .then(results => {
            this.setState({ filledOut: true });
            payload.filledOut = true;
            this.props.update(payload);
          })
          .catch(err => {
            console.log("bug along the path");
          });
      }
    });
  }
  handleResubmit(e) {
    //this is the update billing route
    e.preventDefault();
    this.props.stripe.createToken(this.props.card).then(result => {
      if (result.error) {
        let errorElement = document.getElementById("card-errors");
        errorElement.textContent = result.error.message;
      } else {
        let payload = {
          user_id: this.state.user_id,
          token: result.token.id, //maybe dont store clientside?? this will be saved in the database. IT IS NEEDED TO CREATE A STRIPE CUSTOMER, which returns a different token that can be used for multiple payments
          name: this.state.name,
          billingAddress1: this.state.billingAddress1,
          billingAddress2: this.state.billingAddress2,
          billingCity: this.state.billingCity,
          billingState: this.state.billingState,
          billingZip: this.state.billingZip
        };
        axios
          .patch("/billing/information", payload, this.auth.getHeaders())
          .then(results => {
            console.log("successful update");
            this.setState({ filledOut: true });
            payload.filledOut = true;
            this.props.update(payload);
          })
          .catch(err => {
            console.log("bug along the update path");
          });
      }
    });
  }
  render() {
    return this.state.filledOut ? (
      <Container>
        <Header as="h1">You are ready to buy!</Header>
        <Button onClick={e => this.handleUpdate(e)}>Update Payment Info</Button>
      </Container>
    ) : (
      <Container>
        <Header as="h3">Enter your Billing information</Header>

        <Form style={{ width: "50%" }}>
          <Form.Input
            textAlign="left"
            label="Name as it appears on your card"
            placeholder="Full name"
            id="name"
            onChange={e => this.inputChange(e)}
          />
          <Form.Input
            label="Address line 1"
            placeholder="Full name"
            id="billingAddress1"
            onChange={e => this.inputChange(e)}
          />
          <Form.Input
            label="Address line 2"
            placeholder="Full name"
            id="billingAddress2"
            onChange={e => this.inputChange(e)}
          />
          <Form.Input
            label="City"
            placeholder="Full name"
            id="billingCity"
            onChange={e => this.inputChange(e)}
          />
          <Form.Input
            label="State"
            placeholder="Full name"
            id="billingState"
            onChange={e => this.inputChange(e)}
          />
          <Form.Input
            label="Zipcode"
            placeholder="Full name"
            id="billingZip"
            onChange={e => this.inputChange(e)}
          />

          <div id="cardElements" />
          <div id="card-errors" role="alert" />
          <br />
          <Form.Field
            control={Button}
            // disabled={valid}
            // loading={this.state.loading}
            onClick={
              this.state.token === null
                ? e => {
                    this.handleSubmit(e);
                  }
                : e => {
                    this.handleResubmit(e);
                  }
            }
          >
            Submit
          </Form.Field>
        </Form>
      </Container>
    );
  }
}

export default withRouter(Billing);

// (
//   <Container>
//     <Header as="h2">
//       Enter your Billing information in order to purchase services
//     </Header>
//     <Form>
// <Form.Input
//   label="Name as it appears on your card"
//   placeholder="Full name"
//   id="name"
//   onChange={e => this.inputChange(e)}
// />
//       <Form.Input
//         label="Card Number"
//         placeholder="#### #### #### ####"
//         id="cardNumber"
//         onChange={e => this.inputChange(e)}
//       />
//       <Form.Input
//         label="Exp mon"
//         placeholder="mm"
//         id="expMonth"
//         onChange={e => this.inputChange(e)}
//       />
//       <Form.Input
//         label="Exp year"
//         placeholder="yyyy"
//         id="expYear"
//         onChange={e => this.inputChange(e)}
//       />
// <Form.Field
//   control={Button}
//   // disabled={valid}
//   // loading={this.state.loading}
//   onClick={e => {
//     this.handleSubmit(e);
//   }}
// >
//   Submit
// </Form.Field>
//     </Form>
//   </Container>
// );
