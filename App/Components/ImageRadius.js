import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
var _ = require("lodash");

/*
 * Menampilkan image dengan border radius yg bisa diubah utk masing2 sudutnya
 * untuk Android dan iOS
 */
export default class ImageRadius extends Component {
  render() {
    return (
      <View
        style={
          this.props.height
            ? styles(this.props).imageContainer
            : styles(this.props).imageContainerAuto
        }
        borderTopLeftRadius={this.props.borderTopLeftRadius}
        borderTopRightRadius={this.props.borderTopRightRadius}
        borderBottomLeftRadius={this.props.borderBottomLeftRadius}
        borderBottomRightRadius={this.props.borderBottomRightRadius}
      >
        <Image
          style={
            this.props.height
              ? styles(this.props).image
              : styles(this.props).imageAuto
          }
          {...this.props}
        />
      </View>
    );
  }
}

const styles = (props) =>
  StyleSheet.create({
    imageContainer: {
      width: props.width,
      height: props.height,
      overflow: "hidden",
    },
    imageContainerAuto: {
      overflow: "hidden",
    },
    image: {
      width: props.width,
      height: props.height,
      borderTopLeftRadius: props.borderTopLeftRadius,
      borderTopRightRadius: props.borderTopRightRadius,
      borderBottomLeftRadius: props.borderBottomLeftRadius,
      borderBottomRightRadius: props.borderBottomRightRadius,
    },
    imageAuto: {
      borderTopLeftRadius: props.borderTopLeftRadius,
      borderTopRightRadius: props.borderTopRightRadius,
      borderBottomLeftRadius: props.borderBottomLeftRadius,
      borderBottomRightRadius: props.borderBottomRightRadius,
    },
  });

ImageRadius.propTypes = {};

ImageRadius.defaultProps = {
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
};
