import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { DotIndicator } from 'react-native-indicators';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import { AutoAddressInput } from 'Containers/Address/Common';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import SessionActions from 'Redux/SessionRedux';
import { SIGNUP } from 'GraphQL/User/Mutation';
import { isEmailError, getGraphQLError, moderateScale } from 'Lib';
import {
  InputText,
  ButtonPrimary,
  BackButton,
  KeyboardFriendlyView
} from 'Components';
import { Header } from './Common';
import { Images } from 'Themes';
import styles from './Styles';
    
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
    birth_date: null,
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
    
    loading: false,
  };
  
  onSubmit = async () => {
    const { navigation } = this.props;
    navigation.navigate('SignupFarmerThird');
  }
  
  onSignup = () => {
    
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
            title="NIK"
            placeholder="Nomor KTP"
            value={nik || ''}
            error={nik_error}
            onChangeText={(text) => this.setState({ nik: text })}
            onSubmitEditing={() => this._name.focus()}
            keyboardType="numeric"
            returnKeyType="next"
          />
          
          <InputText
            refs={(ref) => this._name = ref}
            title="Nama"
            placeholder="Nama sesuai KTP"
            value={name || ''}
            error={name_error}
            onChangeText={(text) => this.setState({ name: text })}
            onSubmitEditing={() => this._birth_place.focus()}
            returnKeyType="next"
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
          
        </KeyboardFriendlyView>

        <ButtonPrimary
          onPress={this.onSubmit}
          disabled={loading}
          loading={loading}
          title="Selanjutnya"
        />
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