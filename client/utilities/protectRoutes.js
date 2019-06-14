import React from "react";
import { Redirect } from "react-router-dom";
import AuthService from "./auth.js";

//premise is fairly simple, any time a protected route is accessed, this verifies the user is still authorized/logged in, and if not, they are redirected to the login page.

const Protect = Route => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        redirect: false
      };
      this.auth = new AuthService(); //this is required on every class to use auth methods
    }
    componentDidMount() {
      if (this.auth.loggedIn()) {
        this.setState({
          loading: false
        });
      } else {
        console.log("false");
        this.setState({ loading: false, redirect: true });
      }
    }
    render() {
      return this.state.loading ? null : this.state.redirect ? (
        <Redirect to="/login" />
      ) : (
        <Route {...this.props} />
      );
    }
  };
};

export default Protect;
