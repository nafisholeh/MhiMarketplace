import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { func, string, bool, oneOfType, number } from 'prop-types';

import SearchBar from './SearchBar';
import { Images, Metrics } from 'Themes';
import { moderateScale } from 'Lib';
    
class ConsumerPageHeader extends Component {
  render() {
    const { onIconPress, onSearch, icon } = this.props;
    return (
      <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: moderateScale(20),
          paddingBottom: moderateScale(25),
          zIndex: 2,
        }}
      >
        <TouchableOpacity onPress={() => onIconPress()}>
          <Image
            source={icon}
            style={{
              height: 30,
              width: 35,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <SearchBar
          onSearch={term => onSearch(term)}
        />
      </View>
    )
  }
}

ConsumerPageHeader.propTypes = {
  icon: oneOfType([string, number]),
  onIconPress: func,
  onSearch: func,
}

export default ConsumerPageHeader;
