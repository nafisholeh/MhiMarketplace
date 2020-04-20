/*
 * @Author: ashoka
 * @Date: 2018-05-20 14:40:24
 */
import React, { Component } from "react";
import {
  FlatList,
  View,
  Picker,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";

import { METRICS, Colors, FONTS } from "Themes";
import AppConfig from "Config/AppConfig";

export default class YearMonthPicker extends Component {
  constructor(props) {
    super(props);
    let { startYear, endYear, selectedYear, selectedMonth, visible } = props;
    let years = this.getYears(startYear, endYear);
    let months = this.getMonths();
    this.state = {
      years,
      months,
      selectedYear,
      selectedMonth,
      visible: visible || false,
    };
  }

  show = async ({ startYear, endYear, selectedYear, selectedMonth }) => {
    let years = this.getYears(startYear, endYear);
    let months = this.getMonths();
    let promise = new Promise((resolve) => {
      this.confirm = (year, month) => {
        resolve({
          year,
          month,
        });
      };
      this.setState({
        visible: true,
        years,
        months,
        startYear: startYear,
        endYear: endYear,
        selectedYear: selectedYear,
        selectedMonth: selectedMonth,
      });
    });
    return promise;
  };

  dismiss = () => {
    this.setState({ visible: false });
  };

  getYears = (startYear, endYear) => {
    startYear = startYear || new Date().getFullYear();
    endYear = endYear || new Date().getFullYear();
    let years = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }
    return years;
  };

  getMonths = () => {
    return AppConfig.month.map((item) => item.label);
  };

  renderPickerItems = (data) => {
    let items = data.map((value, index) => {
      return (
        <Picker.Item key={"r-" + index} label={"" + value} value={value} />
      );
    });
    return items;
  };

  onCancelPress = () => {
    this.dismiss();
  };

  onConfirmPress = () => {
    const confirm = this.confirm;
    const { selectedYear, selectedMonth } = this.state;
    confirm && confirm(selectedYear, selectedMonth);
    this.dismiss();
  };

  renderItem = (item, stateName) => {
    return (
      <TouchableOpacity
        onPress={() => this.setState({ [stateName]: item })}
        style={{ padding: METRICS.MEDIUM }}
      >
        <Text style={{ ...FONTS.BODY_NORMAL, ...{ textAlign: "center" } }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { years, months, selectedYear, selectedMonth, visible } = this.state;
    return (
      <Modal
        isVisible={visible}
        swipeThreshold={40}
        onSwipeComplete={this.dismiss}
        swipeDirection="down"
        onBackdropPress={this.dismiss}
        onBackButtonPress={this.dismiss}
        avoidKeyboard
        backdropColor={Colors.disabled_dark}
        backdropOpacity={0.4}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
      >
        <View style={{ height: METRICS.MODAL_BOTTOM_HEIGHT }}>
          <View style={styles.toolBar}>
            <View style={styles.toolBarButton}>
              <Text
                style={{
                  ...FONTS.BODY_NORMAL,
                  ...{ color: "rgba(0,0,0,0.3)" },
                }}
              >
                {selectedMonth || ""}
                {selectedMonth && selectedYear ? " " : ""}
                {selectedYear || ""}
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={styles.toolBarButton}
              onPress={this.onConfirmPress}
            >
              <Text style={FONTS.BODY_BOLD}>Simpan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.innerContainer}>
            <FlatList
              data={months}
              renderItem={({ item }) => this.renderItem(item, "selectedMonth")}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: METRICS.EXTRA_HUGE,
                paddingBottom: METRICS.EXTRA_HUGE * 2,
              }}
            />
            <FlatList
              data={years}
              renderItem={({ item }) => this.renderItem(item, "selectedYear")}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: METRICS.EXTRA_HUGE,
                paddingBottom: METRICS.EXTRA_HUGE * 2,
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  toolBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: METRICS.EXTRA_HUGE,
    borderBottomWidth: 1,
    borderColor: Colors.BORDER,
    backgroundColor: Colors.white,
  },
  toolBarButton: {
    height: METRICS.EXTRA_HUGE,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});
