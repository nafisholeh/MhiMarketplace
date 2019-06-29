import React, { Component } from 'react';
import { Image } from 'react-native';

import { Images } from 'Themes';

class ProductImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  
  componentDidMount() {
    this.setState({ error: false });
  }

  onError = (error) => {
    const { source } = this.props;
    this.setState({ error: true });
  };

  render() {
    const { style, source } = this.props;
    const { error } = this.state;
    let imageSource = source;
    if (error) {
      imageSource = Images.error;
    } else if (source) {
      imageSource = { uri: source };
    } else {
      imageSource = Images.no_photo;
    }
    return (
      <Image
        source={imageSource}
        onLoadStart={(e) => { }}
        onLoadEnd={(e) => { }}
        onLoad={(e) => { }}
        onError={(e) => this.onError(e)}
        style={style}
      />
    );
  }
}

export default ProductImage;
