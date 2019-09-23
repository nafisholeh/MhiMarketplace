import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { func } from 'prop-types';

import {
  FETCH_ALL_PROVINSI,
  FETCH_KABUPATEN_BY_PROVINSI,
  FETCH_KECAMATAN_BY_KABUPATEN,
} from 'GraphQL/Address/Query';
import { Colors, Metrics, Images } from 'Themes';
import { moderateScale } from 'Lib';
import { KeyboardFriendlyView, InputText, InputPicker } from 'Components';

class AutoAddressInput extends Component {
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
  
  onFetchProvinsi() {
    this.setState(prevState => {
      return {
        trigger_fetch_provinsi: !prevState.trigger_fetch_provinsi
      };
    });
  }
  
  onProvinsiChange = (val, i) => {
    const { onProvinsiChanged } = this.props;
    const [id, nama] = val.split('||') || [];
    this.setState(prevState => {
      return {
        provinsi: nama,
        prov_key_selected: id,
        trigger_fetch_kabupaten: !prevState.trigger_fetch_kabupaten,
        trigger_reset_kecamatan: !prevState.trigger_reset_kecamatan,
        id_address: null,
        kelurahan: null,
        kodepos: null,
      };
    });
    onProvinsiChanged(nama);
  };
  
  onKabupatenChange = (val, i) => {
    const { onKabupatenChanged } = this.props;
    const [id, nama] = val.split('||') || [];
    this.setState(prevState => {
      return {
        kabupaten: nama,
        kab_key_selected: id,
        trigger_reset_kecamatan: !prevState.trigger_reset_kecamatan,
        trigger_fetch_kecamatan: !prevState.trigger_fetch_kecamatan,
        id_address: null,
        kelurahan: null,
        kodepos: null,
      };
    });
    onKabupatenChanged(nama);
  };
  
  onKecamatanChange = (val, i) => {
    const {
      onKecamatanIdChanged,
      onKecamatanChanged,
      onKelurahanChanged,
      onKodeposChanged,
    } = this.props;
    const [idAddress, kodepos, kelurahan, kecamatan] = val.split('||') || [];
    this.setState({
      id_address: idAddress,
      kecamatan,
      kelurahan,
      kodepos
    });
    onKecamatanIdChanged(idAddress);
    onKecamatanChanged(kecamatan);
    onKelurahanChanged(kelurahan);
    onKodeposChanged(kodepos);
  };
  
  render() {
    const {
      trigger_fetch_provinsi,
      trigger_fetch_kabupaten,
      trigger_fetch_kecamatan,
      trigger_reset_kecamatan,
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
    const { onRtRwChanged, onAddressDetailChanged } = this.props;
    return (
      <KeyboardFriendlyView
        style={{
          paddingVertical: moderateScale(20),
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
          // triggerReset={trigger_reset_kabupaten}
        />
      
        <InputPicker
          title="Kecamatan"
          placeholder="Pilih kecamatan"
          query={FETCH_KECAMATAN_BY_KABUPATEN}
          queryVariables={{ kab_key: kab_key_selected }}
          onSelectionChange={this.onKecamatanChange}
          triggerFetch={trigger_fetch_kecamatan}
          triggerReset={trigger_reset_kecamatan}
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
          onChangeText={(rtrw) => {
            onRtRwChanged(rtrw);
            this.setState({ rtrw });
          }}
          placeholder='RT/RW'
          error={error_rtrw}
          onSubmitEditing={() => this._alamat.focus()}
          returnKeyType='next'
        />
        
        <InputText
          refs={(ref) => this._alamat = ref}
          title='Alamat lengkap'
          value={alamat}
          onChangeText={(alamat) => {
            onAddressDetailChanged(alamat);
            this.setState({ alamat });
          }}
          placeholder='Nama Gedung, jalan dan lainnya'
          multiline={true}
          error={error_alamat_detail}
          styleContainer={{ height: moderateScale(120) }}
          styleBorder={{ height: moderateScale(100), alignItems: 'flex-start' }}
        />

      </KeyboardFriendlyView>
    );
  }
}

AutoAddressInput.propTypes = {
  onRtRwChanged: func.isRequired,
  onAddressDetailChanged: func.isRequired,
  onKecamatanIdChanged: func.isRequired,
  onKecamatanChanged: func.isRequired,
  onKelurahanChanged: func.isRequired,
  onKodeposChanged: func.isRequired,
  onKabupatenChanged: func.isRequired,
  onProvinsiChanged: func.isRequired,
};

export default AutoAddressInput;
