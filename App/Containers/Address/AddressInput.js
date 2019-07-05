import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Mutation } from 'react-apollo';
import { DotIndicator } from 'react-native-indicators';
import RNPickerSelect from 'react-native-picker-select';

import {
  FETCH_ADDRESS,
  FETCH_ALL_PROVINSI,
  FETCH_KABUPATEN_BY_PROVINSI,
  FETCH_KECAMATAN_BY_KABUPATEN,
} from 'GraphQL/Address/Query';
import { ADD_ADDRESS, cacheAddAddress } from 'GraphQL/Address/Mutation';
import { Colors, Metrics, Images } from 'Themes';
import { InAppNotification, graphqlToRNPickerSelect, moderateScale } from 'Lib';
import styles from './Styles';
import { getUserId } from 'Redux/SessionRedux';
import {
  KeyboardFriendlyView,
  InputText,
  InputPicker,
  HeaderTitle,
  ButtonPrimary
} from 'Components';
import ApolloClientProvider from 'Services/ApolloClientProvider';

class AddressInput extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      headerLeft: null,
      headerRight: null,
      header: (
        <HeaderTitle title="Alamat Baru" />
      ),
    }
  }
  
  constructor(props) {
    super(props);
    this.state = {
      id_address: null,
      trigger_fetch_provinsi: false,
      trigger_fetch_kabupaten: false,
      trigger_fetch_kecamatan: false,
      kodepos: '',
      kelurahan: '',
      rtrw: '',
      alamat: '',
    }
  }
  
  componentWillMount() {
    this.onFetchProvinsi();
  }
  
  validateData = () => {
    const {
      id_address,
      rtrw,
      alamat,
    } = this.state;
    this.setState({
      error_alamat: id_address ? false : true,
      error_rtrw: rtrw ? false : true,
      error_alamat_detail: alamat ? false : true,
    })
    return id_address && rtrw && alamat;
  }
  
  uploadAddress = addAddress => {
    if(!this.validateData()) {
      InAppNotification.info(
        "Alamat kurang lengkap",
        "Silahkan isi semua isian"
      );
      return;
    }
    const {
      id_address,
      rtrw,
      alamat,
      provinsi,
      kabupaten,
      kecamatan,
      kelurahan,
      kodepos,
    } = this.state; 
    console.tron.log('addressupload', this.state)
    const { userId } = this.props;
    addAddress({
      variables: {
        user_id: userId,
        id_address,
        data: {
         	alamat,
          rtrw,
          provinsi,
          kota: kabupaten,
          kecamatan,
          kelurahan,
          kodepos,
        }
      }
    });
  }
  
  onUploadAddressCompleted = data => {
    const { navigation } = this.props;
    navigation.goBack();
  };
  
  onFetchProvinsi() {
    this.setState(prevState => {
      return {
        trigger_fetch_provinsi: !prevState.trigger_fetch_provinsi
      };
    });
  }
  
  onProvinsiChange = (val, i) => {
    const [id, nama] = val.split('||') || [];
    this.setState(prevState => {
      return {
        provinsi: nama,
        prov_key_selected: id,
        trigger_fetch_kabupaten: !prevState.trigger_fetch_kabupaten
      };
    });
  };
  
  onKabupatenChange = (val, i) => {
    const [id, nama] = val.split('||') || [];
    this.setState(prevState => {
      return {
        kabupaten: nama,
        kab_key_selected: id,
        trigger_fetch_kecamatan: !prevState.trigger_fetch_kecamatan
      };
    });
  };
  
  onKecamatanChange = (val, i) => {
    const [idAddress, kodepos, kelurahan, kecamatan] = val.split('||') || [];
    this.setState({
      id_address: idAddress,
      kecamatan,
      kelurahan,
      kodepos
    });
  };
  
  render() {
    const {
      trigger_fetch_provinsi,
      trigger_fetch_kabupaten,
      trigger_fetch_kecamatan,
      prov_key_selected,
      kab_key_selected,
      rtrw,
      alamat,
      kelurahan,
      kodepos,
      error_alamat,
      error_rtrw,
      error_alamat_detail
    } = this.state; 
    const { userId } = this.props;
    return (
      <Mutation
        mutation={ADD_ADDRESS}
        onCompleted={this.onUploadAddressCompleted}
        update={(cache, data) => cacheAddAddress(cache, data, this.state)}
        ignoreResults={false}
        errorPolicy='all'>
        { (addAddress, {loading, error, data}) => {
          return (
            <React.Fragment>
              <ScrollView>
                <KeyboardFriendlyView
                  style={{
                    paddingVertical: moderateScale(20),
                    paddingHorizontal: moderateScale(15),
                  }}
                >
                  
                  <InputPicker
                    title="Provinsi"
                    placeholder="Pilih provinsi"
                    query={FETCH_ALL_PROVINSI}
                    onSelectionChange={this.onProvinsiChange}
                    triggerFetch={trigger_fetch_provinsi}
                    isInitialFetching
                  />
                
                  <InputPicker
                    title="Kabupaten/Kota"
                    placeholder="Pilih kabupaten/kota"
                    query={FETCH_KABUPATEN_BY_PROVINSI}
                    queryVariables={{ prov_key: prov_key_selected }}
                    onSelectionChange={this.onKabupatenChange}
                    triggerFetch={trigger_fetch_kabupaten}
                  />
                
                  <InputPicker
                    title="Kecamatan"
                    placeholder="Pilih kecamatan"
                    query={FETCH_KECAMATAN_BY_KABUPATEN}
                    queryVariables={{ kab_key: kab_key_selected }}
                    onSelectionChange={this.onKecamatanChange}
                    triggerFetch={trigger_fetch_kecamatan}
                    isKeyDisplayed
                  />
                
                  <InputText
                    refs={(ref) => this._kelurahan = ref}
                    title='Kelurahan'
                    value={kelurahan}
                    placeholder='Kelurahan'
                    error={error_alamat}
                    editable={false}
                  />
                
                  <InputText
                    refs={(ref) => this._kodepos = ref}
                    title='Kode Pos'
                    value={kodepos}
                    placeholder='Kode Pos'
                    error={error_alamat}
                    editable={false}
                  />
                  
                  <InputText
                    title='RT/RW'
                    value={rtrw}
                    onChangeText={(rtrw) => this.setState({ rtrw })}
                    placeholder='RT/RW'
                    error={error_rtrw}
                    onSubmitEditing={() => this._alamat.focus()}
                    returnKeyType='next'
                  />
                  
                  <InputText
                    refs={(ref) => this._alamat = ref}
                    title='Alamat lengkap'
                    value={alamat}
                    onChangeText={(alamat) => this.setState({ alamat })}
                    placeholder='Nama Gedung, jalan dan lainnya'
                    multiline={true}
                    error={error_alamat_detail}
                    styleContainer={{ height: moderateScale(120) }}
                    styleBorder={{ height: moderateScale(100), alignItems: 'flex-start' }}
                  />

                </KeyboardFriendlyView>
              </ScrollView>
              <ButtonPrimary
                onPress={() => this.uploadAddress(addAddress)}
                title="Tambah Alamat"
                loading={loading}
              />
            </React.Fragment>
          )
        }}
      </Mutation>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

export default connect(mapStateToProps, null)(AddressInput);