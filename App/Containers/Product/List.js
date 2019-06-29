import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import Item from './Item';
import { FETCH_PRODUCT_LIST } from 'GraphQL/Product/Query';
import { Images, Metrics } from 'Themes';
import { OptimizedList, QueryEffectPage } from 'Components';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import styles from './Styles';
import { moderateScale } from 'Lib';

class List extends Component {
  
  _renderRow = (type, data) => <Item data={data} />

  render() {
    const { searchTerm } = this.props;
    return (
      <View
        style={{
          zIndex: 1,
        }}
      >
        <Query
          query={FETCH_PRODUCT_LIST}
          variables={{
            term: searchTerm
          }}
          fetchPolicy="network-only"
        >
          {({ loading, error, data, refetch }) => {
            const { products = [] } = data || {};
            if (Array.isArray(products) && products.length) {
              return (
                <OptimizedList
                  itemWidth={Metrics.deviceWidth}
                  itemHeight={128}
                  data={products} 
                  renderRow={this._renderRow}
                  contentContainerStyle={{
                    paddingBottom: moderateScale(10),
                    paddingTop: moderateScale(15),
                    alignItems: 'center',
                  }}
                />
              )
            }
            return (
              <QueryEffectPage
                isLoading={loading}
                isError={error}
                isEmpty={!products.length}
                onRefetch={refetch}
              />
            );
          }}
        </Query>
      </View>
    )
  }
}

List.propTypes = {
  searchTerm: string,
};

export default connect(null, null)(List);