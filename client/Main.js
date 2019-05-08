import React from "react";
import AuthService from "./utilities/auth.js";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 0
    };
    this.auth = new AuthService();
  }
  componentDidMount() {
    let profile = this.auth.getProfile();
    console.log(profile.id);
    this.setState({
      user_id: profile.id
    });
    axios
      .get(`/services/user/${profile.id}`, this.auth.getHeaders())
      .then(response => {
        //response = JSON.parse(response);
        console.log(response, "success!");
      })
      .catch(err => {
        // err = JSON.parse(err);
        console.log(err, "error");
      });
  }
  handleLogout(e) {
    e.preventDefault();
    this.auth.logout();
    this.props.history.push("/");
  }
  render() {
    return (
      <div>
        <header>
          <h1>Welcome to Your Dashboard</h1>
          <button
            onClick={e => {
              this.handleLogout(e);
            }}
          >
            Logout
          </button>
        </header>
        <h3>Your Subs</h3>
        <ul>
          <li>thing</li>
          <li>thing</li>
          <li>thing</li>
          <li>thing</li>
        </ul>
      </div>
    );
  }
}
export default withRouter(Main);
