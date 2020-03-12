import React, { Component, Fragment } from "react";
import { View, Image, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { bool, arrayOf, shape, string, object, func } from "prop-types";

import InputText from "./InputText";
import ChipSelects from "./ChipSelects";
import { moderateScale } from "Lib";
import { InAppNotification, graphqlToRNPickerSelect } from "Lib";
import { Images, Colors, FONTS, METRICS } from "Themes";
import ApolloClientProvider from "Services/ApolloClientProvider";

const FEW_THRESHOLD = 4;

class InputPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      selected: null,
      selected_text: "",
      fetching: null,
      error: null,
      error_fetch: null,
      dummy: [{ label: "loading", value: 0 }],
      showManualInput: false
    };
  }

  componentDidMount() {
    const { isInitialFetching, dataLocal } = this.props;
    if (isInitialFetching) this.onFetchData();
    if (Array.isArray(dataLocal) && dataLocal.length > 0)
      this.setupData(dataLocal);
  }

  componentDidUpdate(prevProps) {
    if (this.props.triggerFetch !== prevProps.triggerFetch) {
      this.onFetchData();
    }
    if (this.props.triggerReset !== prevProps.triggerReset) {
      this.resetData();
    }
  }

  setupData = dataLocal => {
    this.setState({ data: dataLocal });
  };

  resetData = () => {
    this.setState({
      data: null,
      selected: null,
      selected_text: "",
      fetching: null,
      error: null,
      error_fetch: null,
      dummy: [{ label: "loading", value: 0 }]
    });
  };

  onFetchData = () => {
    const {
      query,
      queryVariables,
      title,
      isKeyDisplayed,
      isManualInputDisplayed
    } = this.props;
    this.setState({
      fetching: true,
      error: null,
      error_fetch: null
    });
    ApolloClientProvider.client
      .query({ query, variables: queryVariables })
      .then(data => {
        const { data: fetchData = {} } = data || {};
        const realData = fetchData[Object.keys(fetchData)[0]];
        const normalizedData = graphqlToRNPickerSelect(
          realData,
          isKeyDisplayed,
          isManualInputDisplayed
        );
        this.setState(
          {
            data: normalizedData,
            fetching: false
          },
          () => {
            if (Array.isArray(normalizedData) && normalizedData.length === 1) {
              this.onSelectionChange(normalizedData[0].value, 0);
            }
          }
        );
      })
      .catch(error => {
        this.setState({
          fetching: false,
          error_fetch: true,
          error: `Gagal download data ${title}`
        });
        InAppNotification.error(
          "Gagal download",
          `Gagal menampilkan data ${title}`
        );
      });
  };

  onSelectionChange = (val, i) => {
    const { data, showManualInput: prevShowManualInput } = this.state;
    const {
      onSelectionChange,
      onShowManualInput,
      onHideManualInput,
      name
    } = this.props;
    if (!val) return;
    const selectedData = data.find(n => n.value === val);
    const { label: selectedLabel, showManualInput } = selectedData || {};
    this.setState({
      selected: val,
      selected_text: selectedLabel,
      showManualInput
    });
    if (onSelectionChange) {
      onSelectionChange(showManualInput ? null : val, name, showManualInput);
      if (showManualInput) {
        if (onShowManualInput) onShowManualInput();
      } else if (prevShowManualInput && !showManualInput) {
        if (onHideManualInput) onHideManualInput();
      }
    }
  };

  onManualTextChange = text => {
    const { onSelectionChange, name } = this.props;
    const { showManualInput } = this.state;
    this.setState({ manual_text: text });
    if (onSelectionChange) {
      onSelectionChange(text, name, showManualInput);
    }
  };

  render() {
    const {
      data,
      dummy,
      selected,
      selected_text,
      manual_text,
      fetching,
      error,
      error_fetch,
      showManualInput
    } = this.state;
    const { title, placeholder, styleContainer, styleText } = this.props;
    const isFewSelection = Array.isArray(data)
      ? data.length <= FEW_THRESHOLD && data.length !== 1
      : false;
    return (
      <Fragment>
        {isFewSelection ? (
          <View
            style={{
              justifyContent: "space-around",
              marginBottom: METRICS.HUGE
            }}
          >
            <Text style={{ ...FONTS.INPUT_TITLE, marginBottom: METRICS.TINY }}>
              {title}
            </Text>
            <ChipSelects data={data} />
          </View>
        ) : (
          <RNPickerSelect
            placeholder={{
              label: placeholder,
              value: null
            }}
            items={data ? data : dummy}
            onValueChange={this.onSelectionChange}
            value={selected}
            disabled={data ? false : true}
            style={styleContainer}
          >
            <InputText
              title={title}
              value={selected_text}
              placeholder={placeholder}
              editable={false}
              selectTextOnFocus={false}
              error={error}
              errorFetching={error_fetch}
              onRefetch={this.onFetchData}
              icon={Images.arrow_thin}
              isLoading={fetching}
              isShowIcon
              withBorder={false}
              styleContainer={Object.assign(
                {},
                showManualInput
                  ? {
                      marginBottom: 0
                    }
                  : {},
                styleText
              )}
            />
          </RNPickerSelect>
        )}
        {showManualInput ? (
          <InputText
            value={manual_text}
            onChangeText={this.onManualTextChange}
            placeholder="Isi disini"
            withBorder={false}
            error={error}
            styleContainer={{
              marginTop: METRICS.SMALL,
              marginBottom: METRICS.HUGE,
              marginHorizontal: 0
            }}
            prefixIcon={Images.edit_small}
            prefixIconStyle={{
              tintColor: Colors.disabled_light
            }}
          />
        ) : (
          <View></View>
        )}
      </Fragment>
    );
  }
}

InputPicker.propTypes = {
  isInitialFetching: bool,
  isKeyDisplayed: bool,
  isManualInputDisplayed: bool, // show manual input upon clicking `Lainnya`
  onShowManualInput: func,
  onHideManualInput: func,
  name: string, // align with the parent's state title
  /*
   ** enable the picker to use constant data
   ** if set, no data fetch
   */
  dataLocal: arrayOf(
    shape({
      value: string,
      label: string,
      showManualInput: bool // show manual input
    })
  ),
  /*
   ** enable the picker to fetch data through GraphQL query
   ** if dataLocal is not set and query is set, then fetch data
   */
  query: object,
  queryVariables: object,
  triggerFetch: bool, // trigger fetch. is a must if query props is set
  triggerReset: bool, // trigger clear out data
  onSelectionChange: func
};

InputPicker.defaultProps = {
  isInitialFetching: false,
  isKeyDisplayed: false
};

export default InputPicker;
