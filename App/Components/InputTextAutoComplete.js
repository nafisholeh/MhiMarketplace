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

import { Colors, METRICS } from "Themes";
import { moderateScale, extractGraphQLResponse } from "Lib";
import ApolloClientProvider from "Services/ApolloClientProvider";

const MIN_CHAR_THRESHOLD = 3;

export default class InputTextAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCharSufficient: false,
      dropdownData: null,
      value: "",
      value_temp: "",
      visible: false,
    };
    this.fetchOptionDropdown = _.throttle(this.fetchOptionDropdown, 2000);
  }

  fetchOptionDropdown = (text) => {
    const { query, queryVariables, dropdownKey, dropdownValue } = this.props;
    const variables = queryVariables || "term";
    const dropdownKeyTitle = dropdownKey || "name";
    const dropdownValueTitle = dropdownValue || "name";
    ApolloClientProvider.client
      .query({ query, variables: { [variables]: text } })
      .then((data) => {
        const response = extractGraphQLResponse(data);
        if (!Array.isArray(response)) return;
        const normalisedData = response.map((item) => ({
          key: item[dropdownKeyTitle],
          value: item[dropdownValueTitle],
        }));
        this.setState({ dropdownData: normalisedData });
      })
      .catch((error) => {});
  };

  onChangeTextWillFetch = (text) => {
    this.onValueChangeCallback({ key: null, name: text });
    if (text.length >= MIN_CHAR_THRESHOLD) {
      this.setState({
        value_temp: text,
        isCharSufficient: true,
        dropdownData: null,
      });
      this.fetchOptionDropdown(text);
      return;
    }
    this.setState({
      value_temp: text,
      isCharSufficient: false,
      dropdownData: null,
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
        value_temp: text,
        isCharSufficient: true,
        dropdownData: filteredDropdown,
      });
      return;
    }
    this.setState({
      value_temp: text,
      isCharSufficient: false,
      dropdownData: null,
    });
  };

  onChangeTempText = (text) => {
    const { dataLocal } = this.props;
    if (dataLocal) {
      this.onChangeTextShowDataLocal(text);
    } else {
      this.onChangeTextWillFetch(text);
    }
  };

  onFocus = () => {
    this.setState(
      { value: "", isCharSufficient: false, dropdownData: null },
      () => this.onValueChangeCallback(null)
    );
  };

  onValueChangeCallback = (item) => {
    const { onValueChange, name } = this.props;
    onValueChange(item || { value: null }, name);
  };

  openModal = () => {
    this.setState({ visible: true });
  };

  dismissModal = () => {
    this.setState({ visible: false });
  };

  renderAutoSuggestionResult = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.onSelectDropdown(item)}
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
      { visible: false, value_temp: "", value, dropdownData: null },
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
    const { dropdownData, value, value_temp, visible } = this.state;
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
            onPress={this.openModal}
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
          backdropColor={Colors.disabled_dark}
          backdropOpacity={0.4}
          style={{ justifyContent: "flex-start" }}
        >
          <View>
            <TextInput
              value={value_temp}
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
            <FlatList
              data={dropdownData}
              renderItem={this.renderAutoSuggestionResult}
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
