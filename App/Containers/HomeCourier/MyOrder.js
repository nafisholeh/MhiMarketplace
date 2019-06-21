import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { bool, func, string } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DotIndicator } from 'react-native-indicators';

import {
  FETCH_PROCESSING_COUNT,
  FETCH_READY_TO_SEND_COUNT
} from 'GraphQL/Order/Query';
import { getUserId } from 'Redux/SessionRedux';
import { Colors } from 'Themes';

class MyOrder extends Component {
  onOpenProcessing = () => {
    const { onOpenProcessing } = this.props;
    if (onOpenProcessing) onOpenProcessing();
  };
  
  onOpenReadyToSend = () => {
    const { onOpenReadyToSend } = this.props;
    if (onOpenReadyToSend) onOpenReadyToSend();
  };

  render() {
    const { courierId } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          onPress={this.onOpenProcessing}
          style={{
            flex: 1,
            borderWidth: 0.5,
            borderColor: Colors.brown_light,
            borderRadius: 4,
            elevation: 2,
            height: 120,
            margin: 10,
            padding: 15,
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ flex: 2 }}>Siap Ambil</Text>
          <View 
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <Query
              query={FETCH_PROCESSING_COUNT}
              variables={{ courier_id: courierId }}
            >
              {({ loading, error, data, refetch }) => {
                if (loading) {
                  return (
                    <DotIndicator
                      count={3}
                      size={5}
                      color='red'
                      animationDuration={800}
                      style={{ alignSelf: 'flex-end', marginRight: 10 }}
                    />
                  );
                } else if (data) {
                  const { processingOrdersCount = 0 } = data;
                  return (
                    <Text style={{ textAlign: 'right' }}>
                      {processingOrdersCount || 0}
                    </Text>
                  );
                }
                return null;
              }}
            </Query>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={this.onOpenReadyToSend}
          style={{
            flex: 1,
            borderWidth: 0.5,
            borderColor: Colors.brown_light,
            borderRadius: 4,
            elevation: 2,
            height: 120,
            margin: 10,
            padding: 15,
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ flex: 2 }}>Siap Kirim</Text>
          <View 
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <Query
              query={FETCH_READY_TO_SEND_COUNT}
              variables={{ courier_id: courierId }}
            >
              {({ loading, error, data, refetch }) => {
                if (loading) {
                  return (
                    <DotIndicator
                      count={3}
                      size={5}
                      color='red'
                      animationDuration={800}
                      style={{ alignSelf: 'flex-end', marginRight: 10 }}
                    />
                  );
                } else if (data) {
                  const { readyToSendOrdersCount = 0 } = data;
                  return (
                    <Text style={{ textAlign: 'right' }}>
                      {readyToSendOrdersCount || 0}
                    </Text>
                  );
                }
                return null;
              }}
            </Query>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

MyOrder.propTypes = {
  onOpenProcessing: func,
  onOpenReadyToSend: func,
  courierId: string,
};

const mapStateToProps = createStructuredSelector({
  courierId: getUserId(),
});

export default connect(mapStateToProps, null)(MyOrder);
