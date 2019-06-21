import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { bool, func, string } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DotIndicator } from 'react-native-indicators';

import { FETCH_PROCESSING_COUNT } from 'GraphQL/Order/Query';
import { getUserId } from 'Redux/SessionRedux';
import { Colors } from 'Themes';

class MyOrder extends Component {
  onNavigate = () => {
    const { onNavigate } = this.props;
    if (onNavigate) onNavigate();
  };

  render() {
    const { courierId } = this.props;
    return (
      <TouchableOpacity
        onPress={this.onNavigate}
        style={{
          borderWidth: 0.5,
          borderColor: Colors.brown_light,
          borderRadius: 4,
          elevation: 2,
          height: 100,
          margin: 10,
          padding: 15,
          justifyContent: 'space-between'
        }}
      >
        <Text style={{ flex: 2 }}>Pesanan Saya</Text>
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
    );
  }
}

MyOrder.propTypes = {
  onNavigate: func,
  courierId: string,
};

const mapStateToProps = createStructuredSelector({
  courierId: getUserId(),
});

export default connect(mapStateToProps, null)(MyOrder);
