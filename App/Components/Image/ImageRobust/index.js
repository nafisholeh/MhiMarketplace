import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
var _ = require('lodash');

import { Colors, Metrics, Images } from 'Themes';
import { getFirstParam, isLocalImage, isAssetImage } from '../helper';

class ImageRobust extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      source: null,
      fetching: false,
      finished: false,
      loaded: 0, total: 0
    }
  }

  componentDidMount() {
    this._showMainImage()
  }

  _showMainImage() {
    const { path, urlBase, urlNormalizer } = this.props;
    if(_.isEmpty(path)) {
      this._showDefaultImage()
      return
    }
    if(isAssetImage(path)) {
      this.setState({ source: path })
    } else if(isLocalImage(path)) {
      this.setState({ source: { uri: path }})
    } else {
      this.setState({ source:
        { uri: (urlBase ? urlBase : '') + urlNormalizer(path) }
      })
    }
  }

  _showDefaultImage() {
    const { urlDefault } = this.props;
    if(_.isNil(urlDefault)) return
    if(isAssetImage(urlDefault)) {
      this.setState({ source: urlDefault })
    } else {
      this.setState({ source: { uri: urlDefault }})
    }
  }

  _onStartFetching() {
    this.setState({ fetching: true, finished: false })
  }

  _onFetchingProgress(e) {
    this.setState({ loaded: e.nativeEvent.loaded, total: e.nativeEvent.total })
  }

  _onFinishFetching() {
    this.setState({ fetching: false, finished: true })
  }

  _onErrorFetching() {
    this._showDefaultImage()
  }

  render () {
    const { source } = this.state;
    const { width, height, borderRadius, styleContainer, style } = this.props;
    return (
      <View style={[ styleContainer ]}>
        <FastImage
          style={[ { width, height }, style ]}
          borderRadius={borderRadius}
          source={source}
          resizeMode={FastImage.resizeMode.cover}
          onLoadStart={() => this._onStartFetching()}
          onProgress={e => this._onFetchingProgress(e)}
          onLoad={() => {}}
          onError={() => this._onErrorFetching()}
          onLoadEnd={() => this._onFinishFetching()} />
      </View>
    )
  }
}

ImageRobust.propTypes = {
  name: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  path: PropTypes.oneOfType([ PropTypes.object, PropTypes.array, PropTypes.string ]),
  urlBase: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  urlDefault: PropTypes.oneOfType([ PropTypes.object, PropTypes.string, PropTypes.number ]),
  urlNormalizer: PropTypes.func,
  style: PropTypes.oneOfType([ PropTypes.array, PropTypes.object, PropTypes.string, PropTypes.number ]),
  styleContainer: PropTypes.oneOfType([ PropTypes.array, PropTypes.object, PropTypes.string, PropTypes.number ]),
  token: PropTypes.string,
  borderRadius: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
}

ImageRobust.defaultProps = {
  name: 'Foto',
  urlNormalizer: getFirstParam,
  style: { flex: 1 },
  styleContainer: { flex: 1 },
  borderRadius: 1,
  width: 100,
  height: 100,
}

export default ImageRobust;
