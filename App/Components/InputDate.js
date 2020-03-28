import React, { Component, Fragment } from "react";
import { TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import InputText from "./InputText";
import { Images } from "Themes";

export default class InputDate extends Component {
  state = {
    date_raw: new Date(),
    date_formatted: moment().format("DD MMM YYYY"),
    is_open_modal: false
  };

  openDateModal = () => {
    this.setState(prevState => {
      return {
        is_open_modal: !prevState.is_open_modal
      };
    });
  };

  onChangeDate = (event, date) => {
    const { onChangeDate, name } = this.props;
    const dateValue =
      moment(date || this.state.date).format("DD MMM YYYY") || "";
    this.setState(
      {
        is_open_modal: false,
        date_raw: date,
        date_formatted: dateValue
      },
      () => {
        if (onChangeDate) onChangeDate(date, name);
      }
    );
  };

  render() {
    const { is_open_modal, date_raw, date_formatted } = this.state;
    const { iconCalendar } = this.props;
    return (
      <Fragment>
        <TouchableOpacity
          onPress={this.openDateModal}
          style={{
            flex: 1
          }}
        >
          <InputText
            {...this.props}
            value={date_formatted}
            styleContainer={{
              flex: 1,
              marginHorizontal: 0
            }}
            editable={false}
            isShowIcon
            icon={iconCalendar || Images.calendar}
            iconStyle={{ tintColor: null }}
          />
        </TouchableOpacity>
        {is_open_modal ? (
          <DateTimePicker
            value={date_raw}
            mode="date"
            display="default"
            onChange={this.onChangeDate}
          />
        ) : null}
      </Fragment>
    );
  }
}
