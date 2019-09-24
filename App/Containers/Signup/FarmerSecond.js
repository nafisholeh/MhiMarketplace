import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { DotIndicator } from 'react-native-indicators';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';
import { AutoAddressInput } from 'Containers/Address/Common';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import SessionActions from 'Redux/SessionRedux';
import { SIGNUP } from 'GraphQL/User/Mutation';
import { isEmailError, getGraphQLError, moderateScale } from 'Lib';
import {
  InputText,
  InputPicker,
  ButtonPrimary,
  BackButton,
  KeyboardFriendlyView
} from 'Components';
import { Header } from './Common';
import { Images } from 'Themes';
import styles from './Styles';
import AppConfig from 'Config/AppConfig';
    
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
    expired_date: null,
    expired_date_error: null,
    photo: null,
    photo_error: null,
    
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
    
    show_date_modal: false,
    loading: false,
  };
  
  onSubmit = async () => {
    const { navigation } = this.props;
    navigation.navigate('SignupFarmerThird');
  }
  
  onSignup = () => {
    
  }
  
  setBirthDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      show_date_modal: false,
      date,
    });
  };
  
  openBirthDate = () => {
    this.setState(prevState => {
      return ({
        show_date_modal: !prevState.show_date_modal
      });
    });
  };
  
  onSelectionChange = (value, stateName) => {
    this.setState({ [stateName]: value });
  };
  
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
      show_date_modal,
    } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <KeyboardFriendlyView style={styles.container}>
          
          <Header
            title="Pendaftaran akun baru"
            style={{ marginBottom: moderateScale(40) }}
            />
        
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
          
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: moderateScale(40),
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
        
          <InputPicker
            name="religion"
            title="Agama"
            placeholder="Pilih agama yang dianut"
            dataLocal={AppConfig.religion}
            onSelectionChange={this.onSelectionChange}
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
          />
        
          <InputPicker
            name="citizenship"
            title="Kewarganegaraan"
            placeholder="Pilih kewarganegaraan"
            dataLocal={AppConfig.citizenship}
            onSelectionChange={this.onSelectionChange}
          />
          
        </KeyboardFriendlyView>

        <ButtonPrimary
          onPress={this.onSubmit}
          disabled={loading}
          loading={loading}
          title="Selanjutnya"
        />
      
        {show_date_modal && (
          <DateTimePicker
            value={birth_date}
            mode='date'
            display="default"
            onChange={this.setBirthDate}
          />
        )}
      </View>
    )
  }
}

Farmer.propTypes = {
  storeSignupEmail: func,
};

const mapDispatchToProps = dispatch => ({
  storeSignupEmail: email => dispatch(SessionActions.storeSignupEmail(email)),
});

export default connect(null, mapDispatchToProps)(withNavigation(Farmer));