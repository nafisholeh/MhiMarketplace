import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import _ from "lodash";

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
        value: text,
        isCharSufficient: true,
        dropdownData: null,
      });
      this.fetchOptionDropdown(text);
      return;
    }
    this.setState({
      value: text,
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
        value: text,
        isCharSufficient: true,
        dropdownData: filteredDropdown,
      });
      return;
    }
    this.setState({
      value: text,
      isCharSufficient: false,
      dropdownData: null,
    });
  };

  onChangeText = (text) => {
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

  onSelectDropdown = (item) => {
    const { value } = item || {};
    this.setState({ value, dropdownData: null }, () =>
      this.onValueChangeCallback(item)
    );
  };

  onValueChangeCallback = (item) => {
    const { onValueChange, name } = this.props;
    onValueChange(item || { value: null }, name);
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
    const { dropdownData, value } = this.state;
    return (
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
          <View></View>
        )}
        <View
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
            ref={(el) => (this._textInput = el)}
            value={value}
            underlineColorAndroid="transparent"
            inputColorPlaceholder={Colors.BORDER}
            placeholderTextColor={Colors.disabled_light}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            style={
              isAllBorderShown ? styles.inputValueAllBorder : styles.inputValue
            }
          />
        </View>
        <View>
          <FlatList
            data={dropdownData}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.onSelectDropdown(item)}
                style={{
                  paddingVertical: METRICS.SMALL,
                  paddingHorizontal: METRICS.TINY,
                  borderBottomColor: Colors.BORDER,
                  borderBottomWidth: METRICS.BORDER_THIN,
                }}
              >
                <Text>{item.value}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.key}
          />
        </View>
      </View>
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
