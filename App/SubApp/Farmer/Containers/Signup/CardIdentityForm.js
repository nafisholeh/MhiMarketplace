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
    nik: null,
    nik_error: null,
    name: null,
    name_error: null,
    birth_place: null,
    birth_place_error: null,
    birth_date: new Date("1990-01-01"),
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
    expired_date: LIFETIME,
    expired_date_error: null,
    photo_face: null,
    photo_face_thumbnail: null,
    photo_face_error: null,
    photo_ktp: null,
    photo_ktp_thumbnail: null,
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
    loading: false
  };

  onSubmit = async () => {
    const { navigation, storeFarmerKtp } = this.props;
    const {
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
      photo_face,
      photo_face_thumbnail,
      photo_ktp,
      photo_ktp_thumbnail,
      address_detail,
      rtrw,
      kodepos,
      kelurahan,
      kecamatan,
      kecamatan_id,
      kabupaten,
      provinsi
    } = this.state;
    let photo = {};
    if (Array.isArray(photo_face) && photo_face.length) {
      photo = Object.assign({}, photo, {
        photo_face: photo_face[0],
        photo_face_thumbnail: photo_face_thumbnail
      });
    }
    if (Array.isArray(photo_ktp) && photo_ktp.length) {
      photo = Object.assign({}, photo, {
        photo_ktp: photo_ktp[0],
        photo_ktp_thumbnail: photo_ktp_thumbnail
      });
    }
    storeFarmerKtp(
      Object.assign(
        {},
        {
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
          photo_face,
          photo_ktp,
          address_detail,
          rtrw,
          kodepos,
          kelurahan,
          kecamatan,
          kecamatan_id,
          kabupaten,
          provinsi
        },
        photo
      )
    );
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
      expired_date: date
    });
  };

  setLifetimeExpiredDate = (key, value) => {
    const isLifeTime = value === "Seumur hidup";
    this.setState({
      expired_date: isLifeTime ? LIFETIME : new Date()
    });
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
      birth_date: date
    });
  };

  onChangeText = (value, stateName) => {
    this.setState({ [stateName]: value });
  };

  onSelectionChange = (key, value, stateName) => {
    console.tron.log("onSelectionChange", key, value, stateName);
    this.setState({ [stateName]: value });
  };

  onAutoCompleteChange = ({ value }, stateName) => {
    this.setState({ [stateName]: value });
  };

  onPhotoChange = async (name, raw = [], paths = []) => {
    if (!Array.isArray(raw)) return;
    const photos = raw.map((item, i) => {
      const { mime, path, data } = raw[i];
      return { mime, path, data };
    });
    const { data: dataBase64, mime } = photos.length ? photos[0] : null;
    const thumbnail = await generateBase64Thumbnail(dataBase64);
    this.setState({ [name]: photos, [`${name}_thumbnail`]: thumbnail });
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
  };

  render() {
    const {
      nik,
      nik_error,
      name,
      name_error,
      birth_place,
      birth_place_error,
      birth_date,
      birth_date_error,
      show_expired_modal,
      show_date_modal,
      expired_date,
      expired_date_error,
      heightBox1,
      heightBox2
    } = this.state;
    return (
      <KeyboardFriendlyView style={{ flex: 1 }}>
        <SignupWrapper title="Data KTP">
          <InputText
            refs={ref => (this._nik = ref)}
            isAllBorderShown
            name="nik"
            title="NIK"
            value={nik || ""}
            error={nik_error}
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
            error={name_error}
            onChangeText={this.onChangeText}
            returnKeyType="done"
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
              error={birth_place_error}
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
                error={birth_date_error}
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
              this.setState({ address_detail: text })
            }
            onRtRwChanged={text => this.setState({ rtrw: text })}
            onKodeposChanged={text => this.setState({ kodepos: text })}
            onKelurahanChanged={text => this.setState({ kelurahan: text })}
            onKecamatanChanged={text => this.setState({ kecamatan: text })}
            onKecamatanIdChanged={text => this.setState({ kecamatan_id: text })}
            onKabupatenChanged={text => this.setState({ kabupaten: text })}
            onProvinsiChanged={text => this.setState({ provinsi: text })}
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
                  error={expired_date_error}
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
      </KeyboardFriendlyView>
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
