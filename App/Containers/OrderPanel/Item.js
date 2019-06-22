import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { bool, func, string, any } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DotIndicator } from 'react-native-indicators';

import { getUserId } from 'Redux/SessionRedux';
import { Colors } from 'Themes';

class Item extends Component {
  onPress = () => {
    const { onPress } = this.props;
    if (onPress) onPress();
  };

  render() {
    const {
      query,
      queryResponse,
      title,
      description,
      courierId
    } = this.props;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={{
          flex: 1,
          borderWidth: 0.5,
          borderColor: Colors.brown_light,
          borderRadius: 4,
          elevation: 2,
          minHeight: 90,
          marginTop: 12,
          marginHorizontal: 15,
          padding: 15,
          justifyContent: 'space-between'
        }}
      >
        <View style={{ flex: 2 }}>
          <Text style={{ fontWeight: 'bold' }}>{title}</Text>
          <Text>{description}</Text>
        </View>
        <View 
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Query
            query={query}
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
                const { [queryResponse]: total = 0 } = data;
                return (
                  <Text style={{
                    textAlign: 'right',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                    {total || 0}
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

Item.propTypes = {
  query: any,
  queryResponse: string,
  title: string,
  description: string,
  onPress: func,
  courierId: string,
};

export default Item;
