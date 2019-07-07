import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { string, number, object, bool } from 'prop-types';

import ItemVertical from './ItemVertical';
import ItemHorizontal from './ItemHorizontal';
import { FETCH_PRODUCT_LIST } from 'GraphQL/Product/Query';
import { Images, Metrics } from 'Themes';
import { OptimizedList, QueryEffectPage, QueryEffectSection } from 'Components';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import styles from './Styles';
import { moderateScale } from 'Lib';

class List extends Component {
  
  renderVerticalItem = (type, data) => (
    <ItemVertical data={data} />
  );
  
  renderHorizontalItem = (type, data) => (
    <ItemHorizontal data={data} />
  );

  render() {
    const {
      searchTerm,
      category,
      limit,
      sort,
      isSection,
      isHorizontal
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          zIndex: 1,
          minHeight: moderateScale(215),
          marginBottom: moderateScale(15),
        }}
      >
        <Query
          query={FETCH_PRODUCT_LIST}
          variables={{
            term: searchTerm,
            category,
            limit,
            sort
          }}
          fetchPolicy="network-only"
        >
          {({ loading, error, data, refetch }) => {
            const { products = [] } = data || {};
            if (Array.isArray(products) && products.length) {
              return (
                <OptimizedList
                  isHorizontal={isHorizontal}
                  itemWidth={
                    isHorizontal ? 
                    (Metrics.deviceWidth / 2) - moderateScale(10)
                    : Metrics.deviceWidth
                  }
                  itemHeight={
                    isHorizontal ?
                    moderateScale(215)
                    : moderateScale(128)
                  }
                  data={products} 
                  renderRow={
                    isHorizontal ?
                    this.renderHorizontalItem
                    : this.renderVerticalItem
                  }
                  style={{
                    flex: 1,
                  }}
                  contentContainerStyle={{
                    paddingBottom: moderateScale(isHorizontal ? 20 : 10),
                    paddingTop: moderateScale(15),
                    paddingLeft: isHorizontal && moderateScale(16),
                    alignItems: 'center',
                  }}
                />
              )
            }
            if (isSection) {
              return (
                <QueryEffectSection
                  isLoading={loading}
                  isError={error}
                  isEmpty={!products.length}
                  onRefetch={refetch}
                />
              );
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
  category: string,
  limit: number,
  sort: object,
  isSection: bool,
  isHorizontal: bool,
};

export default connect(null, null)(List);