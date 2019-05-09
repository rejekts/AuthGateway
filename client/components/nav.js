import React from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../utilities/auth.js";
import { Container, Menu, Button } from "semantic-ui-react";

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
      <Menu>
        <Container>
          <Menu.Item
            as={Link}
            to="/dashboard"
            onClick={e => {
              this.props.change(e, "Dashboard");
            }}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/services"
            onClick={e => {
              this.props.change(e, "Services");
            }}
          >
            Services
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/billing"
            onClick={e => {
              this.props.change(e, "Billing");
            }}
          >
            Billing
          </Menu.Item>
          <Menu.Item position="right">
            <Button
              onClick={e => {
                this.handleLogout(e);
              }}
            >
              Log off
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default withRouter(Nav);
