import React from "react";
import {
  Button,
  Form,
  Input,
  Container,
  Header,
  Grid
} from "semantic-ui-react";

class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      billingAddress1: "",
      billingAddress2: "",
      billingCity: "",
      billingState: "",
      billingZip: "",
      filledOut: false
    };
  }
  componentDidMount() {
    this.props.card.mount("#cardElements");
  }
  inputChange(e) {
    e.preventDefault();
    //let err = e.target.id + "Error";
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.stripe.createToken(this.props.card).then(result => {
      if (result.error) {
        let errorElement = document.getElementById("card-errors");
        errorElement.textContent = result.error.message;
      } else {
        console.log(result.token, this.state);
        //
      }
    });
  }
  render() {
    return this.state.filledOut ? (
      <Container>
        <Header as="h1">You are already ready to buy!</Header>
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
            onClick={e => {
              this.handleSubmit(e);
            }}
          >
            Submit
          </Form.Field>
        </Form>
      </Container>
    );
  }
}

export default Billing;

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
