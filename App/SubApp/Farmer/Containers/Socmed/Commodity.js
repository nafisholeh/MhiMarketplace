import React, { Component } from "react";
import { ScrollView } from "react-native";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import PostFeedModal from "./PostFeedModal";
import NewsFeedList from "./NewsFeedList";
import { withPageAccess } from "CommonFarmer";

class CommoditySocmed extends Component {
  static navigationOptions = ({ navigation }) => ({ header: null });

  openRegistrationPage = () => {
    const { navigation } = this.props;
    navigation.navigate("Signin");
  };

  render() {
    console.tron.log("Commodity/render", this.props);
    return (
      <ScrollView>
        <PostFeedModal />
        <NewsFeedList />
      </ScrollView>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withPageAccess(CommoditySocmed));
