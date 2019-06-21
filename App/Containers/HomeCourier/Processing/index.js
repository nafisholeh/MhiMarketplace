import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { bool } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import List from './List';

class Processing extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Pesanan Saya',
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <List />
      </ScrollView>
    );
  }
}

Processing.propTypes = {
  
};

const mapStateToProps = createStructuredSelector({
  
});

export default connect(mapStateToProps, null)(withNavigation(Processing));
