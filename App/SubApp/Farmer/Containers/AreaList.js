import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { withNoHeader } from "Hoc";
import { getAreas, isAnyAreaDrawn } from "Redux/FarmerSignupRedux";
import { Images, Colors, FONTS } from "Themes";
import { moderateScale } from "Lib";
import { ButtonPrimary } from "Components";
import { AreaItem, SignupBottomButton } from "CommonFarmer";
import SignupWrapper from "./Signup/SignupWrapper";

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
    const { navigation, areas, isAnyAreaDrawn } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <SignupWrapper title="Area lahan" currentPosition={3}>
          <AreaItem
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("AreaDraw")}
          >
            <Image
              source={Images.plus}
              style={{
                width: moderateScale(35),
                height: moderateScale(35),
                tintColor: Colors.disabled_light,
              }}
            />
          </AreaItem>

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
        </SignupWrapper>
        <ButtonPrimary
          onPress={this.onSubmit}
          disabled={!isAnyAreaDrawn}
          title="Selanjutnya"
        />
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  areas: getAreas(),
  isAnyAreaDrawn: isAnyAreaDrawn(),
});

export default connect(
  mapStateToProps,
  null
)(withNavigation(withNoHeader(AreaList)));
