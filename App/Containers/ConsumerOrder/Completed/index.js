import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text } from 'react-native';

import { HeaderTitle } from 'Components';
import List from '../Common/List';
import { FETCH_COMPLETED_LIST } from 'GraphQL/Order/Query';

class ConsumerCompleted extends Component {
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state
    return {
      header: (
        <HeaderTitle
          title="Riwayat Pesanan"
          isEnableBack
        />
      ),
    }
  }
  
  render() {
    return (
      <List
        query={FETCH_COMPLETED_LIST}
        isPage
      />
    );
  }
}

export default ConsumerCompleted;
