import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { func } from "prop-types";

import { ButtonPrimary, InputPicker } from "Components";
import FarmerSignupActions from "Redux/FarmerSignupRedux";
import AppConfig from "Config/AppConfig";
import { moderateScale, screenWidth } from "Lib";
import { METRICS, Colors } from "Themes";
import { FETCH_COMMODITIES } from "SubApp/Farmer/GraphQL/Commodity/Query";

class AreaCommodity extends Component {
  state = {
    commodity: null,
    trigger_fetch_commodity: false,
    trigger_reset_commodity: false,
    isNewCommodity: false,
  };

  componentDidMount = () => {
    this.setState((prevState) => {
      return {
        trigger_fetch_commodity: !prevState.trigger_fetch_commodity,
      };
    });
  };

  onSubmit = () => {
    const { navigation, storeFarmerCommodity } = this.props;
    const { commodity, isNewCommodity } = this.state;
    const [commodity_id, commodity_name] = commodity.split("||");
    storeFarmerCommodity({
      commodity_id,
      commodity_name,
      isNewCommodity,
    });
    navigation.navigate("AreaList");
  };

  renderBottom = () => {
    return <ButtonPrimary title="Selesai" onPress={this.onSubmit} />;
  };

  onCommodityChange = (value, stateName, isManualInput) => {
    this.setState({
      [stateName]: value,
      isNewCommodity: isManualInput,
    });
  };

  render() {
    const { trigger_fetch_commodity } = this.state;
    return (
      <View
        style={{
          height: METRICS.AREA_DETAIL_HEIGHT,
          width: screenWidth,
          padding: METRICS.MEDIUM,
          paddingTop: METRICS.LARGE,
          backgroundColor: Colors.white,
          borderTopLeftRadius: METRICS.TINY,
          borderTopRightRadius: METRICS.TINY,
        }}
      >
        <InputPicker
          name="commodity"
          title="Komoditas"
          placeholder="Pilih komoditas"
          onSelectionChange={this.onCommodityChange}
          query={FETCH_COMMODITIES}
          triggerFetch={trigger_fetch_commodity}
          styleContainer={{
            marginHorizontal: 0,
          }}
          styleText={{
            marginHorizontal: 0,
          }}
          isManualInputDisplayed
          onShowManualInput={() =>
            this.setState({ height: moderateScale(150) })
          }
          onHideManualInput={() =>
            this.setState({ height: moderateScale(100) })
          }
        />
      </View>
    );
  }
}

AreaCommodity.propTypes = {
  storeFarmerCommodity: func,
};

const mapDispatchToProps = (dispatch) => ({
  storeFarmerCommodity: (area) =>
    dispatch(FarmerSignupActions.storeFarmerCommodity(area)),
});

export default connect(null, mapDispatchToProps)(AreaCommodity);
