import React, { PureComponent, Fragment } from "react";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { bool, arrayOf, shape, string, object, func } from "prop-types";

import InputText from "./InputText";
import ChipSelects from "./ChipSelects";
import { InAppNotification, graphqlToRNPickerSelect } from "Lib";
import { Images, Colors, FONTS, METRICS } from "Themes";
import ApolloClientProvider from "Services/ApolloClientProvider";

const FEW_THRESHOLD = 4;

class InputPicker extends PureComponent {
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
      showManualInput: false,
      isFewSelection: true,
    };
  }

  componentDidMount() {
    const { isInitialFetching, dataLocal, query } = this.props;
    if (isInitialFetching && query) this.onFetchData();
    if (dataLocal) this.setupData(dataLocal);
  }

  componentDidUpdate(prevProps) {
    if (this.props.triggerFetch !== prevProps.triggerFetch) {
      this.onFetchData();
    }
    if (this.props.triggerReset !== prevProps.triggerReset) {
      this.resetData();
    }
  }

  setupData = (dataLocal) => {
    if (!Array.isArray(dataLocal) || dataLocal.length <= 0) return;
    const isFewSelection = Array.isArray(dataLocal)
      ? dataLocal.length <= FEW_THRESHOLD && dataLocal.length !== 1
      : false;
    this.setState({ isFewSelection, data: dataLocal }, () => {
      if (dataLocal.length >= 1) {
        setTimeout(() => {
          this.onSelectionChange(dataLocal[0], 0);
        }, 500);
      }
    });
  };

  resetData = () => {
    this.setState({
      data: null,
      selected: null,
      selected_text: "",
      fetching: null,
      error: null,
      error_fetch: null,
      dummy: [{ label: "loading", value: 0 }],
    });
  };

  onFetchData = () => {
    const {
      query,
      queryVariables,
      title,
      isKeyDisplayed,
      isManualInputDisplayed,
    } = this.props;
    this.setState({
      fetching: true,
      error: null,
      error_fetch: null,
    });
    ApolloClientProvider.client
      .query({ query, variables: queryVariables })
      .then((data) => {
        const { data: fetchData = {} } = data || {};
        const realData = fetchData[Object.keys(fetchData)[0]];
        const normalizedData = graphqlToRNPickerSelect(
          realData,
          isKeyDisplayed,
          isManualInputDisplayed
        );
        const isFewSelection = Array.isArray(normalizedData)
          ? normalizedData.length <= FEW_THRESHOLD &&
            normalizedData.length !== 1
          : false;
        this.setState(
          {
            data: normalizedData,
            isFewSelection,
            fetching: false,
          },
          () => {
            if (Array.isArray(normalizedData) && normalizedData.length >= 1) {
              this.onSelectionChange(normalizedData[0], 0);
            }
          }
        );
      })
      .catch((error) => {
        this.setState({
          fetching: false,
          error_fetch: true,
          error: `Gagal download data ${title}`,
        });
        InAppNotification.error(
          "Gagal download",
          `Gagal menampilkan data ${title}`
        );
      });
  };

  onSelectionChange = ({ value }, i) => {
    const { data } = this.state;
    const { onSelectionChange, name } = this.props;
    if (!value) return;
    const selectedData = (data || []).find(
      ({ value: valueIt }) => valueIt === value
    );
    const { label: selectedLabel, value: selectedValue, showManualInput } =
      selectedData || {};
    this.setState({
      selected: selectedValue,
      selected_text: selectedLabel,
      showManualInput,
    });
    if (onSelectionChange) {
      const keyOutput = showManualInput ? null : selectedValue;
      onSelectionChange(keyOutput, selectedValue, name, showManualInput);
    }
  };

  onChipSelectionChange = (item, name) => {
    const { onSelectionChange } = this.props;
    const { key, value, showManualInput } = item || {};
    onSelectionChange(key, value, name, showManualInput);
    const showManualInputTemp = showManualInput ? true : false;
    this.setState({ showManualInput: showManualInputTemp });
  };

  onManualTextChange = (text) => {
    const { onSelectionChange, name } = this.props;
    const { showManualInput } = this.state;
    this.setState({ manual_text: text });
    if (onSelectionChange) {
      onSelectionChange(null, text, name, showManualInput);
    }
  };

  renderCustomBottom = () => {
    const { manual_text, error, showManualInput } = this.state;
    const {
      CustomManualInput,
      isAllBorderShown,
      manualInputStyle,
    } = this.props;
    return (
      <Fragment>
        {showManualInput && CustomManualInput ? <CustomManualInput /> : null}
        {showManualInput && !CustomManualInput ? (
          <InputText
            value={manual_text}
            onChangeText={this.onManualTextChange}
            isAllBorderShown={isAllBorderShown}
            error={error}
            styleContainer={{
              ...{
                marginBottom: METRICS.HUGE,
                marginHorizontal: 0,
              },
              ...manualInputStyle,
            }}
            prefixIcon={Images.edit_small}
            prefixIconStyle={{
              tintColor: Colors.disabled_light,
            }}
          />
        ) : (
          <View></View>
        )}
      </Fragment>
    );
  };

  render() {
    const {
      data,
      dummy,
      selected,
      selected_text,
      fetching,
      error,
      error_fetch,
      showManualInput,
      isFewSelection,
    } = this.state;
    const { name, title, placeholder, styleContainer, styleText } = this.props;
    if (isFewSelection) {
      return (
        <Fragment>
          <View
            style={{
              ...{
                justifyContent: "space-around",
                marginBottom: showManualInput ? METRICS.MEDIUM : METRICS.HUGE,
              },
              ...styleContainer,
            }}
          >
            <Text style={{ ...FONTS.INPUT_TITLE, marginBottom: METRICS.TINY }}>
              {title}
            </Text>
            <ChipSelects
              name={name}
              data={data}
              onSelectionChange={this.onChipSelectionChange}
            />
          </View>
          {this.renderCustomBottom()}
        </Fragment>
      );
    }
    return (
      <Fragment>
        <RNPickerSelect
          placeholder={{
            label: placeholder,
            value: null,
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
            styleContainer={Object.assign(
              {},
              showManualInput
                ? {
                    marginBottom: 0,
                  }
                : {},
              styleText
            )}
          />
        </RNPickerSelect>
        {this.renderCustomBottom()}
      </Fragment>
    );
  }
}

InputPicker.propTypes = {
  isInitialFetching: bool,
  isKeyDisplayed: bool,
  isManualInputDisplayed: bool, // show manual input upon clicking `Lainnya`
  name: string, // align with the parent's state title
  /*
   ** enable the picker to use constant data
   ** if set, no data fetch
   */
  dataLocal: arrayOf(
    shape({
      value: string,
      label: string,
      showManualInput: bool, // show manual input
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
  onSelectionChange: func,
};

InputPicker.defaultProps = {
  isInitialFetching: false,
  isKeyDisplayed: false,
};

export default InputPicker;
