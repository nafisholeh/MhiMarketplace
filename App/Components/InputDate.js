import React, { PureComponent, Fragment } from "react";
import { TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import InputText from "./InputText";
import { Images } from "Themes";

export default class InputDate extends PureComponent {
  state = {
    date_raw: new Date(),
    date_formatted: moment().format("DD MMM YYYY"),
    is_open_modal: false
  };

  componentDidMount() {
    this.onParseDate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.onParseDate();
    }
  }

  openDateModal = () => {
    this.setState({ is_open_modal: true });
  };

  onParseDate = () => {
    const { value: rawValue } = this.props;
    if (!rawValue) return;
    const formattedValue = moment(rawValue).format("DD MMM YYYY") || "";
    this.setState({
      is_open_modal: false,
      date_raw: rawValue,
      date_formatted: formattedValue
    });
  };

  onChangeDate = (event, date) => {
    const { onChangeDate, name } = this.props;
    this.setState({ is_open_modal: false });
    if (onChangeDate) {
      onChangeDate(date, name);
    }
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
