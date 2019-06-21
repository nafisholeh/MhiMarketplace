import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { bool } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import List from './List';

class ReadyToSend extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Pesanan Siap Kirim',
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

ReadyToSend.propTypes = {
  
};

const mapStateToProps = createStructuredSelector({
  
});

export default connect(mapStateToProps, null)(withNavigation(ReadyToSend));
