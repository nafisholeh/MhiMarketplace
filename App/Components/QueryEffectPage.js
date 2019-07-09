import React, { Component } from 'react';
import { View } from 'react-native';
import { bool, string, func, shape, oneOfType } from 'prop-types';

import LoadingPage from './LoadingPage';
import StatePage from './StatePage';
import AppConfig from 'Config/AppConfig';

const loadingTitleDefault = "Sedang menyiapkan data";
const loadingSubtitleDefault = "Mohon tunggu sebentar";
const emptyTitleDefault = "Data Kosong";
const errorTitleDefault = "Maaf sedang terjadi gangguan, Silahkan coba beberapa saat lagi";
const errorButtonDefault = "Coba Lagi";

class QueryEffectPage extends Component {
  render() {
    const {
      isLoading,
      isError,
      isEmpty,
      title,
      subtitle,
      onRefetch,
      iconEmpty,
      iconError,
      buttonTitle,
    } = this.props;
    if (isLoading) {
      return (
        <LoadingPage
          title={title || loadingTitleDefault}
          subtitle={subtitle || loadingSubtitleDefault}
        />
      );
    }
    if (isEmpty) {
      return (
        <StatePage
          title={title || emptyTitleDefault}
          subtitle={subtitle}
          icon={iconEmpty || AppConfig.pageState.EMPTY}
          buttonTitle={buttonTitle}
          onPress={() => onRefetch()}
        />
      )
    }
    if (isError) {
      return (
        <StatePage
          types="error"
          icon={iconError || AppConfig.pageState.ERROR}
          title={errorTitleDefault}
          buttonTitle={errorButtonDefault}
          onPress={() => onRefetch()}
        />
      );
    }
    return null;
  }
};

QueryEffectPage.propTypes = {
  isLoading: bool,
  isEmpty: bool,
  isError: oneOfType(shape({}), bool),
  title: string,
  subtitle: string,
  onRefetch: func.isRequired,
  iconEmpty: string,
  iconError: string,
  buttonTitle: string,
};

export default QueryEffectPage;
