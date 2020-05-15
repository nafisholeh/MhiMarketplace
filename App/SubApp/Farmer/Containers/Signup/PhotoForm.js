import React, { Component, Fragment } from "react";
import { Text } from "react-native";
import { withNavigation } from "react-navigation";

import { withNoHeader } from "Hoc";
import { ImagePicker, ButtonPrimary } from "Components";
import { METRICS, STRINGS, FONTS } from "Themes";
import SignupWrapper from "./SignupWrapper";

class PhotoForm extends Component {
  state = {
    photo_face: null,
    photo_ktp: null,
    is_can_continue: false,
  };

  onPhotoChange = async (name, raw = []) => {
    if (!Array.isArray(raw)) return;
    const photos = raw.map((item, i) => {
      const { mime, path, data } = item;
      return { mime, path, data };
    });
    this.setState({ [name]: photos }, () => {
      this.isCanContinue();
    });
  };

  isCanContinue = () => {
    const { photo_face, photo_ktp } = this.state;
    this.setState({ is_can_continue: photo_face && photo_ktp ? true : false });
  };

  onSubmit = () => {
    const { navigation } = this.props;
    navigation.navigate("SignupFarmerFourth");
  };

  render() {
    const { photo_ktp, photo_face, is_can_continue } = this.state;
    return (
      <Fragment>
        <SignupWrapper title={STRINGS.UPLOAD_PHOTO} currentPosition={2}>
          <Text
            style={{
              ...FONTS.INPUT_TITLE,
              ...{ marginBottom: METRICS.SMALL },
            }}
          >
            Ambil Foto KTP
          </Text>
          <ImagePicker
            name="photo_ktp"
            onChange={this.onPhotoChange}
            data={photo_ktp}
            titleBottomSheet={STRINGS.TAKE_KTP_PHOTO}
            isMultiplePick={false}
            isShowCancelButton={false}
            isShowGallery
            styleContainer={{
              marginBottom: METRICS.LARGE,
            }}
          />

          <Text
            style={{
              ...FONTS.INPUT_TITLE,
              ...{ marginBottom: METRICS.SMALL },
            }}
          >
            Ambil Foto Muka
          </Text>
          <ImagePicker
            name="photo_face"
            onChange={this.onPhotoChange}
            data={photo_face}
            titleBottomSheet={STRINGS.TAKE_FACE_PHOTO}
            isMultiplePick={false}
            isShowCancelButton={false}
            isShowGallery
            styleContainer={{
              marginBottom: METRICS.HUGE,
            }}
          />
        </SignupWrapper>
        <ButtonPrimary
          onPress={this.onSubmit}
          disabled={!is_can_continue}
          title={STRINGS.GO_TO_NEXT_FORM}
        />
      </Fragment>
    );
  }
}

export default withNavigation(withNoHeader(PhotoForm));
