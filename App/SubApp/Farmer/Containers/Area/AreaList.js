import React, { Component, Fragment } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";

import { withNoHeader } from "Hoc";
import {
  getAreas,
  isAnyAreaDrawn,
  isAreasDrawn,
  getFarmerSignupData,
  getFarmerSignupImages,
} from "Redux/FarmerSignupRedux";
import { Images, Colors, FONTS, METRICS } from "Themes";
import { moderateScale } from "Lib";
import { ButtonPrimary } from "Components";
import { AreaItem, SignupBottomButton } from "CommonFarmer";
import SignupWrapper from "../Signup/SignupWrapper";
import { SIGNUP_FARMER } from "GraphQL/Farmer/Mutation";

class AreaList extends Component {
  onSubmit = async (mutate) => {
    const { signupData, signupImages } = this.props;
    let variables = {};
    let images = [];
    for (const key in signupImages) {
      let value = signupImages[key];
      if (signupImages.hasOwnProperty(key)) {
        const { mime, data } = value || {};
        const imagePath = await saveBase64AsImage(data, key, mime);
        const imageName = `${moment().format("YYYYMMDDHHmmss")}_${key}`;
        images.push(
          new ReactNativeFile({
            uri: "file:///" + imagePath,
            name: combineFilenameMime(imageName, mime),
            type: mime,
          })
        );
      }
    }
    variables = Object.assign({}, { data: signupData }, { images });
    mutate({
      variables,
      context: {
        hasUpload: true,
      },
    });
  };

  onUploadCompleted = () => {
    const { navigation } = this.props;
    navigation.navigate("SopFarmer");
  };

  render() {
    const { navigation, areas, isAnyAreaDrawn, isAreasDrawn } = this.props;
    const currentPagePosition = isAreasDrawn ? 4 : 3;
    return (
      <Fragment>
        <SignupWrapper
          title="Area lahan"
          currentPosition={currentPagePosition}
          styleWrapper={{ paddingTop: METRICS.SMALL }}
        >
          <TouchableOpacity
            style={{
              marginTop: METRICS.HUGE,
              marginBottom: METRICS.SMALL,
              marginHorizontal: METRICS.SMALL,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: METRICS.BORDER_THIN,
              borderColor: Colors.BORDER,
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
              const { size, commodity, snapshot } = item;
              return (
                <AreaItem
                  key={index}
                  title={`Lahan ${index + 1}`}
                  snapshot={snapshot}
                  size={size}
                  commodity={commodity}
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
        <Mutation
          mutation={SIGNUP_FARMER}
          onCompleted={this.onUploadCompleted}
          awaitRefetchQueries={true}
          ignoreResults={false}
          errorPolicy="all"
        >
          {(mutate, { loading }) => {
            return (
              <ButtonPrimary
                onPress={async () => this.onSubmit(mutate)}
                disabled={!isAnyAreaDrawn}
                loading={loading}
                title="Selesai"
              />
            );
          }}
        </Mutation>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  areas: getAreas(),
  isAnyAreaDrawn: isAnyAreaDrawn(),
  isAreasDrawn: isAreasDrawn(),
  signupData: getFarmerSignupData(),
  signupImages: getFarmerSignupImages(),
});

export default connect(
  mapStateToProps,
  null
)(withNavigation(withNoHeader(AreaList)));
