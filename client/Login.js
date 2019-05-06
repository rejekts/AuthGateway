import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  inputChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div>Youve reached the Login page</div>
        <form>
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={e => this.usernameChange(e)}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={e => this.passwordChange(e)}
          />
          <input type="submit" />
        </form>
        <Link to="/createAcct">Create New Account</Link>
      </div>
    );
  }
}
export default Login;
