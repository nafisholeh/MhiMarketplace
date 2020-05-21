/*
 * @Author: ashoka
 * @Date: 2018-05-20 14:40:24
 */
import React, { Component } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";

import { METRICS, Colors, FONTS } from "Themes";
import AppConfig from "Config/AppConfig";

export default class YearMonthPicker extends Component {
  constructor(props) {
    super(props);
    let {
      startYear,
      endYear,
      startMonth,
      endMonth,
      selectedYear,
      selectedMonth,
      visible,
    } = props;
    let years = this.getYears(startYear, endYear);
    let months = this.getMonths(startMonth, endMonth);
    this.state = {
      years,
      months,
      selectedYear,
      selectedMonth,
      visible: visible || false,
      isSubmitEligible: false,
    };
  }

  show = async ({
    startYear,
    endYear,
    startMonth,
    endMonth,
    selectedYear,
    selectedMonth,
  }) => {
    let years = this.getYears(startYear, endYear);
    let months = this.getMonths(startMonth, endMonth);
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

  getMonths = (startMonth, endMonth) => {
    const filteredMonth = AppConfig.month.slice(
      startMonth || 0,
      endMonth || 12
    );
    return filteredMonth.map((item) => item.label);
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

  onPressItem = (item, stateName) => {
    const { selectedMonth, selectedYear } = this.state;
    let isEligible = false;
    if (
      (stateName === "selectedMonth" && selectedYear) ||
      (stateName === "selectedYear" && selectedMonth)
    ) {
      isEligible = true;
    }
    this.setState({ [stateName]: item, isSubmitEligible: isEligible });
  };

  renderItem = (item, stateName) => {
    const { selectedYear, selectedMonth } = this.state;
    const isSelected = selectedMonth === item || selectedYear === item;
    return (
      <TouchableOpacity
        onPress={() => this.onPressItem(item, stateName)}
        style={{
          padding: METRICS.MEDIUM,
          marginHorizontal: METRICS.TINY,
          borderRadius: METRICS.TINY,
          backgroundColor: isSelected
            ? Colors.PICKER_ITEM_HIGHLIGHTED
            : Colors.white,
        }}
      >
        <Text
          style={[
            { ...FONTS.BODY_NORMAL, ...{ textAlign: "center" } },
            isSelected ? { color: Colors.white } : null,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      years,
      months,
      selectedYear,
      selectedMonth,
      visible,
      isSubmitEligible,
    } = this.state;
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
        <View style={{ height: METRICS.PICKER_BOTTOM_HEIGHT }}>
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
              disabled={!isSubmitEligible}
            >
              <Text
                style={[
                  FONTS.BODY_BOLD,
                  {
                    color: !isSubmitEligible ? Colors.text_light : Colors.text,
                  },
                ]}
              >
                Simpan
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.innerContainer}>
            <FlatList
              data={months}
              renderItem={({ item }) => this.renderItem(item, "selectedMonth")}
              keyExtractor={(item) => item.label}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: METRICS.EXTRA_HUGE,
                paddingBottom: METRICS.EXTRA_HUGE * 2,
              }}
            />
            <FlatList
              data={years}
              renderItem={({ item }) => this.renderItem(item, "selectedYear")}
              keyExtractor={(item) => item.label}
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
