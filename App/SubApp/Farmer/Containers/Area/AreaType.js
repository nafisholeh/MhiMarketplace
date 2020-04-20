import React, { Component } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { connect } from "react-redux";
import { func } from "prop-types";

import { withNoHeader } from "Hoc";
import FarmerSignupActions from "Redux/FarmerSignupRedux";
import { ButtonPrimary, InputText, InputPicker } from "Components";
import AppConfig from "Config/AppConfig";
import { FONTS, Colors } from "Themes";
import { moderateScale } from "Lib";
import YearMonthPicker from "./YearMonthPicker";

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
    startYear: 2005,
    endYear: 2050,
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

  showPicker = () => {
    const { startYear, endYear, selectedYear, selectedMonth } = this.state;
    this.picker
      .show({ startYear, endYear, selectedYear, selectedMonth })
      .then(({ year, month }) => {
        this.setState({
          selectedYear: year,
          selectedMonth: month,
        });
      });
  };

  render() {
    const {
      status,
      name,
      year_start,
      year_start_error,
      year_end,
      year_end_error,
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
            <TouchableOpacity onPress={() => this.showPicker()}>
              <InputText
                name="start"
                title="Mulai sewa"
                value={year_start || ""}
                onChangeText={this.onChangeText}
                isAllBorderShown
                editable={false}
              />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 2, marginRight: moderateScale(10) }}>
                <InputPicker
                  name="month_start"
                  title="Bulan (Mulai)"
                  placeholder="Pilih jenis kelamin"
                  dataLocal={AppConfig.month}
                  onSelectionChange={this.onSelectionChange}
                  styleContainer={{
                    flex: 2,
                    marginHorizontal: 0,
                  }}
                  styleText={{
                    marginHorizontal: 0,
                  }}
                />
              </View>
              <InputText
                name="year_start"
                title="Tahun"
                value={year_start || ""}
                error={year_start_error}
                onChangeText={this.onSelectionChange}
                styleContainer={{
                  flex: 1,
                  marginHorizontal: 0,
                  marginBottom: 0,
                }}
                keyboardType="numeric"
              />
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 2, marginRight: moderateScale(10) }}>
                <InputPicker
                  name="month_end"
                  title="Bulan (Selesai)"
                  placeholder="Pilih jenis kelamin"
                  dataLocal={AppConfig.month}
                  onSelectionChange={this.onSelectionChange}
                  styleContainer={{
                    flex: 2,
                    marginHorizontal: 0,
                  }}
                  styleText={{
                    marginHorizontal: 0,
                  }}
                />
              </View>
              <InputText
                name="year_end"
                title="Tahun"
                value={year_end || ""}
                error={year_end_error}
                onChangeText={this.onSelectionChange}
                styleContainer={{
                  flex: 1,
                  marginHorizontal: 0,
                  marginBottom: 0,
                }}
                keyboardType="numeric"
              />
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
