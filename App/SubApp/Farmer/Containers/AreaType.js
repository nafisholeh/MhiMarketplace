import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import {
  ButtonPrimary,
  RadioButton,
  ProductHorizontalWrapper,
  InputText,
} from 'Components';
import { moderateScale, screenWidth } from 'Lib';
import { HillHeaderWrapper, AreaItem } from 'CommonFarmer';

class AreaType extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }

  state = {
    type_own: false,
    type_rent: true,
    type_rented: false,
    name: '',
    name_error: null,
  };

  renderBottom = () => {
    const { type_rented } = this.state;
    return (
      <ButtonPrimary
        title={type_rented ? "Selesai" : "Lanjut"}
        onPress={() => {}}
      />
    );
  };

  onSelectionChange = (value, stateName) => {
    this.setState({ [stateName]: value });
  };

  render() {
    const {
      type_own,
      type_rent,
      type_rented,
      name,
      name_error,
    } = this.state;
    return (
      <HillHeaderWrapper
        title="Jenis Lahan"
        ChildrenBottom={this.renderBottom}
      >
        <ProductHorizontalWrapper
          width={screenWidth - moderateScale(20)}
          height={moderateScale(150)}
          borderRadius={10}
          shadowRadiusAndroid={13}
          style={{
            marginBottom: moderateScale(5),
            marginBottom: moderateScale(10),
            marginHorizontal: moderateScale(10),
          }}
          styleChildren={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            paddingHorizontal: moderateScale(15),
            paddingVertical: moderateScale(15),
          }}
        >
          <RadioButton
            title="Milik sendiri"
            isSelected={type_own}
            onPress={() => this.setState({
              type_own: true,
              type_rent: false,
              type_rented: false,
            })}
          />
          <RadioButton
            title="Sewa"
            isSelected={type_rent}
            onPress={() => this.setState({
              type_own: false,
              type_rent: true,
              type_rented: false,
            })}
          />
          <RadioButton
            title="Disewakan"
            isSelected={type_rented}
            onPress={() => this.setState({
              type_own: false,
              type_rent: false,
              type_rented: true,
            })}
          />
        </ProductHorizontalWrapper>
        <ProductHorizontalWrapper
          width={screenWidth - moderateScale(20)}
          height={moderateScale(100)}
          borderRadius={10}
          shadowRadiusAndroid={13}
          style={{
            marginBottom: moderateScale(5),
            marginBottom: moderateScale(10),
            marginHorizontal: moderateScale(10),
          }}
          styleChildren={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'stretch',
            paddingHorizontal: moderateScale(15),
            paddingTop: moderateScale(20),
            paddingBottom: moderateScale(5),
          }}
        >
          {!type_own
            ? (
              <InputText
                name="name"
                title={type_rent ? "Nama pemilik" : "Nama penyewa"}
                placeholder="Nama sesuai KTP"
                value={name || ''}
                error={name_error}
                onChangeText={this.onSelectionChange}
                returnKeyType="next"
                styleContainer={{
                  marginHorizontal: 0,
                }}
              />
            )
            : (
              <View />
            )
          }
        </ProductHorizontalWrapper>
      </HillHeaderWrapper>
    );
  }
}

export default AreaType;
