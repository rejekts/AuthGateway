import React from "react";
import { Redirect } from "react-router-dom";
import AuthService from "./auth.js";

const Protect = Route => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        redirect: false
      };
      this.auth = new AuthService();
    }
    componentDidMount() {
      if (this.auth.loggedIn()) {
        this.setState({
          loading: false
        });
      } else {
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
