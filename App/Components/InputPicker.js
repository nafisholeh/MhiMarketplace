import React, { Component, Fragment } from 'react';
import { View, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { bool, arrayOf, shape, string, object, func } from 'prop-types';

import { moderateScale } from 'Lib';
import InputText from './InputText';
import { InAppNotification, graphqlToRNPickerSelect } from 'Lib';
import { Images, Colors } from 'Themes';
import ApolloClientProvider from 'Services/ApolloClientProvider';

class InputPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      selected: null,
      selected_text: '',
      fetching: null,
      error: null,
      error_fetch: null,
      dummy: [{label: 'loading', value: 0}],
      showManualInput: false,
    };
  }
  
  componentDidMount() {
    const { isInitialFetching, dataLocal } = this.props;
    if (isInitialFetching) this.onFetchData();
    if (Array.isArray(dataLocal) && dataLocal.length > 0) this.setupData(dataLocal);
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
      selected_text: '',
      fetching: null,
      error: null,
      error_fetch: null,
      dummy: [{label: 'loading', value: 0}],
    });
  };
  
  onFetchData = () => {
    const { query, queryVariables, title, isKeyDisplayed } = this.props;
    this.setState({
      fetching: true,
      error: null,
      error_fetch: null,
    })
    ApolloClientProvider
    .client
    .query({ query, variables: queryVariables })
    .then(data => {
      const { data: fetchData = {}} = data || {};
      const realData = fetchData[Object.keys(fetchData)[0]];
      const normalizedData = graphqlToRNPickerSelect(realData, isKeyDisplayed)
      this.setState({
        data: normalizedData,
        fetching: false,
      }, () => {
        if (Array.isArray(normalizedData) && normalizedData.length === 1) {
          this.onSelectionChange(normalizedData[0].value, 0);
        }
      })
    })
    .catch((error) => {
      this.setState({
        fetching: false,
        error_fetch: true,
        error: `Gagal download data ${title}`,
      })
      InAppNotification.error(
        'Gagal download',
        `Gagal menampilkan data ${title}`
      )
    })
  };
  
  onSelectionChange = (val, i) => {
    const { data } = this.state;
    const { onSelectionChange, name } = this.props;
    if (!val) return;
    const selectedData = data.find((n) => n.value === val);
    const { label: selectedLabel, showManualInput } = selectedData || {};
    this.setState({
      selected: val,
      selected_text: selectedLabel,
      showManualInput,
    });
    if (onSelectionChange) {
      onSelectionChange(showManualInput ? null : val, name);
    }
  };
  
  onManualTextChange = text => {
    const { onSelectionChange, name } = this.props;
    this.setState({ manual_text: text });
    if (onSelectionChange) {
      onSelectionChange(text, name);
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
      showManualInput,
    } = this.state;
    const {
      title,
      placeholder
    } = this.props;
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
          style={{
            marginHorizontal: moderateScale(40),
          }}
          modalProps={{
            marginHorizontal: moderateScale(40),
          }}
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
            styleContainer={
              showManualInput
              ? {
                marginBottom: 0,
              }
              : {}
            }
          />
        </RNPickerSelect>
        {showManualInput
          ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: moderateScale(10),
                marginBottom: moderateScale(24),
                marginHorizontal: moderateScale(40),
              }}
            >
              <Image
                source={Images.edit_small}
                style={{
                  width: moderateScale(28),
                  height: moderateScale(25),
                  marginRight: moderateScale(7),
                  marginBottom: 0,
                  alignSelf: 'flex-end',
                  tintColor: Colors.disabled_light,
                }}
              />
              <InputText
                value={manual_text}
                onChangeText={this.onManualTextChange}
                placeholder="Isi disini"
                withBorder={false}
                error={error}
                styleContainer={{
                  flex: 1,
                  marginBottom: 0,
                  marginHorizontal: 0,
                  backgroundColor: 'blue'
                }}
              />
            </View>
          ) : (
            <View></View>
          )
        }
      </Fragment>
    );
  }
}

InputPicker.propTypes = {
  isInitialFetching: bool,
  isKeyDisplayed: bool,
  name: string,         // align with the parent's state title
  /*
  ** enable the picker to use constant data
  ** if set, no data fetch
  */
  dataLocal: arrayOf(
    shape({
      value: string,
      label: string,
      showManualInput: bool,  // show manual input
    })
  ),
  /*
  ** enable the picker to fetch data through GraphQL query
  ** if dataLocal is not set and query is set, then fetch data
  */
  query: object,
  queryVariables: object,
  triggerFetch: bool,   // trigger fetch. is a must if query props is set
  triggerReset: bool,   // trigger clear out data
  onSelectionChange: func,
};

InputPicker.defaultProps = {
  isInitialFetching: false,
  isKeyDisplayed: false,
};

export default InputPicker;
