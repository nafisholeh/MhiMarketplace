import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActionSheetIOS, Platform, StyleSheet, View, Animated, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import ImagePickers from 'react-native-image-crop-picker';
import BottomSheet from 'react-native-js-bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
var _ = require('lodash');

import { Colors, Metrics, Images } from 'Themes';
import ImageFlexible from '../ImageFlexible';
import ImageGrid from '../ImageGrid';

class ImagePicker extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      image: this.props.data ? this.props.data : [],
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.isStartPick !== this.props.isStartPick) {
      this._startPick()
    }
  }

  // tampilkan opsi cara ambil gambar untuk ios
  _onOpenOptionIOS = () => {
    const options = [
      'Kamera',
      'Pilih dari Galeri Foto',
      'Batal'
    ]
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 2
      },
      (buttonIndex: number) => {
        if (buttonIndex === 0) {
          ImagePickers
          .openCamera({
            compressImageQuality: 0.5,
          })
          .then((image: Object) =>
            this._saveImages(image)
          )
          .catch((error) => {

          })
        } else if (buttonIndex === 1) {
          ImagePickers
          .openPicker({
            multiple: this.props.isMultiplePick ? true : false,
            compressImageQuality: 0.5,
          })
          .then(image =>
            this._saveImages(image)
          )
          .catch((error) => {

          })
        } else {
          this._onCancelPick()
        }
      }
    )
  }

  // tampilkan opsi cara ambil gambar untuk android
  _onOpenOptionAndroid = (): Array<Object> => {
    const options = ['Kamera', 'Pilih dari Galeri Foto']
    return [
      {
        title: options[0],
        onPress: () =>
          ImagePickers
          .openCamera({
            compressImageQuality: 0.5,
          })
          .then((image: Object) =>
            this._saveImages(image)
          )
          .catch((error) => {

          }) && this.bottomSheet.close(),
        icon: (
          <MaterialIcons name={'photo-camera'} size={24} style={styles.icon} />
        )
      },
      {
        title: options[1],
        onPress: () =>
          ImagePickers
          .openPicker({
            multiple: this.props.isMultiplePick ? true : false,
            compressImageQuality: 0.5,
          })
          .then(image =>
            this._saveImages(image)
          )
          .catch((error) => {

          }) && this.bottomSheet.close(),
        icon: (
          <MaterialIcons name={'photo-library'} size={24} style={styles.icon} />
        )
      }
    ]
  }

  _onCancelPick() {
    if(this.props.hasOwnProperty('onPressCancel')) {
      this.props.onPressCancel()
    }
  }

  // crop satu image yang baru dipilih
  _onOpenCropImage() {
    ImagePickers.openCropper({
      path: this.state.image[0],
      width: 200,
      height: 200,
      cropperCircleOverlay: true,
      cropperChooseText: 'Ok',
      cropperCancelText: 'Batal'
    })
    .then(image => {
      this._replaceImages(image)
    })
    .catch((error) => {

    })
  }

  // ganti dengan image yang hasil dicrop
  _replaceImages = (image) => {
    let outputImages = []
    outputImages.push(this._getImagePath(image))
    this.setState({ image: outputImages }, () => {
      this.props.onChange(this.state.image)
    })
  }

  // simpan image ke state
  _saveImages = (images) => {
    let newImages = []
    if(_.isArray(images)) images.map((item) => newImages.push(this._getImagePath(item)))
    else newImages.push(this._getImagePath(images))
    
    let outputImages = this.props.isMultiplePick ?
                          [...this.state.image, newImages] :
                          newImages
    this.setState({ image: outputImages }, () => {
      if(this.props.isCropping) this._onOpenCropImage()
      if(!this.props.isCropping) this.props.onChange(this.state.image)
    })
  }

  // tambahkan ekstensi file didepan path image nya
  _getImagePath(image) {
    if(_.isNull(image)) return '';
    const { path = '' } = image || {};
    return path.includes('file://') ? image.path : 'file://'+image.path;
  }

  // tereksekusi ketika image ada yg terhapus, sebab fitur hapus pada ImageGrid
  _onDataChange = (image) => {
    this.setState({ image: image })
    this.props.onChange(image)
  }

  // mulai mengambil image
  _startPick() {
    if(Platform.OS === 'ios') this._onOpenOptionIOS()
    else this.bottomSheet.open()
  }

  // render image gallery untuk multiple image
  _renderGallery = () => {
    console.tron.log('ImagePicker/_renderGallery')
    if(!this.props.isCustomComponent) {
      if(this.props.isMultiplePick) {
        return (
          <View>
            { this.props.isShowGallery &&
              <ImageGrid
                data={this.state.image}
                onDataChange={this._onDataChange}
                styleContainer={{flex:1}}
              />
            }
            <View style={this.props.styleButtonContainer}>
              { this.props.isShowCancelButton &&
                <TouchableOpacity
                  onPress={this.props.onPressCancel}
                  style={this.props.styleButtonCancel}
                >
                  <Text>{this.props.titleButtonCancel}</Text>
                </TouchableOpacity>
              }
              <TouchableOpacity
                onPress={Platform.OS === 'ios' ? this._onOpenOptionIOS : () => this.bottomSheet.open()}
                style={this.props.styleButtonOk}
              >
                <Text>{this.props.titleButtonOk}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      } else {
        return (
          <ImageFlexible
            path={this.state.image[0]}
            urlDefault={Images.add_image}
            onPress={Platform.OS === 'ios' ? this._onOpenOptionIOS : () => this.bottomSheet.open()}
          />
        )
      }
    } else {
      return (
        <this.props.customComponent
          onStartPick={() => {
            if(this.props.hasOwnProperty('onPressPicker')) this.props.onPressPicker()
            this._startPick()
          }}
        />
      )
    }
  }

  render () {
    console.tron.log('ImagePicker/render', this.state, this.props);
    return (
      <View style={this.props.styleContainer}>
        { this.props.title &&
          <Text style={[{color: 'gray'}]}>{this.props.title}</Text>
        }
        {
          this._renderGallery()
        }
        {Platform.OS === 'android' ? (
          <BottomSheet
            ref={(ref: any) => { this.bottomSheet = ref }}
            title={this.props.titleBottomSheet}
            options={this._onOpenOptionAndroid()}
            coverScreen={true}
          />
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({ });

ImagePicker.propTypes = {
  onChange: PropTypes.func,
  title: PropTypes.string,
  titleBottomSheet: PropTypes.string,
  data: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]), // format: {path: xxx.jpg, type: xxx}
  styleContainer: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array ]),
  styleButtonContainer: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array ]),
  styleButtonCancel: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array ]),
  styleButtonOk: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array ]),
  colorButtonCancel: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  colorButtonOk: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  isCropping: PropTypes.bool,     // kasih fitur crop image, hanya bisa diaktifkan kalau isMultiple diset ke false
  isShowGallery: PropTypes.bool,  // tampilkan galeri foto atau tidak
  isShowCancelButton: PropTypes.bool, // tampilkan tombol batal disebelah tombol ambil image
  isStartPick: PropTypes.bool,  // trigger retake foto dari parent's component
  onPressCancel: PropTypes.func,
  onPressPicker: PropTypes.func,
  titleButtonOk: PropTypes.string,
  titleButtonCancel: PropTypes.string,
  isMultiplePick: PropTypes.bool,
  isCustomComponent: PropTypes.bool,
  customComponent: PropTypes.func,
};

ImagePicker.defaultProps = {
  isMultiple: true,
  isCropping: false,
  isShowGallery: true,
  isShowCancelButton: false,
  colorButtonCancel: 'gray',
  colorButtonOk: 'blue',
  titleButtonOk: 'Ambil Foto',
  titleButtonCancel: 'Batal',
  titleBottomSheet: '',
  isMultiplePick: true,
  isCustomComponent: false,
};

export default ImagePicker;
