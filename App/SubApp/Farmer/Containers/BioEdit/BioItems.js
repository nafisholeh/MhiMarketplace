import React, { Component } from "react";
import { Text } from "react-native";

import { ProductVerticalWrapper } from "Components";
import { METRICS, FONTS } from "Themes";

export default class BioItem extends Component {
  render() {
    const { title } = this.props;
    return (
      <ProductVerticalWrapper
        styleParent={{
          marginTop: METRICS.MEDIUM,
          marginBottom: METRICS.MEDIUM
        }}
        styleChildren={{
          flexDirection: "row",
          alignItems: "center"
        }}
        height={METRICS.EXTRA_HUGE}
      >
        <Text
          style={{
            ...FONTS.BODY_NORMAL
          }}
        >
          {title}
        </Text>
      </ProductVerticalWrapper>
    );
  }
}
