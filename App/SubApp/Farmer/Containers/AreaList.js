import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { getAreas, isAnyAreaDrawn } from 'Redux/FarmerSignupRedux';
import { Images, Colors, Fonts } from 'Themes';
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
  
  renderBottom = () => {
    const { navigation, areas, isAnyAreaDrawn } = this.props;
    return (
      <SignupBottomButton
        isShowSkip={!isAnyAreaDrawn}
        isShowNext={isAnyAreaDrawn}
        onPressSkip={() => navigation.navigate('FarmerFinalConfirm')}
        onPressNext={() => navigation.navigate('FarmerFinalConfirm')}
        nextTitle="Selesai"
      />
    );
  };

  render() {
    const { navigation, areas, isAnyAreaDrawn } = this.props;
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
        
        {isAnyAreaDrawn
          ? ( 
            areas.map((item, index) => {
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
          )
          : (
            <Text
              style={{
                ...Fonts.INSTRUCTION,
                marginHorizontal: moderateScale(5),
                marginTop: moderateScale(10),
              }}
            >
              Tekan tombol diatas untuk menambahkan area lahan
            </Text>
          )
        }
        
      </HillHeaderWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  areas: getAreas(),
  isAnyAreaDrawn: isAnyAreaDrawn(),
});

export default connect(mapStateToProps, null)(withNavigation(AreaList));
