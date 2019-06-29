import React, { Component } from 'react';
import { View, TextInput, Image } from 'react-native';

import ViewShadow from './Shadow/ViewShadow';
import { Colors, Images } from 'Themes';
import { moderateScale } from 'Lib';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  
  onChangeText = value => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <ViewShadow
        width={275}
        height={50}
        borderRadius={4}
        shadowBorderRadiusAndroid={3}
        shadowRadiusAndroid={18}
        posYAndroid={0.82}
        shadowHorizontalMarginAndroid={0}
        shadowOpacityAndroid={0.1}
        mainColor={Colors.white}
        shadowColor={Colors.brown_light}
        styleChildren={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: moderateScale(10),
        }}
      >
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          onChangeText={this.onChangeText}
          placeholder="Cari produk"
          selectTextOnFocus
          value={value}
          style={{
            flex: 1,
            marginRight: moderateScale(5),
          }}
        />
        <Image
          source={Images.search}
          style={{
            width: moderateScale(20),
            height: moderateScale(20),
            tintColor: Colors.icon,
          }}
        />
      </ViewShadow>
    );
  }
}

export default SearchBar;
