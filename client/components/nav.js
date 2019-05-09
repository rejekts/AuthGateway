import React from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../utilities/auth.js";

class Nav extends React.Component {
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
      <div className="nav">
        <h2 className="logo">Badger Services</h2>
        <div className="nav-links">
          <Link
            className="nav-link"
            to="/dashboard"
            onClick={e => {
              this.props.change(e, "Dashboard");
            }}
          >
            Dashboard
          </Link>
          <Link
            className="nav-link"
            to="/services"
            onClick={e => {
              this.props.change(e, "Services");
            }}
          >
            Services
          </Link>
          <Link
            className="nav-link"
            to="/billing"
            onClick={e => {
              this.props.change(e, "Billing");
            }}
          >
            Billing
          </Link>
          <a
            className="nav-link"
            onClick={e => {
              this.handleLogout(e);
            }}
          >
            Log off
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(Nav);
