import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { bool } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import styles from './Styles';
import List from 'Containers/Order/List';

class HomeKeuangan extends Component {
  render() {
    return (
      <ScrollView>
        <Text style={styles.list__title}>Order Baru Masuk</Text>
        <List type='initial' />
        <Text style={styles.list__title}>Order Tunggu Bayar </Text>
        <List type='completed' />
        <Text style={styles.list__title}>Order Siap Kirim</Text>
        <List type='paid-off' />
      </ScrollView>
    );
  }
}

HomeKeuangan.propTypes = {
  
};

const mapStateToProps = createStructuredSelector({
  
});

export default connect(mapStateToProps, null)(withNavigation(HomeKeuangan));
