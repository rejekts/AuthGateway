import React from "react";
import axios from "axios";
import AuthService from "../utilities/auth.js";
import { withRouter } from "react-router-dom";
import Proxy from "./proxy.js";

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
      <div className="dash-container">
        <h1>Your Dashboard </h1>
        {this.state.selected ? (
          <Proxy
            handleSelect={this.handleSelect}
            proxy={this.props.user_proxies[this.state.key]}
          />
        ) : (
          <div>
            <h3>Select a proxy to expand details</h3>
            <ul>
              {this.props.user_proxies.map((proxy, key) => {
                return (
                  <li style={{ marginTop: "20px" }}>
                    <div
                      onClick={e => {
                        this.handleSelect(e, key);
                      }}
                    >
                      {proxy.proxyServerID}
                    </div>
                    <div>{proxy.vpnID}</div>
                    <div>{proxy.resetURL}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Dashboard);
