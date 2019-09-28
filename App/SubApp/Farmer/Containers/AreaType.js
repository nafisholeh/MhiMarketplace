import React, { Component, Fragment } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import FarmerSignupActions from 'Redux/FarmerSignupRedux';
import {
  ButtonPrimary,
  RadioButton,
  ProductHorizontalWrapper,
  InputText,
  InputPicker,
} from 'Components';
import AppConfig from 'Config/AppConfig';
import { Fonts, Colors } from 'Themes';
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
    type: AppConfig.areaType[0],
    status: 'rent', // oneOf [own, rent, rented]
    name: '',
    name_error: null,
    month_start: null,
    month_start_error: null,
    year_start: null,
    year_start_error: null,
    month_end: null,
    month_end_error: null,
    year_end: null,
    year_end_error: null,
  };
  
  onSubmit = () => {
    const { navigation, storeFarmerType } = this.props;
    const {
      type,
      status,
      name,
      month_start,
      year_start,
      month_end,
      year_end
    } = this.state;
    storeFarmerType({
      type,
      status,
      name,
      date_start: `${year_start}-${month_start}-01`,
      date_end: `${year_end}-${month_end}-01`
    });
    navigation.navigate(
      status === AppConfig.areaStatus.RENTED
        ? 'AreaList'
        : 'AreaCommodity'
    );
  };

  renderBottom = () => {
    const { status } = this.state;
    return (
      <ButtonPrimary
        title={
          status === AppConfig.areaStatus.RENTED
           ? "Selesai"
           : "Isi Komoditi"
        }
        onPress={this.onSubmit}
      />
    );
  };

  onSelectionChange = (value, stateName) => {
    this.setState({ [stateName]: value });
  };

  render() {
    const {
      type,
      status,
      name,
      name_error,
      year_start,
      year_start_error,
      year_end,
      year_end_error,
    } = this.state;
    return (
      <HillHeaderWrapper
        title="Jenis Lahan"
        ChildrenBottom={this.renderBottom}
      >
        <ProductHorizontalWrapper
          width={screenWidth - moderateScale(20)}
          height={moderateScale(135)}
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
          <Text
            style={{
              ...Fonts.TITLE_HEADER__SMALL,
              color: Colors.veggie_dark
            }}
          >
            Tipe lahan
          </Text>
          {AppConfig.areaType.map((item, index) => (
            <RadioButton
              title={item}
              isSelected={type === item}
              onPress={() => this.setState({ type: item })}
            />
          ))}
        </ProductHorizontalWrapper>
        <ProductHorizontalWrapper
          width={screenWidth - moderateScale(20)}
          height={moderateScale(175)}
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
          <Text
            style={{
              ...Fonts.TITLE_HEADER__SMALL,
              color: Colors.veggie_dark
            }}
          >
            Status lahan
          </Text>
          <RadioButton
            title="Milik sendiri"
            isSelected={status === AppConfig.areaStatus.OWN}
            onPress={() => this.setState({ status: AppConfig.areaStatus.OWN })}
          />
          <RadioButton
            title="Sewa"
            isSelected={status === AppConfig.areaStatus.RENT}
            onPress={() => this.setState({ status: AppConfig.areaStatus.RENT })}
          />
          <RadioButton
            title="Disewakan"
            isSelected={status === AppConfig.areaStatus.RENTED}
            onPress={() => this.setState({ status: AppConfig.areaStatus.RENTED })}
          />
        </ProductHorizontalWrapper>
        {status !== AppConfig.areaStatus.OWN
          ? (
            <ProductHorizontalWrapper
              width={screenWidth - moderateScale(20)}
              height={moderateScale(250)}
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
              <InputText
                name="name"
                title={status !== AppConfig.areaStatus.RENT ? "Nama pemilik" : "Nama penyewa"}
                placeholder="Nama sesuai KTP"
                value={name || ''}
                error={name_error}
                onChangeText={this.onSelectionChange}
                returnKeyType="next"
                styleContainer={{
                  marginHorizontal: 0,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <View style={{ flex: 2, marginRight: moderateScale(10) }}>
                  <InputPicker
                    name="month_start"
                    title="Bulan (Mulai)"
                    placeholder="Pilih jenis kelamin"
                    dataLocal={AppConfig.month}
                    onSelectionChange={this.onSelectionChange}
                    styleContainer={{
                      flex: 2,
                      marginHorizontal: 0,
                    }}
                    styleText={{
                      marginHorizontal: 0,
                    }}
                  />
                </View>
                <InputText
                  name="year_start"
                  title="Tahun"
                  value={year_start || ''}
                  error={year_start_error}
                  onChangeText={this.onSelectionChange}
                  styleContainer={{
                    flex: 1,
                    marginHorizontal: 0,
                    marginBottom: 0,
                  }}
                  keyboardType="numeric"
                />
              </View>
              
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <View style={{ flex: 2, marginRight: moderateScale(10) }}>
                  <InputPicker
                    name="month_end"
                    title="Bulan (Selesai)"
                    placeholder="Pilih jenis kelamin"
                    dataLocal={AppConfig.month}
                    onSelectionChange={this.onSelectionChange}
                    styleContainer={{
                      flex: 2,
                      marginHorizontal: 0,
                    }}
                    styleText={{
                      marginHorizontal: 0,
                    }}
                  />
                </View>
                <InputText
                  name="year_end"
                  title="Tahun"
                  value={year_end || ''}
                  error={year_end_error}
                  onChangeText={this.onSelectionChange}
                  styleContainer={{
                    flex: 1,
                    marginHorizontal: 0,
                    marginBottom: 0,
                  }}
                  keyboardType="numeric"
                />
              </View>
            </ProductHorizontalWrapper>
          )
        : (
            <View />
        )
      }
      </HillHeaderWrapper>
    );
  }
}

AreaType.propTypes = {
  storeFarmerType: func,
}

const mapDispatchToProps = dispatch => ({
  storeFarmerType: area => 
    dispatch(FarmerSignupActions.storeFarmerType(area))
});

export default connect(null, mapDispatchToProps)(AreaType);
