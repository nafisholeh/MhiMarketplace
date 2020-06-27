import React, { Component, Fragment } from "react";
import { Alert, AppState, DeviceEventEmitter } from "react-native";
import { func } from "prop-types";
import { connect } from "react-redux";
import { withNavigation, withNavigationFocus } from "react-navigation";
import { openSettings } from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
import GoogleAPIAvailability from "react-native-google-api-availability-bridge";
import RNSettings from "react-native-settings";
import debounce from "lodash/debounce";

import { withNoHeader } from "Hoc";
import FarmerSignupActions from "Redux/FarmerSignupRedux";
import LocationActions from "Redux/LocationRedux";
import { isEmailError, moderateScale, requestLocationPermission } from "Lib";
import { InputText, ButtonPrimary } from "Components";
import { STRINGS, METRICS } from "Themes";
import SignupWrapper from "./SignupWrapper";
import { DEBOUNCE_DEVICE_EVENT_EMITTER } from "Config/AppConfig";

class AccountCredsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      currentAppState: AppState.currentState,
    };
    this.onLocationSettingsChanged = debounce((isEnabled) => {
      if (!isEnabled) {
        this.initializeLocation();
      }
    }, DEBOUNCE_DEVICE_EVENT_EMITTER);
  }

  componentDidMount = async () => {
    await this.initializeLocation();
    this.onEligibleToSubmit();
  };

  componentWillMount() {
    DeviceEventEmitter.addListener(
      RNSettings.GPS_PROVIDER_EVENT,
      this.handleGPSProviderEvent
    );
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener(RNSettings.GPS_PROVIDER_EVENT);
  }

  handleGPSProviderEvent = (e) => {
    if (e[RNSettings.LOCATION_SETTING] === RNSettings.DISABLED) {
      this.onLocationSettingsChanged(false);
    }
    if (e[RNSettings.LOCATION_SETTING] === RNSettings.ENABLED) {
      this.onLocationSettingsChanged(true);
    }
  };

  initializeLocation = async () => {
    const { setLocationStatus, navigation } = this.props;
    Geolocation.getCurrentPosition(
      (position) => {
        console.tron.log("position.received", position);
      },
      async (error) => {
        const { code } = error || {};
        switch (code) {
          case METRICS.GPS_ERROR_CODES.PERMISSION_DENIED:
            await this.requestLocationPermission();
            setLocationStatus(METRICS.GPS_ERROR_CODES.PERMISSION_DENIED);
            break;
          case METRICS.GPS_ERROR_CODES.PLAY_SERVICE_NOT_AVAILABLE:
            this.handlePlayServiceUnavailable();
            break;
          case METRICS.GPS_ERROR_CODES.SETTINGS_NOT_SATISFIED:
            this.showAlert(
              STRINGS.LOC_RESPONSE_SETTINGS_UNSATISFIED,
              "OK",
              () => navigation.pop()
            );
            break;
          case METRICS.GPS_ERROR_CODES.POSITION_UNAVAILABLE:
            this.showAlert(
              STRINGS.LOC_RESPONSE_POSITION_UNAVAILABLE,
              "OK",
              () => navigation.pop()
            );
            break;
          case METRICS.GPS_ERROR_CODES.TIMEOUT:
            this.showAlert(STRINGS.LOC_RESPONSE_TIMEOUT, "OK", () =>
              navigation.pop()
            );
            break;
          case METRICS.GPS_ERROR_CODES.INTERNAL_ERROR:
          default:
            this.showAlert(STRINGS.LOC_RESPONSE_INTERNAL_ERROR, "OK", () =>
              navigation.pop()
            );
            break;
        }
      },
      {
        enableHighAccuracy: METRICS.GPS_HIGH_ACCURACY,
        timeout: METRICS.GPS_TIMEOUT,
        maximumAge: METRICS.GPS_MAXIMUM_AGE,
      }
    );
  };

  handlePlayServiceUnavailable = async () => {
    const { navigation } = this.props;
    const result = await GoogleAPIAvailability.checkGooglePlayServices();
    switch (result) {
      case "update":
        GoogleAPIAvailability.promptGooglePlayUpdate(false);
        break;
      case "missing":
      case "disabled":
        GoogleAPIAvailability.showServiceMissingDialog();
        break;
      case "invalid":
        GoogleAPIAvailability.showGooglePlayInvalid(
          STRINGS.LOC_INVALID_RESPONSE,
          false
        );
        break;
      case "updating":
        this.showAlert(STRINGS.LOC_RESPONSE_UPDATING, "OK", () =>
          navigation.pop()
        );
        break;
      default:
        this.showAlert(STRINGS.LOC_RESPONSE_UNKNOWN_ERROR, "OK", () =>
          navigation.pop()
        );
        break;
    }
  };

  requestLocationPermission = async () => {
    const { navigation } = this.props;
    const status = await requestLocationPermission();
    switch (status) {
      case STRINGS.LOC_DENIED:
        this.showAlert(STRINGS.LOC_DENIED_RESPONSE, "OK", () =>
          navigation.pop()
        );
        break;
      case STRINGS.LOC_NEVER_ASK_AGAIN:
        this.openSettingsMenu();
        break;
      case STRINGS.LOC_GRANTED:
      default:
        this.initializeLocation();
        break;
    }
  };

  openSettingsMenu = () => {
    this.showAlert(STRINGS.LOC_NEVER_ASK_AGAIN_RESPONSE, "Buka Settings", () =>
      openSettings()
    );
  };

  showAlert = (message, buttonTitle, onPress) => {
    Alert.alert(
      "",
      message,
      [
        {
          text: buttonTitle || "OK",
          onPress: onPress,
        },
      ],
      { cancelable: false }
    );
  };

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

  parseValidPhone = () => {
    const { phone } = this.state;
    if (typeof phone === "string")
      return phone.charAt(0) === "0" ? phone : `0${phone}`;
    return phone;
  };

  onSignup = () => {
    const { navigation, storeFarmerCreds } = this.props;
    const { email, password } = this.state;
    const validPhone = this.parseValidPhone();
    storeFarmerCreds(validPhone, email, password);
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

  onChangePhone = (formatted, raw, stateName) => {
    this.setState({ [stateName]: raw });
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
            prefix="+62"
            prefixTheme="block"
            mask="[000] [0000] [0000] [0000]"
            value={phone || ""}
            error={error_phone}
            onChangeTextMask={this.onChangePhone}
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
  setLocationStatus: func,
};

const mapDispatchToProps = (dispatch) => ({
  storeFarmerCreds: (phone, email, password) =>
    dispatch(FarmerSignupActions.storeFarmerCreds(phone, email, password)),
  setLocationStatus: (status) =>
    dispatch(LocationActions.setLocationStatus(status)),
});

export default connect(
  null,
  mapDispatchToProps
)(withNavigation(withNoHeader(AccountCredsForm)));
