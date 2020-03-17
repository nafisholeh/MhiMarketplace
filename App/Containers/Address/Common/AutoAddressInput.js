import React, { Component } from "react";
import { View } from "react-native";
import { func } from "prop-types";

import { FETCH_DAERAH_LENGKAP } from "GraphQL/Address/Query";
import { moderateScale } from "Lib";
import { InputText, InputTextAutoComplete } from "Components";

class AutoAddressInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_address: null,
      trigger_fetch_provinsi: false,
      trigger_fetch_kabupaten: false,
      trigger_fetch_kecamatan: false,
      kodepos: "",
      kelurahan: "",
      rtrw: "",
      alamat: ""
    };
  }

  validateData = () => {
    const { id_address, rtrw, alamat } = this.state;
    this.setState({
      error_alamat: id_address ? false : true,
      error_rtrw: rtrw ? false : true,
      error_alamat_detail: alamat ? false : true
    });
    return id_address && rtrw && alamat;
  };

  onDaerahChange = ({ key, value }) => {
    this.setState({ id_address: key });
  };

  validateRTRW = () => {
    const { rtrw, error_rtrw } = this.state;
    const condition = new RegExp("\\d{3}/\\d{3}", "g");
    this.setState({
      error_rtrw: !condition.test(rtrw)
        ? "Harap periksa formatnya kembali"
        : null
    });
  };

  render() {
    const { rtrw, alamat, error_rtrw, error_alamat_detail } = this.state;
    const { onRtRwChanged, onAddressDetailChanged } = this.props;
    return (
      <View>
        <InputTextAutoComplete
          title="Kelurahan/Kecamatan/Kodepos"
          isAllBorderShown
          query={FETCH_DAERAH_LENGKAP}
          queryVariables="term"
          dropdownKey="kab_key"
          dropdownValue="daerah_lengkap"
          onValueChange={this.onDaerahChange}
        />

        <InputText
          title="RT/RW"
          value={rtrw}
          onChangeText={rtrw => {
            onRtRwChanged(rtrw);
            this.setState({ rtrw });
          }}
          error={error_rtrw}
          onSubmitEditing={() => {
            this.validateRTRW();
            this._alamat.focus();
          }}
          returnKeyType="next"
          isAllBorderShown
          mask={"[000]/[000]"}
          maskValidator={"\\d{3}/\\d{3}"}
          keyboardType="numeric"
        />

        <InputText
          refs={ref => (this._alamat = ref)}
          title="Alamat lengkap"
          value={alamat}
          onChangeText={alamat => {
            onAddressDetailChanged(alamat);
            this.setState({ alamat });
          }}
          multiline={true}
          error={error_alamat_detail}
          styleContainer={{
            height: moderateScale(120)
          }}
          isAllBorderShown
        />
      </View>
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
  onProvinsiChanged: func.isRequired
};

export default AutoAddressInput;
