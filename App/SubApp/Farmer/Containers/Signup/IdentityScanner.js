import React, { Component, Fragment } from "react";
import { View, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
// import TesseractOcr, { LANG_INDONESIAN } from "react-native-tesseract-ocr";
import { DotIndicator } from "react-native-indicators";
// import RNTextDetector from "react-native-text-detector";

import { ImagePicker } from "Components";
import { METRICS, Colors } from "Themes";
import { withNoHeader } from "Hoc";

class IdentityScanner extends Component {
  state = {
    photo_ktp: null,
    recognizedText: "",
    isRecognizing: false,
  };

  onPhotoChange = async (name, raw = []) => {
    if (!Array.isArray(raw)) return;
    const photos = raw.map((item, i) => {
      const { mime, path, data } = item;
      return { mime, path, data };
    });
    this.setState({ [name]: photos });
    // await this.recognizeTextFromImage(photos[0].path);
    await this.detectText(photos[0].path);
  };

  recognizeTextFromImage = async (path) => {
    try {
      this.setState({ isRecognizing: true });
      const tesseractOptions = {};
      // const recognizedText = await TesseractOcr.recognize(
      //   path,
      //   LANG_INDONESIAN,
      //   tesseractOptions
      // );
      this.setState({ recognizedText, isRecognizing: false });
    } catch (err) {
      this.setState({ recognizedText: "", isRecognizing: false });
    }
  };

  detectText = async (path) => {
    try {
      this.setState({ isRecognizing: true });
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      // const recognizedText = await RNTextDetector.detect({
      //   imagePath: path,
      //   language: "ind",
      //   pageIteratorLevel: "textLine",
      //   pageSegmentation: "SparseTextOSD",
      //   charWhitelist: "01234567",
      //   charBlacklist: "01234567",
      //   imageTransformationMode: 2, // optional | 0 => none | 1 => g8_grayScale | 2 => g8_blackAndWhite
      // });
      // console.tron.log("recognizedText: ", recognizedText);
      // this.setState({ recognizedText, isRecognizing: false });
    } catch (e) {
      // console.tron.log("error: ", e);
      this.setState({ recognizedText: "gagal", isRecognizing: false });
    }
  };

  renderContent = () => {
    const { photo_ktp, recognizedText, isRecognizing } = this.state;
    if (photo_ktp) {
      if (isRecognizing) {
        return (
          <Fragment>
            <DotIndicator
              count={4}
              size={10}
              color={Colors.GREEN_BG_PRIMARY}
              animationDuration={800}
            />
          </Fragment>
        );
      }
      return (
        <Fragment>
          <Text>Yang dibaca oleh aplikasi:</Text>
          <Text style={{ fontSize: 20 }}>{recognizedText || "..."}</Text>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Text>Coba deh klik gambar kamera dulu...</Text>
      </Fragment>
    );
  };

  render() {
    const { photo_ktp } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        <ImagePicker
          name="photo_ktp"
          onChange={this.onPhotoChange}
          data={photo_ktp}
          titleBottomSheet="ambil foto"
          isMultiplePick={false}
          isShowCancelButton={false}
          isShowGallery
          imageQuality={1}
          styleContainer={{
            flex: 1,
          }}
        />
        <View style={{ padding: 20 }}>{this.renderContent()}</View>
      </ScrollView>
    );
  }
}

export default connect(null, null)(withNoHeader(IdentityScanner));
