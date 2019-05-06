import React from "react";
import { Link } from "react-router-dom";

class CreateAcct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      retyped: ""
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
        <div>Youve reached the Create Account page</div>
        <form>
          <input
            type="text"
            placeholder="email"
            id="email"
            onChange={e => this.inputChange(e)}
          />
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={e => this.inputChange(e)}
          />
          <input
            type="text"
            placeholder="password"
            id="password"
            onChange={e => this.inputChange(e)}
          />
          <input
            type="text"
            placeholder="re-type password"
            id="retyped"
            onChange={e => this.inputChange(e)}
          />
          <input type="submit" />
        </form>
        <Link to="/login">Already have an account?</Link>
      </div>
    );
  }
}
export default CreateAcct;
