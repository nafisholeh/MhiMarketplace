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
    month_start: null,
    month_start_error: null,
    year_start: null,
    year_start_error: null,
    month_end: null,
    month_end_error: null,
    year_end: null,
    year_end_error: null,
  };

  renderBottom = () => {
    const { type_rented } = this.state;
    const { navigation } = this.props;
    return (
      <ButtonPrimary
        title={type_rented ? "Selesai" : "Lanjut"}
        onPress={() => navigation.navigate('AreaCommodity')}
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
        {!type_own
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

export default AreaType;
