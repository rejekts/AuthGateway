import React from "react";
import { Link } from "react-router-dom";
const buttonstyle = {
  border: "2px solid black",
  borderRadius: "3px"
};
class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>Please Login or Create a new account</div>
        <Link style={buttonstyle} to="/login">
          Login
        </Link>
        <Link style={buttonstyle} to="/createAcct">
          Create New Account
        </Link>
      </div>
    );
  }
}
export default Landing;
