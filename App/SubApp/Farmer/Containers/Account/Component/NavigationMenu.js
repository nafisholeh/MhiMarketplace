import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";

import { Fonts, METRICS } from "Themes";

class NavigationMenu extends Component {
  render() {
    const { title } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {}}
        style={{
          paddingHorizontal: METRICS.MEDIUM,
          paddingVertical: METRICS.LARGE
        }}
      >
        <Text style={{ ...Fonts.HEADER_SMALL }}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(NavigationMenu);
