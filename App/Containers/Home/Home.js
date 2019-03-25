import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { Query } from 'react-apollo';
import { shape } from 'prop-types';

import { Metrics } from 'Themes';
import { parseToRupiah, calcDiscount } from 'Lib';
import { OptimizedList } from 'Components';

import { FETCH_PRODUCT_LIST } from './GraphQL/Query';
import styles from './Styles';

export default class Home extends Component {
  _onClickProduct = data => {
    const { navigation } = this.props;
    navigation.navigate('Detail', { data });
  };

  renderRow = (type, data) => (
    <TouchableOpacity
      onPress={() => this._onClickProduct(data)}
      style={styles.product__item}
    >
      <View style={styles.product__item_content}>
        <Image source={{ uri: data.photo }} style={{ width: 60, height: 60 }} />
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>
            {data.title}
          </Text>
          <Text style={{ textAlign: 'right' }}>
            {parseToRupiah(data.price)}
          </Text>
          <Text style={{ textAlign: 'right' }}>
            {parseToRupiah(calcDiscount(data.price, data.discount))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    // console.tron.log(`test ${ parseToRupiah('1000000')}`);
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Query query={FETCH_PRODUCT_LIST}>
            {({ loading, error, data, refetch }) => {
              if (error) {
                return <View />;
              } else if (data) {
                return (
                  <OptimizedList
                    itemWidth={Metrics.deviceWidth}
                    itemHeight={100}
                    data={data.products}
                    renderRow={this.renderRow}
                  />
                );
              }
            }}
          </Query>
        </View>
      </View>
    );
  }
}

Home.propTypes = {
  navigation: shape({}),
};
