import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Images, Colors } from 'Themes';
import { moderateScale } from 'Lib';
import { ProductHorizontalWrapper } from 'Components';
import { HillHeaderWrapper, AreaItem } from 'CommonFarmer';

class AreaList extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }
  
  renderBottom = () => (
    <View
      style={{
        backgroundColor: 'red',
        width: 20,
        height: 20,
      }}
    >
      
    </View>
  );

  render() {
    const { navigation } = this.props;
    return (
      <HillHeaderWrapper
        title="Area Lahan"
        ChildrenBottom={this.renderBottom}
      >
        <AreaItem
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('AreaDraw')}
        >
          <Image
            source={Images.plus}
            style={{
              width: moderateScale(35),
              height: moderateScale(35),
              tintColor: Colors.disabled_light,
            }}
          />
        </AreaItem>
        <AreaItem />
          
        <AreaItem /><AreaItem /><AreaItem /><AreaItem /><AreaItem />
      </HillHeaderWrapper>
    );
  }
}

export default withNavigation(AreaList);