import React from "react";
import axios from "axios";
import AuthService from "../utilities/auth.js";
import { withRouter } from "react-router-dom";
import Proxy from "./proxy.js";
import { Menu, Container, Button, Header, List } from "semantic-ui-react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      key: undefined
    };
    this.auth = new AuthService();
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(e, key) {
    e.preventDefault();
    this.setState({ key, selected: !this.state.selected });
  }

  render() {
    return (
      <Container>
        <Header as="h2">Your Dashboard </Header>
        {this.state.selected ? (
          <Proxy
            handleSelect={this.handleSelect}
            proxy={this.props.user_proxies[this.state.key]}
          />
        ) : (
          <List divided verticalAlign="middle">
            <Header as="h3">Select a proxy to expand details</Header>

            {this.props.user_proxies.map((proxy, key) => {
              return (
                <List.Item style={{ marginTop: "20px" }}>
                  <List.Content floated="right">
                    <Button
                      onClick={e => {
                        this.handleSelect(e, key);
                      }}
                    >
                      Details
                    </Button>
                  </List.Content>

                  <List.Content>Proxy ID: {proxy.proxyServerID}</List.Content>
                </List.Item>
              );
            })}
          </List>
        )}
      </Container>
    );
  }
}

export default withRouter(Dashboard);
