import React, { Component, Fragment } from "react";
import { func } from "prop-types";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import { withNoHeader } from "Hoc";
import FarmerSignupActions from "Redux/FarmerSignupRedux";
import { isEmailError, moderateScale } from "Lib";
import { InputText, ButtonPrimary } from "Components";
import SignupWrapper from "./SignupWrapper";

class AccountCredsForm extends Component {
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
    const { password, password_repeat } = this.state;
    const isPasswordSimilar = password === password_repeat;
    await this.setState({
      error_password_repeat: isPasswordSimilar
        ? null
        : "Password masih belum sama",
    });
    if (isPasswordSimilar) {
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
        phone && email && password && password_repeat && !isEmailError(email)
          ? true
          : false,
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
      <Fragment>
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
          onPress={this.onStartSignup}
          disabled={loading || !is_can_continue}
          loading={loading}
          title="Selanjutnya"
        />
      </Fragment>
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
)(withNavigation(withNoHeader(AccountCredsForm)));
