import React, { Component } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';

import { ProductVerticalWrapper } from 'Components';
import { moderateScale } from 'Lib';
import { Colors, Images } from 'Themes';

class AreaDrawItem extends Component {
  state = {
    value: '',
  };

  render() {
    const { value } = this.state;
    const { inputLabel, title, isFilled, onPress } = this.props;
    return (
      <View
        style={{
          marginHorizontal: moderateScale(12),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontFamily: 'CircularStd-Book',
              fontSize: 14,
              color: 'rgba(0,0,0,0.68)',
            }}
            numberOfLines={1}
          >
            {inputLabel}
          </Text>
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="isi disini"
            label={inputLabel}
            onChangeText={(text) => this.setState({ value: text })}
            value={value || ''}
            returnKeyType="done"
            keyboardType="decimal-pad"
            selectTextOnFocus
            clearTextOnFocus
            style={{ flex: 1, textAlign: 'right', color: Colors.black, fontSize: 16 }}
          />
          {value ? (
            <Text
              style={{
                fontFamily: 'CircularStd-Book',
                fontSize: 16,
                color: 'rgba(0,0,0,0.3)',
              }}
              numberOfLines={1}
            >
              ha
            </Text>
          ) : (
            <Image
              source={Images.edit_small}
              style={{
                width: moderateScale(17),
                height: moderateScale(17),
                tintColor: 'rgba(0,0,0,0.3)',
              }}
            />
          )}
        </View>
        <ProductVerticalWrapper
          styleParent={{
            marginBottom: moderateScale(8)
          }}
          styleChildren={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          height={40}
          shadowRadiusAndroid={8}
          onPress={onPress}
        >
          <Text
            style={{
              fontFamily: 'CircularStd-Book',
              fontSize: 16,
              color: 'rgba(0,0,0,0.68)',
              marginRight: moderateScale(8),
            }}
            numberOfLines={1}
          >
            Gambar area
          </Text>
          <Image
            source={isFilled ? Images.map : Images.map_disabled}
            style={{
              width: moderateScale(20),
              height: moderateScale(20),
            }}
          />
        </ProductVerticalWrapper>
      </View>
    );
  }
}

export default AreaDrawItem;
