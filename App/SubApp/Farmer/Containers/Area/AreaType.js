import React, { Component } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { connect } from "react-redux";
import { func } from "prop-types";

import { withNoHeader } from "Hoc";
import FarmerSignupActions from "Redux/FarmerSignupRedux";
import {
  ButtonPrimary,
  InputText,
  InputPicker,
  YearMonthPicker,
} from "Components";
import AppConfig, { YEAR_RANGE_START, YEAR_RANGE_END } from "Config/AppConfig";
import { METRICS } from "Themes";

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

  renderBottom = () => {
    const { status } = this.state;
    return (
      <ButtonPrimary
        title={
          status === AppConfig.areaStatus.RENTED ? "Selesai" : "Isi Komoditi"
        }
        onPress={this.onSubmit}
      />
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
      <View>
        <InputPicker
          name="type"
          title="Tipe lahan"
          dataLocal={AppConfig.areaType}
          onSelectionChange={this.onSelectionChange}
        />
        <InputPicker
          name="status"
          title="Status lahan"
          dataLocal={AppConfig.areaStatus}
          onSelectionChange={this.onSelectionChange}
        />
        {status !== AppConfig.ownedArea ? (
          <View>
            <InputText
              name="name"
              title="Nama sesuai KTP"
              value={name || ""}
              onChangeText={this.onChangeText}
              isAllBorderShown
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
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View />
        )}
        <YearMonthPicker ref={(picker) => (this.picker = picker)} />
      </View>
    );
  }
}

AreaType.propTypes = {
  storeFarmerType: func,
};

const mapDispatchToProps = (dispatch) => ({
  storeFarmerType: (area) =>
    dispatch(FarmerSignupActions.storeFarmerType(area)),
});

export default connect(null, mapDispatchToProps)(withNoHeader(AreaType));
