import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import { withNoHeader } from "Hoc";
import { ImagePicker, ButtonPrimary } from "Components";
import { Colors, METRICS } from "Themes";
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

  render() {
    const { photo_ktp, photo_face, is_can_continue } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <SignupWrapper title="Unggah foto" currentPosition={2}>
          <Text
            style={{
              color: Colors.veggie_dark,
              fontFamily: "CircularStd-Book",
              fontSize: 13,
              marginBottom: METRICS.SMALL,
            }}
          >
            Ambil Foto KTP
          </Text>
          <ImagePicker
            name="photo_ktp"
            onChange={this.onPhotoChange}
            data={photo_ktp}
            titleBottomSheet="Ambil foto KTP"
            isMultiplePick={false}
            isShowCancelButton={false}
            isShowGallery
            styleContainer={{
              marginBottom: METRICS.LARGE,
            }}
          />

          <Text
            style={{
              color: Colors.veggie_dark,
              fontFamily: "CircularStd-Book",
              fontSize: 13,
              marginBottom: METRICS.SMALL,
            }}
          >
            Ambil Foto Muka
          </Text>
          <ImagePicker
            name="photo_face"
            onChange={this.onPhotoChange}
            data={photo_face}
            titleBottomSheet="Ambil foto muka"
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
          title="Selanjutnya"
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(null, null)(withNavigation(withNoHeader(PhotoForm)));
