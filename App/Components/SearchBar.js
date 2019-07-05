import React, { Component } from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { func, bool } from 'prop-types';

import ViewShadow from './Shadow/ViewShadow';
import { Colors, Images } from 'Themes';
import { moderateScale, screenWidth } from 'Lib';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  
  onChangeText = value => {
    if (value === '' || !value) {
      const { onSearch } = this.props;
      if (onSearch) onSearch(value);
    }
    this.setState({ value });
  };
  
  onSearch = () => {
    const { value } = this.state;
    const { onSearch } = this.props;
    if (onSearch) onSearch(value);
  };

  render() {
    const { isFullWidth } = this.props;
    const { value } = this.state;
    return (
      <ViewShadow
        width={isFullWidth ? screenWidth - 40 : 275}
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
          returnKeyType='search'
          clearTextOnFocus
          onSubmitEditing={this.onSearch}
          value={value}
          style={{
            flex: 1,
            marginRight: moderateScale(5),
          }}
        />
        <TouchableOpacity
          onPress={this.onSearch}
        >
          <Image
            source={Images.search}
            style={{
              width: moderateScale(20),
              height: moderateScale(20),
              tintColor: Colors.icon,
            }}
          />
        </TouchableOpacity>
      </ViewShadow>
    );
  }
}

SearchBar.propTypes = {
  onSearch: func,
  isFullWidth: bool,
};

export default SearchBar;
