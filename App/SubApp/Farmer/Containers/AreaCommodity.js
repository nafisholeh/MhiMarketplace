import React, { Component, Fragment } from 'react';
import { View, ScrollView } from 'react-native';
import { Query } from 'react-apollo';

import {
  ButtonPrimary,
  RadioButton,
  ProductHorizontalWrapper,
  InputText,
  InputPicker,
  QueryEffectSection,
} from 'Components';
import AppConfig from 'Config/AppConfig';
import { moderateScale, screenWidth } from 'Lib';
import { HillHeaderWrapper, AreaItem } from 'CommonFarmer';
import { FETCH_COMMODITIES } from 'SubApp/Farmer/GraphQL/Commodity/Query';

class AreaCommodity extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }
  
  state = {
    commodity: null,
    trigger_fetch_commodity: false,
    trigger_reset_commodity: false,
    height: moderateScale(100),
  };
  
  componentDidMount = () => {
    this.setState(prevState => {
      return ({
        trigger_fetch_commodity: !prevState.trigger_fetch_commodity
      });
    });
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
  
  onSelectionChange = (value, stateName) => {
    this.setState({ [stateName]: value });
  };

  render() {
    const {
      commodity,
      trigger_fetch_commodity,
      trigger_reset_commodity,
      height,
    } = this.state;
    return (
      <HillHeaderWrapper
        title="Komoditas yang ditanam"
        ChildrenBottom={this.renderBottom}
      >
        <ProductHorizontalWrapper
          width={screenWidth - moderateScale(20)}
          height={height}
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
            query={FETCH_COMMODITIES}
            triggerFetch={trigger_fetch_commodity}
            styleContainer={{
              marginHorizontal: 0,
            }}
            styleText={{
              marginHorizontal: 0,
            }}
            isManualInputDisplayed
            onShowManualInput={() => this.setState({ height: moderateScale(150) })}
            onHideManualInput={() => this.setState({ height: moderateScale(100) })}
          />
        </ProductHorizontalWrapper>
      </HillHeaderWrapper>
    );
  }
}

export default AreaCommodity;
