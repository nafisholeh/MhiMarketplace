import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { connect } from "react-redux";

import { withNoHeader } from "Hoc";
import { FONTS } from "Themes";
import BioItem from "./BioItems";

class BioList extends Component {
  render() {
    return (
      <ScrollView>
        <Text
          style={{
            ...FONTS.PAGE_TITLE
          }}
        >
          Ubah biodatamu
        </Text>
        <BioItem title="KTP" />
        <BioItem title="Biodata" />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(withNoHeader(BioList));
