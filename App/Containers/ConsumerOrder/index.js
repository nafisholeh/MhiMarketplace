import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { createStructuredSelector } from 'reselect';

import { HeaderTitle } from 'Components';
import { Colors, Images } from 'Themes';
import { moderateScale } from 'Lib';
import { getUserId } from 'Redux/SessionRedux';

import {
  FETCH_READY_TO_PROCESS_LIST,
  FETCH_PROCESSING_LIST,
  FETCH_READY_TO_SEND_LIST,
  FETCH_SENDING_LIST,
} from 'GraphQL/Order/Query';
import List from './Common/List';

class ConsumerOrder extends Component {
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state
    const { isKurir = false } = params || {};
    return {
      header: (
        <HeaderTitle
          title="Status Pesanan Anda"
          isEnableBack
          isEnableRightNav
          onRightNavigate={() => navigation.navigate('ConsumerCompleted')}
          iconRightNav={Images.sent}
        />
      ),
    }
  }
  
  render() {
    const { userId } = this.props;
    return (
      <ScrollView
        style={{
          flex: 1
        }}
      >
        <List query={FETCH_READY_TO_PROCESS_LIST} />
        <List query={FETCH_PROCESSING_LIST} />
        <List query={FETCH_READY_TO_SEND_LIST} />
        <List query={FETCH_SENDING_LIST} />
      </ScrollView>
    );
  }
}

ConsumerOrder.propTypes = {
  selectListItem: func,
  userId: string,
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ConsumerOrder));
