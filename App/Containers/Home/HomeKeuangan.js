import React, { Component } from 'react';
import { View } from 'react-native';
import { bool } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class HomeKeuangan extends Component {
  render() {
    return (
      <View />
    );
  }
}

HomeKeuangan.propTypes = {
  
};

const mapStateToProps = createStructuredSelector({
  
});

export default connect(mapStateToProps, null)(withNavigation(HomeKeuangan));
