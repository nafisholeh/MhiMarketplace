import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import ViewOverflow from 'react-native-view-overflow';

import { Colors, Images, METRICS } from 'Themes';
import { moderateScale } from 'Lib';
import BoxShadow from './BoxShadow';

/*
 * this.props.style:
 *   - Set margin on view
 *   - Don't set height and width
 * this.props.children:
 *   - Either set with View or Touchable
 * wanted a rounded corner:
 *   - set borderRadius and backgroundColor on this.props.children style
 * set this.props.mainColor, to prevent back shadow shown when Touchable is in use for this.props.children
 * jika ingin width menyesuaikan ukuran persenan layar, set this.props.scaleFactor ke 0 juga
 */
export default class ViewShadow extends Component {
  render() {
    const { posYAndroid } = this.props;
    if (Platform.OS === 'ios') {
      return (
        <View style={[styles(this.props).containerIOS, this.props.style]}>
          <View style={styles(this.props).shadowIOS} />
          <View style={styles(this.props).backLayerIOS} />
          <View style={[styles(this.props).children, this.props.styleChildren]}>
            {this.props.children}
          </View>
        </View>
      );
    } else {
      return (
        <ViewOverflow
          style={[styles(this.props).containerAndroid, this.props.style]}
        >
          <BoxShadow
            setting={{
              width: moderateScale(this.props.width, this.props.scaleFactor),
              height: moderateScale(this.props.height),
              x: 0,
              y: posYAndroid || 0,
              opacity: this.props.shadowOpacityAndroid,
              border: this.props.shadowRadiusAndroid,
              color: this.props.shadowColor,
              radius: this.props.shadowBorderRadiusAndroid,
            }}
          >
            <View
              style={[styles(this.props).children, this.props.styleChildren]}
            >
              {this.props.children}
            </View>
          </BoxShadow>
        </ViewOverflow>
      );
    }
  }
}

const styles = (props) =>
  StyleSheet.create({
    backLayerIOS: {
      backgroundColor: props.mainColor,
      borderRadius: props.shadowBorderRadiusIOS,
      bottom: 0,
      left: 0,
      opacity: 0.9,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    children: {
      backgroundColor: props.mainColor,
      borderRadius: props.borderRadius,
      height: moderateScale(props.height),
      width: moderateScale(props.width, props.scaleFactor),
    },
    containerAndroid: {
      alignSelf: 'center',
      height: moderateScale(props.height),
      width: moderateScale(props.width, props.scaleFactor),
    },
    containerIOS: {
      alignItems: 'center',
      height: moderateScale(props.height),
      width: moderateScale(props.width, props.scaleFactor),
    },
    shadowIOS: {
      backgroundColor: props.shadowColor,
      borderRadius: props.shadowBorderRadiusIOS,
      height: moderateScale(props.height) * props.shadowHeightIOS,
      left: 0,
      marginHorizontal:
        moderateScale(props.width, props.scaleFactor) *
        props.shadowHorizontalMarginIOS,
      position: 'absolute',
      right: 0,
      shadowColor: props.shadowColor,
      shadowOffset: {
        width: 0,
        height: props.shadowOffsetHeight,
      },
      shadowOpacity: props.shadowOpacityIOS,
      shadowRadius: props.shadowRadiusIOS,
      top: moderateScale(props.height) * props.posYIOS,
    },
  });

ViewShadow.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  styleChildren: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  mainColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
  shadowColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
  shadowOpacityIOS: PropTypes.number, // transparency level of shadow
  shadowOpacityAndroid: PropTypes.number, // transparency level of shadow
  width: PropTypes.number.isRequired, // width of container
  height: PropTypes.number.isRequired, // height of container
  shadowBorderRadiusIOS: PropTypes.number, // border radius of shadow
  shadowBorderRadiusAndroid: PropTypes.number,
  shadowRadiusIOS: PropTypes.number, // height of shadow
  shadowRadiusAndroid: PropTypes.number,
  posYIOS: PropTypes.number, // marginTop of shadow, in percentage format
  posYAndroid: PropTypes.number,
  shadowHorizontalMarginIOS: PropTypes.number, // horizontal margin of shadow
  shadowHorizontalMarginAndroid: PropTypes.number,
  shadowHeightIOS: PropTypes.number,
  shadowHeightAndroid: PropTypes.number,
  shadowOffsetHeight: PropTypes.number, // shadow offset height on iOS
  borderRadius: PropTypes.number, // if you want container view border rounded, set this
  scaleFactor: PropTypes.number, // atur scale dari width containernya
};

ViewShadow.defaultProps = {
  mainColor: Colors.white, // background color appeared when touchable is clicked
  shadowColor: Colors.text_primary,
  shadowOpacity: 0.7,
  shadowRadiusIOS: 5,
  shadowRadiusAndroid: 10,
  shadowBorderRadiusIOS: 3,
  shadowBorderRadiusAndroid: 3,
  posYIOS: 0.9,
  posYAndroid: 0.9,
  shadowHorizontalMarginIOS: 0.18,
  shadowHorizontalMarginAndroid: 0.23,
  shadowHeightIOS: 0.1,
  shadowHeightAndroid: 0.1,
  shadowOffsetHeight: 2,
  borderRadius: 0,
  scaleFactor: 0,
};
