import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import AuthService from "../utilities/auth.js";
import { Button, Form, Input } from "semantic-ui-react";
import { formValidator } from "../utilities/validation.js";

class CreateAcct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      retyped: "",
      loading: false,
      emailError: false,
      passwordError: false, //state for the three inputs, as well as whether or not they are in error.
      retypedError: false
    };
    this.auth = new AuthService();
  }
  inputChange(e) {
    e.preventDefault();
    let err = e.target.id + "Error"; //any time a user changes an input, the error goes away.
    this.setState({
      [e.target.id]: e.target.value,
      [err]: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let check = formValidator(this.state); //verifying email and passwords
    if (check.result) {
      this.setState({ loading: true });
      //passwords match?  TODO <------------
      let payload = {
        user_email: this.state.email,
        user_password: this.state.password
      };

      axios
        .post("/createAccount", payload)
        .then(data => {
          if (data.data === 23505) {
            alert(
              "We already have an account associated with that email address." //specific code sent back from DB when user with that email already exists.
            );
          } else if (data.data === 23502) {
            alert("error creating account"); //straight up bug with DB
          } else {
            this.auth
              .login(payload.user_email, payload.user_password) //upon successful account creating, automatically logs user in
              .then(response => {
                this.setState({ loading: false });
                this.props.history.push("/main");
              })
              .catch(err => {
                console.log("something went wrong in createAcct"); //error authorizing token
              });
          }
        })
        .catch(err => {
          console.error(err); //error with server (never had as issue here)
        });
    } else {
      //telling the user what the did wrong based on the error code from the validation. alerts, and errors the corresponding inputs.
      if (check.code === 1) {
        alert("Please enter a valid email");
        this.setState({ emailError: true });
      } else if (check.code === 2) {
        alert(
          "Your password needs to contain at least one lowercase letter, one uppercase letter, and one number, and be at least 8 characters long"
        );
        this.setState({ passwordError: true });
      } else if (check.code === 3) {
        alert("Your passwords do not match");
        this.setState({ retypedError: true, passwordError: true });
      }
    }
  }

  render() {
    let valid = this.state.disabled;
    return (
      <div className="center">
        <div className="card">
          <h1>Sign Up</h1>
          <Form id="CAForm">
            <Form.Input
              label="Email"
              error={this.state.emailError}
              type="email"
              placeholder="email"
              id="email"
              onChange={e => {
                this.inputChange(e);
              }}
            />

            <Form.Input
              label="Password"
              error={this.state.passwordError}
              type="password"
              placeholder="password"
              id="password"
              onChange={e => this.inputChange(e)}
            />
            <Form.Input
              label="Re-type password"
              error={this.state.retypedError}
              type="password"
              placeholder="re-type password"
              id="retyped"
              onChange={e => this.inputChange(e)}
            />
            <Link to="/login">Already have an account?</Link>

            <Form.Field
              control={Button}
              disabled={valid}
              loading={this.state.loading}
              onClick={e => {
                this.handleSubmit(e);
              }}
            >
              Submit
            </Form.Field>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateAcct);
