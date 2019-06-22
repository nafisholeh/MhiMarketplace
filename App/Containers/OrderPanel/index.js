import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { bool, func, string } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Query } from 'react-apollo';
import { DotIndicator } from 'react-native-indicators';

import { getUserId } from 'Redux/SessionRedux';
import { HeaderButton } from 'Components';
import { Images } from 'Themes';
import {
  FETCH_PROCESSING_COUNT,
  FETCH_READY_TO_SEND_COUNT,
  FETCH_SENDING_COUNT,
} from 'GraphQL/Order/Query';

import Item from './Item';

class OrderPanel extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'MH.id',
      headerLeft: null,
      headerRight: (
        <HeaderButton
          onPress={() => navigation.navigate('Completed')}
          icon={Images.history}
        />
      ),
    }
  }

  openPage = page => {
    const { navigation } = this.props;
    if (navigation) navigation.navigate(page);
  };

  render() {
    const { courierId } = this.props;
    return (
      <View style={{ paddingVertical: 5 }}>
        <Item
          title="Siap Ambil Barang"
          description="Anda ambil barang dari tempat yg telah ditentukan"
          courierId={courierId}
          query={FETCH_PROCESSING_COUNT}
          queryResponse="processingOrdersCount"
          onPress={() => this.openPage('Processing')}
        />
        <Item
          title="Siap Kirim"
          description="Barang telah diambil dan siap untuk dikirim"
          courierId={courierId}
          query={FETCH_READY_TO_SEND_COUNT}
          queryResponse="readyToSendOrdersCount"
          onPress={() => this.openPage('ReadyToSend')}
        />
        <Item
          title="Sedang Kirim"
          description="Anda sedang dalam perjalanan untuk kirim barang ke konsumen"
          courierId={courierId}
          query={FETCH_SENDING_COUNT}
          queryResponse="sendingOrdersCount"
          onPress={() => this.openPage('Sending')}
        />
      </View>
    );
  }
}

OrderPanel.propTypes = {
  courierId: getUserId(),
};

const mapStateToProps = createStructuredSelector({
  courierId: getUserId(),
});

export default connect(mapStateToProps, null)(withNavigation(OrderPanel));
