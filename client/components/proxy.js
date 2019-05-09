import React from "react";
import { withRouter } from "react-router-dom";

const Proxy = ({ proxy, handleSelect }) => {
  const hardReset = e => {
    e.preventDefault();
    console.log("Logic to Restart Proxy Goes HERE");
  };
  return (
    <div>
      <div>{proxy.lanIP}</div>
      <div>{proxy.vpnIP}</div>
      <div>{proxy.proxyIP}</div>
      <div>{proxy.oldBrowserIP}</div>
      <div>{proxy.browserIP}</div>
      <div>{proxy.port}</div>
      <div>{proxy.carrier}</div>
      <div>{proxy.apn}</div>
      <div>{proxy.resetURL}</div>
      <button onClick={e => hardReset(e)}>HARD RESET</button>
      <button
        onClick={e => {
          handleSelect(e);
        }}
      >
        BACK TO LIST
      </button>
    </div>
  );
};

export default withRouter(Proxy);
