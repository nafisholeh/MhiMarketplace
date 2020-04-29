import React, { Component, Fragment } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { withNoHeader } from "Hoc";
import {
  getAreas,
  isAnyAreaDrawn,
  isAreasDrawn,
} from "Redux/FarmerSignupRedux";
import { Images, Colors, FONTS, METRICS } from "Themes";
import { moderateScale } from "Lib";
import { ButtonPrimary } from "Components";
import { AreaItem, SignupBottomButton } from "CommonFarmer";
import SignupWrapper from "../Signup/SignupWrapper";

class AreaList extends Component {
  renderBottom = () => {
    const { navigation, areas, isAnyAreaDrawn } = this.props;
    return (
      <SignupBottomButton
        isShowSkip={!isAnyAreaDrawn}
        isShowNext={isAnyAreaDrawn}
        onPressSkip={() => navigation.navigate("FarmerFinalConfirm")}
        onPressNext={() => navigation.navigate("FarmerFinalConfirm")}
        nextTitle="Selesai"
      />
    );
  };

  render() {
    const { navigation, areas, isAnyAreaDrawn, isAreasDrawn } = this.props;
    const currentPagePosition = isAreasDrawn ? 4 : 3;
    return (
      <Fragment>
        <SignupWrapper
          title="Area lahan"
          currentPosition={currentPagePosition}
          style={{ paddingHorizontal: 0 }}
          contentContainerStyle={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              marginTop: METRICS.HUGE,
              marginBottom: METRICS.SMALL,
              marginHorizontal: METRICS.SMALL,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: Colors.BORDER,
              borderRadius: METRICS.AREA_ITEM_RADIUS,
              padding: METRICS.MEDIUM,
            }}
            onPress={() => navigation.navigate("AreaDraw")}
          >
            <Image
              source={Images.plus}
              style={{
                width: moderateScale(35),
                height: moderateScale(35),
                tintColor: Colors.BUTTON_TERTIER,
              }}
            />
          </TouchableOpacity>

          {isAnyAreaDrawn && Array.isArray(areas) ? (
            areas.map((item, index) => {
              const { polygon, size, commodity_name } = item;
              return (
                <AreaItem
                  key={index}
                  title={`Lahan ${index + 1}`}
                  polygon={polygon}
                  size={size}
                  commodity={commodity_name}
                />
              );
            })
          ) : (
            <Text
              style={{
                ...FONTS.INSTRUCTION,
                marginHorizontal: moderateScale(5),
                marginTop: moderateScale(10),
              }}
            >
              Tekan tombol diatas untuk menambahkan area lahan
            </Text>
          )}
          <View style={{ marginBottom: METRICS.HUGE }} />
        </SignupWrapper>
        <ButtonPrimary
          onPress={this.onSubmit}
          disabled={!isAnyAreaDrawn}
          title="Selanjutnya"
        />
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  areas: getAreas(),
  isAnyAreaDrawn: isAnyAreaDrawn(),
  isAreasDrawn: isAreasDrawn(),
});

export default connect(
  mapStateToProps,
  null
)(withNavigation(withNoHeader(AreaList)));
