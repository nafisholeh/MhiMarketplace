import React, { Component } from 'react';
import { View } from 'react-native';
import { bool, string, func, shape, oneOfType } from 'prop-types';

import LoadingSection from './LoadingSection';
import StateSection from './StateSection';
import AppConfig from 'Config/AppConfig';

const loadingTitleDefault = "Sedang menyiapkan data";
const loadingSubtitleDefault = "Mohon tunggu sebentar";
const emptyTitleDefault = "Data Kosong";
const errorTitleDefault = "Maaf sedang terjadi gangguan, Silahkan coba beberapa saat lagi";
const errorButtonDefault = "Coba Lagi";

class QueryEffectSection extends Component {
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
    } = this.props;
    if (isLoading) {
      return (
        <LoadingSection
          title={title || loadingTitleDefault}
        />
      );
    }
    if (isEmpty) {
      return (
        <StateSection
          title={title || emptyTitleDefault}
          icon={iconEmpty || AppConfig.pageState.EMPTY}
        />
      )
    }
    if (isError) {
      return (
        <StateSection
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

QueryEffectSection.propTypes = {
  isLoading: bool,
  isEmpty: bool,
  isError: oneOfType(shape({}), bool),
  title: string,
  subtitle: string,
  onRefetch: func.isRequired,
  iconEmpty: string,
  iconError: string,
};

export default QueryEffectSection;
