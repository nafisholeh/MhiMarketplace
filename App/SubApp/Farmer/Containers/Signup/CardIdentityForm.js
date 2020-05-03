import React, { Component, Fragment } from "react";
import { View } from "react-native";
import { func } from "prop-types";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import { withNoHeader } from "Hoc";
import { AutoAddressInput } from "Containers/Address/Common";
import FarmerSignupActions from "Redux/FarmerSignupRedux";
import { moderateScale } from "Lib";
import {
  InputText,
  InputTextAutoComplete,
  InputDate,
  InputPicker,
  ButtonPrimary,
} from "Components";
import AppConfig from "Config/AppConfig";
import SignupWrapper from "./SignupWrapper";
import { SEARCH_RELIGION } from "GraphQL/Religion/Query";

const LIFETIME = new Date("3000-01-01");

class CardIdentityForm extends Component {
  state = {
    form: {
      nik: null,
      name: null,
      birth_place: null,
      birth_date: new Date("1990-01-01"),
      gender: null,
      blood_type: null,
      religion: null,
      marriage_status: null,
      occupation: null,
      citizenship: null,
      expired_date: LIFETIME,
      address_detail: null,
      rtrw: null,
      kecamatan_id: null,
    },
    error: {
      nik: null,
      name: null,
      birth_place: null,
      birth_date: null,
      gender: null,
      blood_type: null,
      religion: null,
      marriage_status: null,
      occupation: null,
      citizenship: null,
      expired_date: null,
      address_detail: null,
      rtrw: null,
      kecamatan_id: null,
    },

    show_expired_modal: false,
    show_date_modal: false,
    is_can_continue: false,
  };

  onSubmit = async () => {
    const { navigation, storeFarmerKtp } = this.props;
    const {
      form: {
        nik,
        name,
        birth_place,
        birth_date,
        gender,
        blood_type,
        religion,
        marriage_status,
        occupation,
        citizenship,
        expired_date,
        address_detail,
        rtrw,
        kecamatan_id,
      },
    } = this.state;
    const ktpData = {
      nik,
      name,
      birth_place,
      birth_date,
      gender,
      blood_type,
      religion,
      marriage_status,
      occupation,
      citizenship,
      expired_date,
      address_detail,
      rtrw,
      kecamatan_id,
    };
    storeFarmerKtp(ktpData);
    navigation.navigate("AreaList");
  };

  setLifetimeExpiredDate = (key, value) => {
    const isLifeTime = value === "Seumur hidup";
    const expired_date = isLifeTime ? LIFETIME : new Date();
    this.setState({ form: { ...this.state.form, expired_date } });
  };

  onEligibleToSubmit = () => {
    const { form } = this.state;
    const isCanContinue = Object.values(form).every((o) => o && o !== "");
    this.setState({
      is_can_continue: isCanContinue,
    });
  };

  onChangeText = (value, stateName) => {
    this.setState(
      { form: { ...this.state.form, [stateName]: value } },
      this.onEligibleToSubmit
    );
  };

  onSelectionChange = (key, value, stateName) => {
    this.setState(
      { form: { ...this.state.form, [stateName]: value } },
      this.onEligibleToSubmit
    );
  };

  onAutoCompleteChange = (item, stateName) => {
    this.setState(
      { form: { ...this.state.form, [stateName]: item } },
      this.onEligibleToSubmit
    );
  };

  render() {
    const {
      form: { nik, name, birth_place, birth_date, expired_date },
      is_can_continue,
    } = this.state;
    return (
      <Fragment>
        <SignupWrapper title="Data KTP" currentPosition={1}>
          <InputText
            refs={(ref) => (this._nik = ref)}
            isAllBorderShown
            name="nik"
            title="NIK"
            value={nik || ""}
            onChangeText={this.onChangeText}
            onSubmitEditing={() => this._name.focus()}
            keyboardType="numeric"
            returnKeyType="next"
          />

          <InputText
            refs={(ref) => (this._name = ref)}
            isAllBorderShown
            name="name"
            title="Nama"
            value={name || ""}
            onChangeText={this.onChangeText}
            onSubmitEditing={() => this._birth_place.focus()}
            returnKeyType="next"
          />

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <InputText
              refs={(ref) => (this._birth_place = ref)}
              isAllBorderShown
              name="birth_place"
              title="Tempat"
              value={birth_place || ""}
              onChangeText={this.onChangeText}
              returnKeyType="done"
              styleContainer={{
                flex: 1,
                marginHorizontal: 0,
                marginRight: moderateScale(5),
              }}
            />

            <InputDate
              isAllBorderShown
              title="Tanggal Lahir"
              name="birth_date"
              onChangeDate={this.onChangeText}
              value={birth_date}
            />
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

          <AutoAddressInput
            onAddressDetailChanged={(text) =>
              this.onChangeText(text, "address_detail")
            }
            onRtRwChanged={(text) => this.onChangeText(text, "rtrw")}
            onKecamatanIdChanged={(text) =>
              this.onChangeText(text, "kecamatan_id")
            }
          />

          <InputTextAutoComplete
            name="religion"
            title="Agama"
            isAllBorderShown
            query={SEARCH_RELIGION}
            dropdownKey="_id"
            dropdownValue="name"
            onValueChange={this.onAutoCompleteChange}
          />

          <InputPicker
            name="marriage_status"
            title="Status Perkawinan"
            placeholder="Pilih status"
            dataLocal={AppConfig.marriageStatus}
            onSelectionChange={this.onSelectionChange}
          />

          <InputTextAutoComplete
            name="occupation"
            title="Jenis Pekerjaan"
            isAllBorderShown
            dataLocal={AppConfig.occupation}
            onValueChange={this.onAutoCompleteChange}
          />

          <InputPicker
            name="citizenship"
            title="Kewarganegaraan"
            isAllBorderShown
            placeholder="Pilih kewarganegaraan"
            dataLocal={AppConfig.citizenship}
            onSelectionChange={this.onSelectionChange}
          />

          <InputPicker
            name="expired_date"
            title="Masa berlaku"
            isAllBorderShown
            dataLocal={AppConfig.expiredDate}
            onSelectionChange={this.setLifetimeExpiredDate}
            CustomManualInput={() => (
              <InputDate
                isAllBorderShown
                title="Tanggal Lahir"
                name="expired_date"
                onChangeDate={this.onChangeText}
                value={expired_date}
              />
            )}
          />
        </SignupWrapper>

        <ButtonPrimary
          onPress={this.onSubmit}
          disabled={!is_can_continue}
          title="Selanjutnya"
        />
      </Fragment>
    );
  }
}

CardIdentityForm.propTypes = {
  storeFarmerKtp: func,
};

const mapDispatchToProps = (dispatch) => ({
  storeFarmerKtp: (ktp) => dispatch(FarmerSignupActions.storeFarmerKtp(ktp)),
});

export default connect(
  null,
  mapDispatchToProps
)(withNavigation(withNoHeader(CardIdentityForm)));
