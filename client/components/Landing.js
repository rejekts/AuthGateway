import React from "react";
import { withRouter } from "react-router-dom";
import { Menu, Container, Button } from "semantic-ui-react";
import AuthService from "../utilities/auth.js";
//main page visited when user enters ANY url, currently has login/signup buttons. needs completion.
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixed: true
    };
    this.auth = new AuthService();
  }
  handleClick(e, dest) {
    e.preventDefault();
    this.props.history.push(`/${dest}`);
  }
  render() {
    return (
      <Menu fixed="top" pointing="true" secondary="true" size="large">
        <Container>
          <Menu.Item position="right">
            <Button
              as="a"
              onClick={e => {
                this.handleClick(e, "login");
              }}
            >
              Log in
            </Button>
            <Button
              as="a"
              onClick={e => {
                this.handleClick(e, "createAcct");
              }}
              primary={this.state.fixed}
              style={{ marginLeft: "0.5em" }}
            >
              Sign Up
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}
export default withRouter(Landing);
