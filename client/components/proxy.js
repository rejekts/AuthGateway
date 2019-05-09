import React from "react";
import { withRouter } from "react-router-dom";
import { List, Container, Button } from "semantic-ui-react";

const Proxy = ({ proxy, handleSelect }) => {
  const hardReset = e => {
    e.preventDefault();
    console.log("Logic to Restart Proxy Goes HERE");
  };
  return (
    <Container>
      <List divided verticalAlign="middle">
        <List.Header />
        <List.Item>
          <List.Header>Lan IP</List.Header>
          {proxy.lanIP}
        </List.Item>
        <List.Item>
          <List.Header>Vpn IP</List.Header>
          {proxy.vpnIP}
        </List.Item>
        <List.Item>
          <List.Header>Proxy IP</List.Header>
          {proxy.proxyIP}
        </List.Item>
        <List.Item>
          <List.Header>Old Browser IP</List.Header>
          {proxy.oldBrowserIP}
        </List.Item>
        <List.Item>
          <List.Header>Browser IP</List.Header>
          {proxy.browserIP}
        </List.Item>
        <List.Item>
          <List.Header>Port</List.Header>
          {proxy.port}
        </List.Item>
        <List.Item>
          <List.Header>Carrier</List.Header>
          {proxy.carrier}
        </List.Item>
        <List.Item>
          <List.Header>Apn</List.Header>
          {proxy.apn}
        </List.Item>
        <List.Item>
          <List.Header>Reset Link</List.Header>
          {proxy.resetURL}
        </List.Item>
        <Button onClick={e => hardReset(e)}>HARD RESET</Button>
        <Button
          onClick={e => {
            handleSelect(e);
          }}
        >
          BACK TO LIST
        </Button>
      </List>
    </Container>
  );
};

export default withRouter(Proxy);
