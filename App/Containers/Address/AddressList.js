import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OptimizedList, StatePage } from 'Components';
import Item from './Item';
import { FETCH_ADDRESS } from 'GraphQL/Address/Query';
import Config from 'Config/AppConfig';
import { Images, Metrics } from 'Themes';
import { getUserId } from 'Redux/SessionRedux';

class AddressList extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Alamat Anda',
    }
  }
  
  startAddingAddress = () => {
    
  };
  
  renderAddressItems = (type, data) => {
    return (
      <Item data={data} />
    );
  };
  
  render() {
    const { userId } = this.props;
    return (
      <View style={{flex:1}}>
        <Query 
          query={FETCH_ADDRESS}
          variables={{ user_id: userId }}>
          {({ loading, error, data, refetch }) => {
            if (loading) {
              return (<View></View>)
            } else if (error) {
              return (<View></View>)
            } else if (data) {
              const { address } = data;
              if (!address || (address && address.length === 0)) {
                return (
                  <StatePage 
                    title="Alamat pengiriman kosong"
                    subtitle="Tambahkan alamat pengiriman"
                    buttonTitle="Tambah Yuk"
                    icon={Config.pageState.EMPTY_LOCATION}
                    onPress={this.startAddingAddress}
                  />
                )
              }
              return (
                <ScrollView style={{flex:1}}>
                  <View style={{ minHeight: 100 }}>
                    <OptimizedList
                      itemWidth={Metrics.deviceWidth}
                      itemHeight={100}
                      data={address} 
                      renderRow={this.renderAddressItems}
                    />
                  </View>
                </ScrollView>
              )
            }
          }}
        </Query>
      </View>
    )
  }
}

AddressList.propTypes = {
  userId: string,
};

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

export default connect(mapStateToProps, null)(AddressList);