import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthService from "./utilities/auth.js";

class CreateAcct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      retyped: ""
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
    //passwords match?
    let payload = {
      user_email: this.state.email,
      user_password: this.state.password
    };

    axios
      .post("/createAccount", payload)
      .then(data => {
        console.log(data.data, "<= data from createAccount request");

        if (data.data === 23505) {
          alert(
            "We already have an account associated with that email address."
          );
        } else {
          console.log(data, "success");

          this.props.history.push("/main");
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Sign Up</h1>
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
            <input
              className="form-item"
              type="password"
              placeholder="re-type password"
              id="retyped"
              onChange={e => this.inputChange(e)}
            />
            <Link to="/login">Already have an account?</Link>

            <input
              className="form-submit"
              type="submit"
              onClick={e => {
                this.handleSubmit(e);
              }}
            />
          </form>
        </div>
      </div>
    );
  }
}
export default CreateAcct;
