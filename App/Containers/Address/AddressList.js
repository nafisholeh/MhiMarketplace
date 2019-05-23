import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Query } from 'react-apollo';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { StatePage, ToolbarButton } from 'Components';
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
      headerRight: (
        <ToolbarButton
          icon={Images.add}
          onPress={() => navigation.navigate('AddressInput')} 
        />
      ),
    }
  }
  
  startAddingAddress = () => {
    const { navigation } = this.props;
    navigation.navigate('AddressInput');
  };
  
  renderAddressItems = ({item, index}) => {
    return (
      <Item data={item} />
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
                  <FlatList
                    keyExtractor={(item, id) => item._id.toString()}
                    data={address} 
                    renderItem={this.renderAddressItems}
                  />
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