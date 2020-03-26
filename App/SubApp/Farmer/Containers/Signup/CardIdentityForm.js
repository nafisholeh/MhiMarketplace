import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { func } from "prop-types";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

import { AutoAddressInput } from "Containers/Address/Common";
import FarmerSignupActions from "Redux/FarmerSignupRedux";
import { moderateScale, generateBase64Thumbnail } from "Lib";
import {
  InputText,
  InputTextAutoComplete,
  InputPicker,
  ButtonPrimary,
  KeyboardFriendlyView
} from "Components";
import { Images, Colors, METRICS } from "Themes";
import AppConfig from "Config/AppConfig";
import SignupWrapper from "./SignupWrapper";

const LIFETIME = new Date("3000-01-01");

class CardIdentityForm extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null
    };
  };

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
      kecamatan_id: null
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
      kecamatan_id: null
    },

    show_expired_modal: false,
    show_date_modal: false,
    is_can_continue: false
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
        kecamatan_id
      }
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
      kecamatan_id
    };
    storeFarmerKtp(ktpData);
    navigation.navigate("AreaList");
  };

  openExpiredDate = () => {
    this.setState(prevState => {
      return {
        show_expired_modal: !prevState.show_expired_modal
      };
    });
  };

  setExpiredDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      show_expired_modal: false,
      form: { ...this.state.form, expired_date: date }
    });
  };

  setLifetimeExpiredDate = (key, value) => {
    const isLifeTime = value === "Seumur hidup";
    const expired_date = isLifeTime ? LIFETIME : new Date();
    this.setState({ form: { ...this.state.form, expired_date } });
  };

  openBirthDate = () => {
    this.setState(prevState => {
      return {
        show_date_modal: !prevState.show_date_modal
      };
    });
  };

  setBirthDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      show_date_modal: false,
      form: { ...this.state.form, birth_date: date }
    });
  };

  onCanContinue = () => {
    const { form } = this.state;
    const isCanContinue = Object.values(form).every(o => o && o !== "");
    this.setState({
      is_can_continue: isCanContinue
    });
  };

  onChangeText = (value, stateName) => {
    this.setState(
      { form: { ...this.state.form, [stateName]: value } },
      this.onCanContinue
    );
  };

  onSelectionChange = (key, value, stateName) => {
    this.setState(
      { form: { ...this.state.form, [stateName]: value } },
      this.onCanContinue
    );
  };

  onAutoCompleteChange = ({ value }, stateName) => {
    this.setState(
      { form: { ...this.state.form, [stateName]: value } },
      this.onCanContinue
    );
  };

  onPhotoChange = async (name, raw = [], paths = []) => {
    if (!Array.isArray(raw)) return;
    const photos = raw.map((item, i) => {
      const { mime, path, data } = raw[i];
      return { mime, path, data };
    });
    const { data: dataBase64, mime } = photos.length ? photos[0] : null;
    const thumbnail = await generateBase64Thumbnail(dataBase64);
    this.setState({
      form: {
        ...this.state.form,
        [name]: photos,
        [`${name}_thumbnail`]: thumbnail
      }
    });
  };

  render() {
    const {
      form: {
        nik,
        name,
        birth_place,
        birth_date,
        show_expired_modal,
        show_date_modal,
        expired_date
      },
      is_can_continue
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <SignupWrapper title="Data KTP">
          <InputText
            refs={ref => (this._nik = ref)}
            isAllBorderShown
            name="nik"
            title="NIK"
            value={nik || ""}
            // error={nik_error}
            onChangeText={this.onChangeText}
            onSubmitEditing={() => this._name.focus()}
            keyboardType="numeric"
            returnKeyType="next"
          />

          <InputText
            refs={ref => (this._name = ref)}
            isAllBorderShown
            name="name"
            title="Nama"
            value={name || ""}
            // error={name_error}
            onChangeText={this.onChangeText}
            onSubmitEditing={() => this._birth_place.focus()}
            returnKeyType="next"
          />

          <View
            style={{
              flexDirection: "row"
            }}
          >
            <InputText
              refs={ref => (this._birth_place = ref)}
              isAllBorderShown
              name="birth_place"
              title="Tempat"
              value={birth_place || ""}
              // error={birth_place_error}
              onChangeText={this.onChangeText}
              returnKeyType="done"
              styleContainer={{
                flex: 1,
                marginHorizontal: 0,
                marginRight: moderateScale(5)
              }}
            />

            <TouchableOpacity
              onPress={this.openBirthDate}
              style={{
                flex: 1
              }}
            >
              <InputText
                isAllBorderShown
                title="Tanggal Lahir"
                name="birth_date"
                value={moment(birth_date).format("DD MMM YYYY") || ""}
                // error={birth_date_error}
                onChangeText={this.onChangeText}
                styleContainer={{
                  flex: 1,
                  marginHorizontal: 0
                }}
                editable={false}
                isShowIcon
                icon={Images.calendar}
                iconStyle={{ tintColor: null }}
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

          <AutoAddressInput
            onAddressDetailChanged={text =>
              this.onChangeText(text, "address_detail")
            }
            onRtRwChanged={text => this.onChangeText(text, "rtrw")}
            onKecamatanIdChanged={text =>
              this.onChangeText(text, "kecamatan_id")
            }
          />

          <InputTextAutoComplete
            name="religion"
            title="Agama"
            isAllBorderShown
            dataLocal={AppConfig.religion}
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
              <TouchableOpacity
                onPress={this.openExpiredDate}
                style={{
                  marginBottom: METRICS.NORMAL,
                  marginHorizontal: 0
                }}
              >
                <InputText
                  value={moment(expired_date).format("DD MMM YYYY") || ""}
                  // error={expired_date_error}
                  isAllBorderShown
                  editable={false}
                  prefixIcon={Images.calendar}
                  prefixIconStyle={{
                    tintColor: Colors.disabled_light
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </SignupWrapper>

        {show_expired_modal ? (
          <DateTimePicker
            value={expired_date}
            mode="date"
            display="default"
            onChange={this.setExpiredDate}
          />
        ) : null}

        {show_date_modal ? (
          <DateTimePicker
            value={birth_date}
            mode="date"
            display="default"
            onChange={this.setBirthDate}
          />
        ) : null}

        <ButtonPrimary
          onPress={this.onSubmit}
          disabled={!is_can_continue}
          title="Selanjutnya"
        />
      </View>
    );
  }
}

CardIdentityForm.propTypes = {
  storeFarmerKtp: func
};

const mapDispatchToProps = dispatch => ({
  storeFarmerKtp: ktp => dispatch(FarmerSignupActions.storeFarmerKtp(ktp))
});

export default connect(
  null,
  mapDispatchToProps
)(withNavigation(CardIdentityForm));
