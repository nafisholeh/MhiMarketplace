import React, { Component, Fragment } from 'react';
import { View, ScrollView } from 'react-native';

import {
  ButtonPrimary,
  RadioButton,
  ProductHorizontalWrapper,
  InputText,
  InputPicker,
} from 'Components';
import AppConfig from 'Config/AppConfig';
import { moderateScale, screenWidth } from 'Lib';
import { HillHeaderWrapper, AreaItem } from 'CommonFarmer';

class AreaCommodity extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }
  
  state = {
    commodity: null,
  };

  renderBottom = () => {
    const { navigation } = this.props;
    return (
      <ButtonPrimary
        title="Selesai"
        onPress={() => navigation.navigate('Home')}
      />
    );
  };

  render() {
    const { commodity } = this.state;
    return (
      <HillHeaderWrapper
        title="Komoditas yang ditanam"
        ChildrenBottom={this.renderBottom}
      >
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
            paddingHorizontal: moderateScale(15),
            paddingTop: moderateScale(20),
            paddingBottom: moderateScale(5),
          }}
        >
          <InputPicker
            name="commodity"
            title="Komoditas"
            placeholder="Pilih komoditas"
            onSelectionChange={this.onSelectionChange}
            dataLocal={AppConfig.commodity}
            styleContainer={{
              marginHorizontal: 0,
            }}
            styleText={{
              marginHorizontal: 0,
            }}
          />
        </ProductHorizontalWrapper>
      </HillHeaderWrapper>
    );
  }
}

export default AreaCommodity;
