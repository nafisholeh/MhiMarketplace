import React, { Component } from 'react';
import { View } from 'react-native';

import { ProductHorizontalWrapper } from 'Components';
import { HillHeaderWrapper, AreaItem } from 'CommonFarmer';

class AreaList extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }

  render() {
    return (
      <HillHeaderWrapper
        contentContainerStyle={{}}
      >
        <AreaItem />
      </HillHeaderWrapper>
    );
  }
}

export default AreaList;
