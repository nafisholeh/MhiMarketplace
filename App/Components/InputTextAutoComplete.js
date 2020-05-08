import React, { Component, Fragment } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import _ from "lodash";
import Modal from "react-native-modal";
import { DotIndicator } from "react-native-indicators";
import get from "lodash/get";

import { Colors, METRICS, FONTS, STRINGS } from "Themes";
import {
  moderateScale,
  extractGraphQLResponse,
  capitalizeFirstLetter,
} from "Lib";
import ApolloClientProvider from "Services/ApolloClientProvider";

const MIN_CHAR_THRESHOLD = 3;

export default class InputTextAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTextSufficient: false,
      suggestionList: null,
      value: "",
      valueTemp: "",
      isManualInput: false,
      isFetching: false,
      isError: false,
      visible: false,
    };
    this.fetchSuggestion = _.debounce(this.fetchSuggestion, 2000, {
      trailing: true,
    });
  }

  getDropdownKey = () => {
    const { dropdownKey } = this.props;
    return dropdownKey || "key";
  };

  getDropdownValue = () => {
    const { dropdownValue } = this.props;
    return dropdownValue || "value";
  };

  getVariables = () => {
    const { queryVariables } = this.props;
    return queryVariables || "term";
  };

  fetchSuggestion = (text) => {
    const { query } = this.props;
    const variables = this.getVariables();
    const dropdownKeyTitle = this.getDropdownKey();
    const dropdownValueTitle = this.getDropdownValue();
    const regexFriendlyText = (text || "").replace(/[()*()?]/g, "\\$&");
    ApolloClientProvider.client
      .query({
        query,
        variables: { [variables]: regexFriendlyText },
        context: {
          isCustomError: true,
        },
      })
      .then((data) => {
        const response = extractGraphQLResponse(data);
        if (!Array.isArray(response)) return;
        const isValueArray = Array.isArray(dropdownValueTitle);
        const normalisedData = response.map((item) => {
          let value = "";
          if (isValueArray) {
            value = dropdownValueTitle
              .map((title) => get(item, title))
              .join(", ");
          } else {
            value = item[dropdownValueTitle];
          }
          return {
            key: item[dropdownKeyTitle],
            value: capitalizeFirstLetter(value),
          };
        });
        this.setState({
          suggestionList: normalisedData,
          isManualInput: response.length === 0,
        });
      })
      .catch(() => {
        this.setState({ isFetching: false, isError: true });
      })
      .finally(() => {
        this.setState({ isFetching: false });
      });
  };

  onChangeTextWillFetch = (text) => {
    if (text.length >= MIN_CHAR_THRESHOLD) {
      this.setState({
        valueTemp: text,
        isTextSufficient: true,
        suggestionList: null,
        isManualInput: false,
        isFetching: true,
        isError: false,
      });
      this.fetchSuggestion(text);
      return;
    }
    this.setState({
      valueTemp: text,
      isTextSufficient: false,
      suggestionList: null,
      isManualInput: false,
      isFetching: false,
      isError: false,
    });
  };

  onChangeTextShowDataLocal = (text) => {
    const { dataLocal } = this.props;
    if (text.length >= MIN_CHAR_THRESHOLD) {
      const filteredDropdown = (dataLocal || []).filter((item) => {
        const { value } = item || {};
        return new RegExp(text, "i").test(value);
      });
      this.setState({
        valueTemp: text,
        isTextSufficient: true,
        suggestionList: filteredDropdown,
        isManualInput: false,
      });
      return;
    }
    this.setState({
      valueTemp: text,
      isTextSufficient: false,
      suggestionList: null,
      isManualInput: false,
    });
  };

  onChangeTempText = (text) => {
    if (text === "") this.fetchSuggestion.cancel();
    const { dataLocal } = this.props;
    if (dataLocal) {
      this.onChangeTextShowDataLocal(text);
    } else {
      this.onChangeTextWillFetch(text);
    }
  };

  onFocus = () => {
    this.setState(
      { value: "", isTextSufficient: false, suggestionList: null },
      () => this.onValueChangeCallback(null)
    );
  };

  onValueChangeCallback = (item) => {
    const { onValueChange, name } = this.props;
    onValueChange(item || { value: null }, name);
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  onModalShow = () => {
    this.temp_input.focus();
  };

  dismissModal = () => {
    this.setState({ visible: false, isFetching: false, isError: false });
  };

  refetchSuggestion = () => {
    const { valueTemp } = this.state;
    this.onChangeTempText(valueTemp);
  };

  storeManualInput = () => {
    const { valueTemp } = this.state;
    this.onSelectDropdown({ value: valueTemp, isManualInput: true });
  };

  renderAutoSuggestionResult = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.onSelectDropdown(item)}
      activeOpacity={0.85}
      style={{
        paddingVertical: METRICS.MEDIUM,
        paddingHorizontal: METRICS.MEDIUM,
        borderBottomColor: Colors.BORDER,
        borderBottomWidth: METRICS.BORDER_THIN,
        backgroundColor: Colors.white,
      }}
    >
      <Text>{item.value}</Text>
    </TouchableOpacity>
  );

  onSelectDropdown = (item) => {
    const { value } = item || {};
    this.setState(
      { visible: false, valueTemp: value, value, suggestionList: null },
      () => this.onValueChangeCallback(item)
    );
  };

  render() {
    const {
      title,
      error,
      isAllBorderShown,
      styleContainer,
      styleBorder,
      styleInput,
    } = this.props;
    const {
      suggestionList,
      value,
      valueTemp,
      isManualInput,
      isFetching,
      isError,
      visible,
    } = this.state;
    return (
      <Fragment>
        <View style={{ ...styles.container, ...styleContainer }}>
          {title ? (
            <Text
              style={{
                ...styles.title,
                ...{ marginBottom: moderateScale(isAllBorderShown ? 5 : 0) },
              }}
            >
              {title}
            </Text>
          ) : (
            <View />
          )}
          <TouchableOpacity
            onPress={this.showModal}
            style={
              error
                ? [styles.inputContentError, styleBorder, styleInput]
                : [
                    isAllBorderShown
                      ? styles.inputContentAllBorder
                      : styles.inputContent,
                    styleBorder,
                    styleInput,
                  ]
            }
          >
            <TextInput
              value={value}
              underlineColorAndroid="transparent"
              inputColorPlaceholder={Colors.BORDER}
              placeholderTextColor={Colors.disabled_light}
              onChangeText={this.onChangeText}
              editable={false}
              selectTextOnFocus={false}
              style={
                isAllBorderShown
                  ? styles.inputValueAllBorder
                  : styles.inputValue
              }
            />
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={visible}
          swipeThreshold={40}
          swipeDirection="down"
          onSwipeComplete={this.dismissModal}
          onBackdropPress={this.dismissModal}
          onBackButtonPress={this.dismissModal}
          onModalShow={this.onModalShow}
          backdropColor={Colors.disabled_dark}
          backdropOpacity={0.4}
          style={{ justifyContent: "flex-start" }}
        >
          <View>
            <TextInput
              ref={(ref) => {
                this.temp_input = ref;
              }}
              value={valueTemp}
              underlineColorAndroid="transparent"
              inputColorPlaceholder={Colors.BORDER}
              placeholderTextColor={Colors.disabled_light}
              onChangeText={this.onChangeTempText}
              onFocus={this.onFocus}
              placeholder={title || "Ketik disini"}
              style={{
                ...styles.inputValueAllBorder,
                ...{
                  flex: 0,
                  backgroundColor: Colors.white,
                  borderRadius: METRICS.RADIUS_MEDIUM,
                  paddingHorizontal: METRICS.MEDIUM,
                  height: METRICS.EXTRA_HUGE,
                  marginBottom: METRICS.MEDIUM,
                },
              }}
            />
            {isManualInput || isError ? (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  backgroundColor: Colors.white,
                  height: METRICS.AUTO_SUGGEST_INFO,
                  paddingHorizontal: METRICS.HUGE,
                  paddingTop: METRICS.HUGE,
                  paddingBottom: METRICS.SMALL,
                }}
              >
                <Text style={{ ...FONTS.INFO, ...{ textAlign: "center" } }}>
                  {isError
                    ? `${STRINGS.NETWORK_ERROR_HEADER}. ${STRINGS.NETWORK_ERROR_BODY}`
                    : STRINGS.NO_DATA_FOUND}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    isError ? this.refetchSuggestion() : this.storeManualInput()
                  }
                  style={{ padding: METRICS.MEDIUM }}
                >
                  <Text
                    style={{ ...FONTS.INPUT_TITLE, ...{ textAlign: "center" } }}
                  >
                    {isError ? STRINGS.RELOAD : STRINGS.SAVE}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View />
            )}
            {isFetching ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.white,
                  height: METRICS.AUTO_SUGGEST_INFO,
                  padding: METRICS.HUGE,
                }}
              >
                <DotIndicator count={3} size={8} color={Colors.veggie_dark} />
              </View>
            ) : (
              <View />
            )}
            <FlatList
              data={suggestionList}
              renderItem={this.renderAutoSuggestionResult}
              keyboardShouldPersistTaps="handled"
              keyExtractor={(item) => item.key}
            />
          </View>
        </Modal>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: METRICS.HUGE,
  },
  prefix: {
    color: Colors.text,
    fontFamily: "CircularStd-Book",
    fontSize: 14,
    marginBottom: 2,
    marginRight: moderateScale(5),
  },
  title: {
    color: Colors.veggie_dark,
    fontFamily: "CircularStd-Book",
    fontSize: 13,
  },
  inputContent: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.brown_light,
    backgroundColor: Colors.white,
    paddingLeft: 0,
  },
  inputContentAllBorder: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Colors.brown_light,
    borderRadius: 5,
    backgroundColor: Colors.white,
    paddingLeft: 0,
  },
  inputContentError: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.red2,
    backgroundColor: Colors.white,
    paddingLeft: 0,
  },
  inputValue: {
    flex: 1,
    color: Colors.text,
    fontFamily: "CircularStd-Book",
    fontSize: 14,
    paddingBottom: moderateScale(4),
    paddingTop: moderateScale(4),
    paddingLeft: 0,
  },
  inputValueAllBorder: {
    flex: 1,
    color: Colors.text,
    fontFamily: "CircularStd-Book",
    fontSize: 14,
    paddingBottom: moderateScale(4),
    paddingTop: moderateScale(4),
    paddingHorizontal: METRICS.SMALL,
  },
  inputError: {
    position: "absolute",
    bottom: -15,
    left: 0,
    color: Colors.red2,
    fontFamily: "CircularStd-Book",
    fontSize: 12,
  },
  image: {
    width: moderateScale(20),
    height: moderateScale(14),
    alignSelf: "center",
    tintColor: Colors.veggie_light,
    marginRight: METRICS.TINY,
  },
  loading: {
    flex: 0,
  },
});
