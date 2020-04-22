import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { func } from "prop-types";

import FarmerSignupActions from "Redux/FarmerSignupRedux";
import {
  ButtonTertier,
  InputText,
  InputPicker,
  YearMonthPicker,
} from "Components";
import AppConfig, { YEAR_RANGE_START, YEAR_RANGE_END } from "Config/AppConfig";
import { METRICS, Images, Colors, FONTS } from "Themes";
import { screenWidth } from "Lib";

class AreaType extends Component {
  state = {
    type: AppConfig.areaType[0],
    status: "rent", // oneOf [own, rent, rented]
    name: "",
    name_error: null,
    month_start: null,
    month_start_error: null,
    year_start: null,
    year_start_error: null,
    month_end: null,
    month_end_error: null,
    year_end: null,
    year_end_error: null,
    startYear: YEAR_RANGE_START,
    endYear: YEAR_RANGE_END,
    selectedYear: null,
    selectedMonth: null,
  };

  onSubmit = () => {
    const { navigation, storeFarmerType } = this.props;
    const {
      type,
      status,
      name,
      month_start,
      year_start,
      month_end,
      year_end,
    } = this.state;
    storeFarmerType({
      type,
      status,
      name,
      date_start: `${year_start}-${month_start}-01`,
      date_end: `${year_end}-${month_end}-01`,
    });
    navigation.navigate(
      status === AppConfig.areaStatus.RENTED ? "AreaList" : "AreaCommodity"
    );
  };

  onChangeText = (value, stateName) => {
    this.setState({ [stateName]: value });
  };

  onSelectionChange = (key, value, stateName) => {
    this.setState({ [stateName]: value });
  };

  showPicker = (type) => {
    const { startYear, endYear, selectedYear, selectedMonth } = this.state;
    this.picker
      .show({ startYear, endYear, selectedYear, selectedMonth })
      .then(({ year, month }) => {
        if (type === "start") {
          this.setState({
            year_start: year,
            month_start: month,
          });
        } else {
          this.setState({
            year_end: year,
            month_end: month,
          });
        }
      });
  };

  componentDidMount() {
    this.setState({ visible: true });
  }

  render() {
    const {
      status,
      name,
      month_start,
      month_end,
      year_start,
      year_end,
    } = this.state;
    return (
      <View
        style={{
          height:
            status !== AppConfig.ownedArea
              ? METRICS.AREA_DETAIL_EXPAND_HEIGHT
              : METRICS.AREA_DETAIL_HEIGHT,
          width: screenWidth,
          padding: METRICS.MEDIUM,
          paddingTop: METRICS.LARGE,
          backgroundColor: Colors.white,
          borderTopLeftRadius: METRICS.TINY,
          borderTopRightRadius: METRICS.TINY,
        }}
      >
        <InputPicker
          name="type"
          title="Tipe lahan"
          dataLocal={AppConfig.areaType}
          onSelectionChange={this.onSelectionChange}
          styleContainer={styles.fieldContainer}
        />
        <InputPicker
          name="status"
          title="Status lahan"
          dataLocal={AppConfig.areaStatus}
          onSelectionChange={this.onSelectionChange}
          styleContainer={styles.fieldContainer}
        />
        {status !== AppConfig.ownedArea ? (
          <View>
            <InputText
              name="name"
              title="Nama sesuai KTP"
              value={name || ""}
              onChangeText={this.onChangeText}
              isAllBorderShown
              styleContainer={styles.fieldContainer}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => this.showPicker("start")}
                style={{ flex: 1, marginRight: METRICS.SMALL }}
              >
                <InputText
                  name="start"
                  title="Mulai sewa"
                  value={`${month_start || ""} ${year_start || ""}`}
                  onChangeText={this.onChangeText}
                  isAllBorderShown
                  editable={false}
                  isShowIcon
                  icon={Images.map_drawing_calendar}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.showPicker("end")}
                style={{ flex: 1 }}
              >
                <InputText
                  name="end"
                  title="Akhir sewa"
                  value={`${month_end || ""} ${year_end || ""}`}
                  onChangeText={this.onChangeText}
                  isAllBorderShown
                  editable={false}
                  isShowIcon
                  icon={Images.map_drawing_calendar}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            position: "absolute",
            bottom: METRICS.MEDIUM,
            alignSelf: "center",
          }}
        >
          <ButtonTertier
            title="Batal"
            width={screenWidth / 2}
            colors={Colors.white}
            fonts={{
              ...FONTS.BODY_BOLD,
              ...{ color: Colors.BUTTON_TERTIER_INVERTED },
            }}
            onPress={this.onSubmit}
            style={{ borderWidth: 0, marginRight: METRICS.SMALL }}
          />
          <ButtonTertier
            title={
              status === AppConfig.areaStatus.RENTED ? "Selesai" : "Lanjut"
            }
            width={screenWidth / 2}
            colors={Colors.BUTTON_TERTIER}
            fonts={{ ...FONTS.BODY_BOLD, ...{ color: Colors.white } }}
            onPress={this.onSubmit}
          />
        </View>
        <YearMonthPicker ref={(picker) => (this.picker = picker)} />
      </View>
    );
  }
}

AreaType.propTypes = {
  storeFarmerType: func,
};

const styles = StyleSheet.create({
  fieldContainer: { marginBottom: METRICS.INPUT_VERTICAL_SPACING },
});

const mapDispatchToProps = (dispatch) => ({
  storeFarmerType: (area) =>
    dispatch(FarmerSignupActions.storeFarmerType(area)),
});

export default connect(null, mapDispatchToProps)(AreaType);
