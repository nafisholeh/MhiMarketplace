import React, { Component } from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { bool } from 'prop-types';

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
    };
  }
  
  componentDidMount() {
    const { isInitialFetching } = this.props;
    if (isInitialFetching) this.onFetchData();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.triggerFetch !== prevProps.triggerFetch) {
      this.onFetchData();
    }
    if (this.props.triggerReset !== prevProps.triggerReset) {
      this.resetData();
    }
  }
  
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
    const { onSelectionChange } = this.props;
    if (!val) return;
    const selectedData = data.find((n) => n.value === val);
    const { label: selectedLabel } = selectedData || {};
    this.setState({
      selected: val,
      selected_text: selectedLabel,
    });
    if (onSelectionChange) {
      onSelectionChange(val);
    }
  };

  render() {
    const {
      data,
      dummy,
      selected,
      selected_text,
      fetching,
      error,
      error_fetch
    } = this.state;
    const {
      title,
      placeholder
    } = this.props;
    return (
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
          isShowIcon={data ? true : false}
          withBorder={false}
        />
      </RNPickerSelect>
    );
  }
}

InputPicker.propTypes = {
  isInitialFetching: bool,
  isKeyDisplayed: bool,
};

InputPicker.defaultProps = {
  isInitialFetching: false,
  isKeyDisplayed: false,
};

export default InputPicker;
