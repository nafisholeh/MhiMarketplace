import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Query } from 'react-apollo';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { StatePage, ToolbarButton, HeaderTitle, QueryEffectPage } from 'Components';
import Item from './Item';
import { FETCH_ADDRESS } from 'GraphQL/Address/Query';
import Config from 'Config/AppConfig';
import { Images, Metrics } from 'Themes';
import { getUserId } from 'Redux/SessionRedux';
import { moderateScale } from 'Lib';

class AddressList extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      headerLeft: null,
      headerRight: (
        <ToolbarButton
          icon={Images.add}
          onPress={() => navigation.navigate('AddressInput')} 
        />
      ),
      header: (
        <HeaderTitle title="Alamat Anda" />
      ),
    }
  }
  
  startAddingAddress = () => {
    const { navigation } = this.props;
    navigation.navigate('AddressInput');
  };
  
  renderAddressItems = ({item, index}) => {
    return (
      <Item data={item} index={index} />
    );
  };
  
  render() {
    const { userId } = this.props;
    return (
      <Query 
        query={FETCH_ADDRESS}
        variables={{ user_id: userId }}>
        {({ loading, error, data, refetch }) => {
          const { address = [] } = data || {};
          if (Array.isArray(address) && address.length) {
            return (
              <FlatList
                keyExtractor={(item, id) => item._id.toString()}
                data={address} 
                renderItem={this.renderAddressItems}
              />
            );
          }
          return (
            <QueryEffectPage
              title="Alamat pengiriman kosong"
              subtitle="Tambahkan alamat pengiriman"
              buttonTitle="Tambah Yuk"
              isLoading={loading}
              isError={error}
              isEmpty={!address.length}
              iconEmpty={Config.pageState.EMPTY_LOCATION}
              onRefetch={() => {
                if (!address.length) this.startAddingAddress();
                else refetch();
              }}
            />
          );
        }}
      </Query>
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