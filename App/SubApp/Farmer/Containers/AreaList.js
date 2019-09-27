import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { getAreas } from 'Redux/FarmerSignupRedux';
import { Images, Colors } from 'Themes';
import { moderateScale } from 'Lib';
import { ProductHorizontalWrapper } from 'Components';
import { HillHeaderWrapper, AreaItem, SignupBottomButton } from 'CommonFarmer';

class AreaList extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }
  
  renderBottom = () => (
    <SignupBottomButton
      onPressSkip={() => {}}
      onPressNext={() => {}}
    />
  );

  render() {
    const { navigation, areas } = this.props;
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
        
        {Array.isArray(areas)
          && areas.map((item, index) => {
            const { polygon, size, commodity_name } = item;
            return (
              <AreaItem
                title={`Lahan ${index + 1}`}
                polygon={polygon}
                size={size}
                commodity={commodity_name}
              />
            );
          })
        }
      </HillHeaderWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  areas: getAreas(),
});

export default connect(mapStateToProps, null)(withNavigation(AreaList));
