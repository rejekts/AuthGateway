import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  inputChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    let payload = {
      user_email: this.state.email,
      user_password: this.state.password
    };
    axios
      .post("/login", payload)
      .then(data => {
        this.props.history.push("/main");
      })
      .catch(err => {
        e.target.reset();
        alert("email or password incorrect");
      });
  }

  render() {
    return (
      <div>
        <div>Youve reached the Login page</div>
        <form>
          <input
            type="text"
            placeholder="email"
            id="email"
            onChange={e => this.inputChange(e)}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={e => this.inputChange(e)}
          />
          <input type="submit" onClick={e => this.handleSubmit(e)} />
        </form>
        <Link to="/createAcct">Create New Account</Link>
      </div>
    );
  }
}
export default Login;
