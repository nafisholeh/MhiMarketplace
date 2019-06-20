import React, { Component } from 'react';
import { View } from 'react-native';
import { bool, string, func, shape, oneOfType } from 'prop-types';

import LoadingPage from './LoadingPage';
import StatePage from './StatePage';

const loadingDefaultTitle = "Sedang menyiapkan data";
const loadingDefaultSubtitle = "Mohon tunggu sebentar";
const stateDefaultType = "error";
const stateDefaultTitle = "Maaf sedang terjadi gangguan, Silahkan coba beberapa saat lagi";
const stateDefaultButton = "Coba Lagi";

class QueryEffectSection extends Component {
  render() {
    const {
      loading,
      state,
      loadingData: {
        title: loadingTitle = loadingDefaultTitle,
        subtitle: loadingSubtitle = loadingDefaultSubtitle
      },
      stateData: {
        type = stateDefaultType,
        title: errorTitle = stateDefaultTitle,
        buttonTitle: errorButtonTitle = stateDefaultButton, 
      },
      onStateRefresh
    } = this.props;
    if (loading) {
      return (
        <LoadingPage
          title={loadingTitle}
          subtitle={loadingSubtitle}
        />
      );
    }
    if (state) {
      return (
        <StatePage
          types={type}
          title={errorTitle}
          buttonTitle={errorButtonTitle}
          onPress={() => onStateRefresh()}
        />
      );
    }
    return null;
  }
};

QueryEffectSection.propTypes = {
  loading: bool,
  loadingData: shape({
    title: string,
    subtitle: string,
  }),
  state: oneOfType(shape({}), bool),
  stateData: shape({
    type: string,
    title: string,
    buttonTitle: string,
  }),
  onStateRefresh: func.isRequired,
};

QueryEffectSection.defaultProps = {
  loadingData: {
    title: undefined,
    subtitle: undefined,
  },
  stateData: {
    type: undefined,
    title: undefined,
    buttonTitle: undefined,
  }
}

export default QueryEffectSection;
