import React, { PureComponent } from 'react'
import { object, string, array, number, oneOfType, func } from 'prop-types'
import { Platform, StyleSheet, View, Text, ActivityIndicator, Image, TextInput, TouchableOpacity } from 'react-native'
import FlexImage from 'react-native-flex-image';
import { DotIndicator, WaveIndicator } from 'react-native-indicators';
var _ = require('lodash');

import { Colors, Metrics, Images } from 'Themes';
import { getFirstParam, isLocalImage, isAssetImage } from '../helper';

export default class ImageFlexible extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      source: null,
      fetching: false,
      finished: false,
      loaded: 0, total: 0
    }
  }

  componentWillMount() {
    this._showMainImage()
  }

  _showMainImage() {
    const { path, urlNormalizer, urlBase } = this.props;
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
        { uri: urlBase + urlNormalizer(path) }
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

  _getLoadingComponent() {
    const { loadingComponent, loadingColor } = this.props;
    switch(loadingComponent) {
      case 'wave':
        return <WaveIndicator color={loadingColor} count={4} size={40} />
      case 'dot':
        return <DotIndicator color={loadingColor} count={4} size={4} />
      default: {
        return <ActivityIndicator color={loadingColor} size='large' />
      }
    }
  }

  render () {
    const { source } = this.state;
    const { style, onPress } = this.props;
    let loading = this._getLoadingComponent()
    if (!source) return null;
    return (
      <FlexImage
        style={style}
        source={source}
        loadingComponent={loading}
        onPress={onPress}
      />
    );
  }
}

ImageFlexible.propTypes = {
  name: oneOfType([ object, string ]),
  path: oneOfType([ object, array, string ]),
  urlBase: oneOfType([ object, string ]),
  urlDefault: oneOfType([ object, string, number ]),
  urlNormalizer: func,
  style: oneOfType([ array, object, string, number ]),
  styleContainer: oneOfType([ array, object, string, number ]),
  token: string,
  loadingComponent: string,
  loadingColor: oneOfType([ number, string ]),
  onPress: func,
}

ImageFlexible.defaultProps = {
  name: 'Foto',
  urlNormalizer: getFirstParam,
  style: { flex: 1 },
  styleContainer: { flex: 1 },
  loadingComponent: 'default',
  loadingColor: 'red',
}
