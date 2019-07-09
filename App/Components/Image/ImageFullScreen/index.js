import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modalbox';

import { Colors, Metrics, Images } from 'Themes';
import { isLocalImage, isServerImage } from '../helper';

class ImageFullscreen extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      isShown: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.data !== nextProps.data) {
      if(nextProps.data !== null) {
        this.setState({
          data: this._addUrlProps(nextProps.data)
        })
      }
    }
    if(this.props.isShown !== nextProps.isShown) {
      this.setState({
        isShown: nextProps.isShown,
        data: this._addUrlProps(nextProps.data)
      })
    }
  }

  _addUrlProps(data) {
    let output = []
    data.map((item) => {
      let temp = null
      if(isLocalImage(item)) temp = item
      else if(isServerImage(item)) temp = item
      else temp = item
      output.push({url: temp, width:Metrics.deviceWidth, height:Metrics.deviceHeight/2})
    })
    return output
  }

  _onModalToggle() {
    this.props.onToggle()
  }

  render () {
    return (
      <Modal
        isOpen={this.state.isShown}
        position={'bottom'}
        backdrop={true}
        coverScreen={true}
        entry={'bottom'}
        backdropColor={'grey'}
        backButtonClose={true}
        swipeToClose={true}
        animationDuration={300}>
        { this.state.data &&
          <ImageViewer
            imageUrls={this.state.data}
            index={this.props.currentImage}
            onCancel={() => this._onModalToggle()}
            failImageSource={Images.no_foto}
          />
        }
       </Modal>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

ImageFullscreen.propTypes = {
  data: PropTypes.oneOfType([ PropTypes.array, PropTypes.object, PropTypes.string ]),
  isShown: PropTypes.bool,
  currentImage: PropTypes.number,
  onToggle: PropTypes.func
};

ImageFullscreen.defaultProps = {
  currentImage: 0
};

export default ImageFullscreen;