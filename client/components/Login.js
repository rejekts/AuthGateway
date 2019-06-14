import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import AuthService from "../utilities/auth.js";
import { Button } from "semantic-ui-react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false //since there are so many layers of salt/hashing, the login process takes some time to verify passwords. there is a loading spiral for UX.
    };
    this.auth = new AuthService();
  }
  inputChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    let email = this.state.email;
    let password = this.state.password;
    this.auth
      .login(email, password)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/main");
      })
      .catch(err => {
        alert("Email or Password Incorrect");
        this.setState({ loading: false });

        document.getElementById("password").value = ""; //doesnt tell the user if email was correct or not, but clears the password field.
      });
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Login</h1>
          <form>
            <input
              className="form-item"
              type="text"
              placeholder="email"
              id="email"
              onChange={e => this.inputChange(e)}
            />
            <input
              className="form-item"
              type="password"
              placeholder="password"
              id="password"
              onChange={e => this.inputChange(e)}
            />
            <Link to="/createAcct">Create New Account</Link>

            <Button
              loading={this.state.loading}
              className="form-submit"
              onClick={e => this.handleSubmit(e)}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
