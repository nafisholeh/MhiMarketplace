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
import { KeyboardFriendlyView, InputText, InputPicker } from 'Components';
import ApolloClientProvider from 'Services/ApolloClientProvider';

class AddressInput extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Alamat Baru'
    }
  }
  
  constructor(props) {
    super(props);
    this.state = {
      trigger_fetch_provinsi: false,
      trigger_fetch_kabupaten: false,
      trigger_fetch_kecamatan: false,
      data_provinsi: '',
      provinsi_selected: '',
      kota: '',
      kecamatan: '',
      kelurahan: '',
      rtrw: '',
      alamat: '',
      kodepos: '',
      dummy: [{label: 'loading', value: 0}],
    }
  }
  
  componentWillMount() {
    this.onFetchProvinsi();
  }
  
  validateData = () => {
    const { provinsi, kota, kecamatan, kelurahan, alamat } = this.state; 
    return provinsi && kota && kecamatan && kelurahan && alamat;
  }
  
  uploadAddress = addAddress => {
    if(!this.validateData()) return;
    const {
      provinsi,
      kota,
      kecamatan,
      kelurahan,
      rtrw,
      alamat,
      kodepos
    } = this.state; 
    const { userId } = this.props;
    addAddress({
      variables: {
        user_id: userId,
        data: {
         	alamat,
          rtrw,
          kelurahan,
          kecamatan,
          kota,
          provinsi,
          kodepos
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
    this.setState(prevState => {
      return {
        prov_key_selected: val,
        trigger_fetch_kabupaten: !prevState.trigger_fetch_kabupaten
      };
    });
  };
  
  onKabupatenChange = (val, i) => {
    this.setState(prevState => {
      return {
        kab_key_selected: val,
        trigger_fetch_kecamatan: !prevState.trigger_fetch_kecamatan
      };
    });
  };
  
  onKecamatanChange = (val, i) => {
    const [kodepos, kelurahan] = val.split('||') || [];
    this.setState({ kelurahan, kodepos });
  };
  
  render() {
    const {
      trigger_fetch_provinsi,
      trigger_fetch_kabupaten,
      trigger_fetch_kecamatan,
      prov_key_selected,
      kab_key_selected,
      error_kelurahan,
      error_kodepos,
      error_rtrw,
      error_alamat,
      
      dummy,
      
      data_provinsi,
      provinsi_selected,
      provinsi_selected_text,
      error_provinsi,
      error_fetch_provinsi,
      fetching_provinsi,
      
      kota,
      kecamatan,
      kelurahan,
      rtrw,
      alamat,
      kodepos
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
                    error={error_kelurahan}
                    editable={false}
                  />
                
                  <InputText
                    refs={(ref) => this._kodepos = ref}
                    title='Kode Pos'
                    value={kodepos}
                    placeholder='Kode Pos'
                    error={error_kodepos}
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
                    error={error_alamat}
                    styleContainer={{ height: moderateScale(120) }}
                    styleBorder={{ height: moderateScale(100), alignItems: 'flex-start' }}
                  />

                </KeyboardFriendlyView>
              </ScrollView>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.uploadAddress(addAddress)}>
                {loading &&
                  <DotIndicator
                    count={4}
                    size={7}
                    color='white'
                    animationDuration={800}
                  />
                }
                {!loading &&
                  <Text style={{ color: 'white' }}>Tambah Alamat</Text>
                }
              </TouchableOpacity>
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