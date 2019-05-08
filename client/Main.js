import React from "react";
import AuthService from "./utilities/auth.js";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.auth = new AuthService();
  }
  handleLogout(e) {
    e.preventDefault();
    this.auth.logout();
    this.props.history.push("/");
  }
  render() {
    return (
      <div>
        <div>Youve reached the Main page</div>
        <button
          onClick={e => {
            this.handleLogout(e);
          }}
        >
          Logout
        </button>
      </div>
    );
  }
}
export default Main;
