import React, { Component } from "react";

export default function withNoHeader(WrappedComponent) {
  class HeaderComponent extends Component {
    static navigationOptions = () => ({ header: null });

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return HeaderComponent;
}
