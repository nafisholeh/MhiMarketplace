import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { DotIndicator } from 'react-native-indicators';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import { ReactNativeFile } from 'apollo-upload-client';
import moment from 'moment';

import { SIGNUP_FARMER } from 'GraphQL/Farmer/Mutation';

import DateTimePicker from '@react-native-community/datetimepicker';
import { AutoAddressInput } from 'Containers/Address/Common';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import FarmerSignupActions from 'Redux/FarmerSignupRedux';
import { SIGNUP } from 'GraphQL/User/Mutation';
import { isEmailError, getGraphQLError, moderateScale } from 'Lib';
import {
  InputText,
  InputPicker,
  ButtonPrimary,
  BackButton,
  KeyboardFriendlyView,
  RadioButton,
  ImagePicker,
} from 'Components';
import { Header, HillHeaderWrapper, SignupBoxWrapper } from 'CommonFarmer';
import { Images, Colors } from 'Themes';
import AppConfig from 'Config/AppConfig';

const LIFETIME = new Date('3000-01-01');
    
class Farmer extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }

  state = {
    nik: null,
    nik_error: null,
    name: null,
    name_error: null,
    birth_place: null,
    birth_place_error: null,
    birth_date: new Date('1990-01-01'),
    birth_date_error: null,
    gender: null,
    gender_error: null,
    blood_type: null,
    blood_type_error: null,
    religion: null,
    religion_error: null,
    marriage_status: null,
    marriage_status_error: null,
    occupation: null,
    occupation_error: null,
    citizenship: null,
    citizenship_error: null,
    expired_date_lifetime: true,
    expired_date: LIFETIME,
    expired_date_error: null,
    photo_face: null,
    photo_face_error: null,
    photo_ktp: null,
    photo_ktp_error: null,
    address_detail: null,
    address_detail_error: null,
    rtrw: null,
    rtrw_error: null,
    kodepos: null,
    kodepos_error: null,
    kelurahan: null,
    kelurahan_error: null,
    kecamatan: null,
    kecamatan_error: null,
    kecamatan_id: null,
    kecamatan_id_error: null,
    kabupaten: null,
    kabupaten_error: null,
    provinsi: null,
    provinsi_error: null,
    heightBox1: 325,
    heightBox2: 85,
    
    show_expired_modal: false,
    show_date_modal: false,
    loading: false,
  };
  
  onSubmit = async () => {
    const { navigation, storeFarmerKtp } = this.props;
    const {
      nik, name, birth_place, birth_date, gender,
      blood_type, religion, marriage_status, occupation,
      citizenship, expired_date, photo_face, photo_ktp,
      address_detail, rtrw, kodepos, kelurahan,
      kecamatan, kecamatan_id, kabupaten, provinsi
    } = this.state;
    let photo = {};
    if (Array.isArray(photo_face) && photo_face.length) {
      const { data, mime } = photo_face[0];
      photo = Object.assign(
        {},
        photo,
        { photo_face: `data:${mime};base64,${data}` }
      );
    }
    if (Array.isArray(photo_ktp) && photo_ktp.length) {
      const { data, mime } = photo_ktp[0];
      photo = Object.assign(
        {},
        photo,
        { photo_ktp: `data:${mime};base64,${data}` }
      );
    }
    storeFarmerKtp(
      Object.assign(
        {},
        {
          nik, name, birth_place, birth_date, gender,
          blood_type, religion, marriage_status, occupation,
          citizenship, expired_date, photo_face, photo_ktp,
          address_detail, rtrw, kodepos, kelurahan,
          kecamatan, kecamatan_id, kabupaten, provinsi
        },
        photo
      )
    );
    navigation.navigate('AreaList');
  }
  
  openExpiredDate = () => {
    this.setState(prevState => {
      return ({
        show_expired_modal: !prevState.show_expired_modal
      });
    });
  };
  
  setExpiredDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      show_expired_modal: false,
      expired_date: date,
    });
  };
  
  openBirthDate = () => {
    this.setState(prevState => {
      return ({
        show_date_modal: !prevState.show_date_modal
      });
    });
  };

  setBirthDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      show_date_modal: false,
      birth_date: date,
    });
  };
  
  onSelectionChange = (value, stateName) => {
    this.setState({ [stateName]: value });
  };
  
  onPhotoChange = (name, raw = [], paths = []) => {
    const photos = raw.map((item, i) => {
      const { mime, path, data } = raw[i];
      return { mime, path, data };
    })
    this.setState({ [name]: photos });
  };
  
  renderBottom = () => {
    const { loading } = this.state;
    return (
      <ButtonPrimary
        onPress={this.onSubmit}
        disabled={loading}
        loading={loading}
        title="Selanjutnya"
      />
    );
  }
  
  render () {
    const {
      nik,
      nik_error,
      name,
      name_error,
      birth_place,
      birth_place_error,
      birth_date,
      birth_date_error,
      loading,
      address_detail,
      rtrw,
      kodepos,
      kelurahan,
      kecamatan,
      kecamatan_id,
      kabupaten,
      provinsi,
      show_expired_modal,
      show_date_modal,
      expired_date,
      expired_date_error,
      expired_date_lifetime,
      photo_face,
      photo_face_error,
      photo_ktp,
      photo_ktp_error,
      heightBox1,
      heightBox2,
    } = this.state;
    const { navigation } = this.props;
    return (
      <HillHeaderWrapper
        title="Pendaftaran akun baru"
        ChildrenBottom={this.renderBottom}
      >
        
        <SignupBoxWrapper height={395}>
          <InputText
            refs={(ref) => this._nik = ref}
            name="nik"
            title="NIK"
            placeholder="Nomor KTP"
            value={nik || ''}
            error={nik_error}
            onChangeText={this.onSelectionChange}
            onSubmitEditing={() => this._name.focus()}
            keyboardType="numeric"
            returnKeyType="next"
          />
          
          <InputText
            refs={(ref) => this._name = ref}
            name="name"
            title="Nama"
            placeholder="Nama sesuai KTP"
            value={name || ''}
            error={name_error}
            onChangeText={this.onSelectionChange}
            returnKeyType="done"
          />
        
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <InputText
              refs={(ref) => this._birth_place = ref}
              name="birth_place"
              title="Tempat"
              placeholder="Tempat"
              value={birth_place || ''}
              error={birth_place_error}
              onChangeText={this.onSelectionChange}
              returnKeyType="done"
              styleContainer={{
                flex: 1,
                marginHorizontal: 0,
                marginRight: moderateScale(5),
              }}
            />
            
            <TouchableOpacity
              onPress={this.openBirthDate}
              style={{
                flex: 1,
              }}
            >
              <InputText
                title="Tanggal Lahir"
                name="birth_date"
                placeholder="Tanggal lahir"
                value={moment(birth_date).format('DD MMM YYYY') || ''}
                error={birth_date_error}
                onChangeText={this.onSelectionChange}
                styleContainer={{
                  flex: 1,
                  marginHorizontal: 0
                }}
                editable={false}
              />
            </TouchableOpacity>
          </View>
          
          <InputPicker
            name="gender"
            title="Jenis Kelamin"
            placeholder="Pilih jenis kelamin"
            dataLocal={AppConfig.gender}
            onSelectionChange={this.onSelectionChange}
          />
        
          <InputPicker
            name="blood_type"
            title="Gol Darah"
            placeholder="Pilih golongan darah"
            dataLocal={AppConfig.bloodType}
            onSelectionChange={this.onSelectionChange}
          />
        </SignupBoxWrapper>
      
        <SignupBoxWrapper height={610}>
          <AutoAddressInput
            onAddressDetailChanged={text => this.setState({ address_detail: text})}
            onRtRwChanged={text => this.setState({ rtrw: text})}
            onKodeposChanged={text => this.setState({ kodepos: text})}
            onKelurahanChanged={text => this.setState({ kelurahan: text})}
            onKecamatanChanged={text => this.setState({ kecamatan: text})}
            onKecamatanIdChanged={text => this.setState({ kecamatan_id: text})}
            onKabupatenChanged={text => this.setState({ kabupaten: text})}
            onProvinsiChanged={text => this.setState({ provinsi: text})}
          />
        </SignupBoxWrapper>
      
        <SignupBoxWrapper height={heightBox1}>
          <InputPicker
            name="religion"
            title="Agama"
            placeholder="Pilih agama yang dianut"
            dataLocal={AppConfig.religion}
            onSelectionChange={this.onSelectionChange}
            onShowManualInput={() => this.setState({ heightBox1: heightBox1 + 50 })}
            onHideManualInput={() => this.setState({ heightBox1: heightBox1 - 50 })}
          />
        
          <InputPicker
            name="marriage_status"
            title="Status Perkawinan"
            placeholder="Pilih status"
            dataLocal={AppConfig.marriageStatus}
            onSelectionChange={this.onSelectionChange}
          />
        
          <InputPicker
            name="occupation"
            title="Jenis Pekerjaan"
            placeholder="Pilih pekerjaan"
            dataLocal={AppConfig.occupation}
            onSelectionChange={this.onSelectionChange}
            onShowManualInput={() => this.setState({ heightBox1: heightBox1 + 50 })}
            onHideManualInput={() => this.setState({ heightBox1: heightBox1 - 50 })}
          />
        
          <InputPicker
            name="citizenship"
            title="Kewarganegaraan"
            placeholder="Pilih kewarganegaraan"
            dataLocal={AppConfig.citizenship}
            onSelectionChange={this.onSelectionChange}
            onShowManualInput={() => this.setState({ heightBox1: heightBox1 + 50 })}
            onHideManualInput={() => this.setState({ heightBox1: heightBox1 - 50 })}
          />
        </SignupBoxWrapper>
        
        <SignupBoxWrapper height={heightBox2}>
          <Text
            style={{
              color: Colors.veggie_dark,
              fontFamily: 'CircularStd-Book',
              fontSize: 13,
              marginBottom: moderateScale(8),
            }}
          >
            Masa Berlaku
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: moderateScale(expired_date_lifetime ? 20 : 5),
            }}
          >
            <RadioButton
              title="Seumur hidup"
              isSelected={expired_date_lifetime}
              onPress={() => this.setState({
                expired_date: LIFETIME,
                expired_date_lifetime: true,
                heightBox2: heightBox2 - 50,
              })}
            />
            <RadioButton
              title="Tanggal..."
              isSelected={!expired_date_lifetime}
              onPress={() =>
                this.setState({
                  expired_date: new Date(),
                  expired_date_lifetime: false,
                  heightBox2: heightBox2 + 50,
                })
              }
            />
          </View>
          
          {!expired_date_lifetime
            ? (
              <TouchableOpacity
                onPress={this.openExpiredDate}
                style={{
                  marginTop: moderateScale(10),
                  marginBottom: moderateScale(24),
                  marginHorizontal: 0,
                }}
              >
                <InputText
                  name="expired_date"
                  placeholder="Pilih tanggal habis berlaku"
                  value={moment(expired_date).format('DD MMM YYYY') || ''}
                  error={expired_date_error}
                  onChangeText={this.onSelectionChange}
                  editable={false}
                  withBorder={false}
                  prefixIcon={Images.edit_small}
                  prefixIconStyle={{
                    tintColor: Colors.disabled_light,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )
          }
        </SignupBoxWrapper>
        
        <Text
          style={{
            color: Colors.veggie_dark,
            fontFamily: 'CircularStd-Book',
            fontSize: 13,
            marginTop: moderateScale(20),
            marginHorizontal: moderateScale(40),
            marginBottom: moderateScale(8),
          }}
        >
          Ambil Foto KTP
        </Text>
        <ImagePicker
          name="photo_ktp"
          onChange={this.onPhotoChange}
          data={photo_ktp}
          titleBottomSheet='Ambil foto KTP'
          isMultiplePick={false}
          isShowCancelButton={false}
          isShowGallery
          styleContainer={{
            marginHorizontal: moderateScale(40),
            marginBottom: moderateScale(10),
          }}
        />
      
        <Text
          style={{
            color: Colors.veggie_dark,
            fontFamily: 'CircularStd-Book',
            fontSize: 13,
            marginHorizontal: moderateScale(40),
            marginBottom: moderateScale(8),
            marginTop: moderateScale(10),
          }}
        >
          Ambil Foto Muka
        </Text>
        <ImagePicker
          name="photo_face"
          onChange={this.onPhotoChange}
          data={photo_face}
          titleBottomSheet='Ambil foto muka'
          isMultiplePick={false}
          isShowCancelButton={false}
          isShowGallery
          styleContainer={{
            marginHorizontal: moderateScale(40),
            marginBottom: moderateScale(30),
          }}
        />
      
        {show_expired_modal
          ? (
            <DateTimePicker
              value={expired_date}
              mode='date'
              display="default"
              onChange={this.setExpiredDate}
            />
          ) : (<View />)
        }
      
        {show_date_modal
          ? (
            <DateTimePicker
              value={birth_date}
              mode='date'
              display="default"
              onChange={this.setBirthDate}
            />
          ) : (<View />)
        }
      </HillHeaderWrapper>
    )
  }
}

Farmer.propTypes = {
  storeFarmerKtp: func,
};

const mapDispatchToProps = dispatch => ({
  storeFarmerKtp: ktp => dispatch(
    FarmerSignupActions.storeFarmerKtp(ktp)
  ),
});

export default connect(null, mapDispatchToProps)(withNavigation(Farmer));
