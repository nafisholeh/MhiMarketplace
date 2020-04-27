import React, { Component } from "react";
import { View } from "react-native";
import { func } from "prop-types";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import FarmerSignupActions from "Redux/FarmerSignupRedux";
import { isEmailError, moderateScale } from "Lib";
import { InputText, ButtonPrimary } from "Components";
import SignupWrapper from "./SignupWrapper";

class AccountCredsForm extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null,
    };
  };

  state = {
    phone: null,
    error_phone: null,
    email: null,
    error_email: null,
    password: null,
    error_password: null,
    password_repeat: null,
    error_password_repeat: null,
    loading: false,
    is_can_continue: false,
  };

  componentDidMount() {
    this.onEligibleToSubmit();
  }

  onStartSignup = async () => {
    const { phone, email, password, password_repeat } = this.state;
    await this.setState({
      error_phone: null,
      error_password: null,
      error_password_repeat: null,
    });
    let isValid = true;
    if (!phone) {
      await this.setState({ error_phone: "Nomor HP harus diisi" });
      isValid = false;
    }
    if (!email || email === 0) {
      await this.setState({ error_email: "Email harus diisi" });
      isValid = false;
    }
    if (password && password_repeat && password !== password_repeat) {
      await this.setState({
        error_password_repeat: "Password masih belum sama",
      });
    }
    if (!password || password === 0) {
      await this.setState({ error_password: "Password harus diisi" });
      isValid = false;
    }
    if (!password_repeat || password_repeat === 0) {
      await this.setState({
        error_password_repeat: "Password perlu diulang lagi",
      });
      isValid = false;
    }
    if (isValid) {
      this.onSignup();
    }
  };

  onSignup = () => {
    const { navigation, storeFarmerCreds } = this.props;
    const { phone, email, password } = this.state;
    storeFarmerCreds(phone, email, password);
    navigation.navigate("SignupFarmerSecond");
  };

  onEligibleToSubmit = () => {
    const { phone, email, password, password_repeat } = this.state;
    this.setState({
      is_can_continue:
        phone && email && password && password_repeat ? true : false,
    });
  };

  onChangeText = (value, stateName) => {
    this.setState({ [stateName]: value }, this.onEligibleToSubmit);
  };

  render() {
    const {
      phone,
      error_phone,
      email,
      error_email,
      password,
      error_password,
      password_repeat,
      error_password_repeat,
      loading,
      is_can_continue,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <SignupWrapper title="Kuncinya akun">
          <InputText
            name="phone"
            refs={(ref) => (this._phone = ref)}
            isAllBorderShown
            title="Nomor HP"
            value={phone || ""}
            error={error_phone}
            onChangeText={this.onChangeText}
            returnKeyType="next"
            keyboardType="numeric"
            onSubmitEditing={() => this._email.focus()}
          />

          <InputText
            name="email"
            refs={(ref) => (this._email = ref)}
            isAllBorderShown
            title="Email"
            value={email || ""}
            error={error_email || isEmailError(email)}
            onChangeText={this.onChangeText}
            returnKeyType="next"
            keyboardType="email-address"
            onSubmitEditing={() => this._password.focus()}
          />

          <InputText
            name="password"
            refs={(ref) => (this._password = ref)}
            isAllBorderShown
            title="Password"
            value={password || ""}
            error={error_password}
            secureTextEntry={true}
            onChangeText={this.onChangeText}
            onSubmitEditing={() => this._password_repeat.focus()}
            returnKeyType="next"
          />

          <InputText
            name="password_repeat"
            refs={(ref) => (this._password_repeat = ref)}
            isAllBorderShown
            title="Ulangi Password"
            value={password_repeat || ""}
            error={error_password_repeat}
            secureTextEntry={true}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onStartSignup}
            returnKeyType="go"
            containerStyle={{
              marginHorizontal: moderateScale(40),
              marginBottom: moderateScale(25),
            }}
          />
        </SignupWrapper>
        <ButtonPrimary
          onPress={this.onSignup}
          disabled={loading || !is_can_continue}
          loading={loading}
          title="Selanjutnya"
        />
      </View>
    );
  }
}

AccountCredsForm.propTypes = {
  storeFarmerCreds: func,
};

const mapDispatchToProps = (dispatch) => ({
  storeFarmerCreds: (phone, email, password) =>
    dispatch(FarmerSignupActions.storeFarmerCreds(phone, email, password)),
});

export default connect(
  null,
  mapDispatchToProps
)(withNavigation(AccountCredsForm));
