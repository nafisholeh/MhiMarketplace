import React, { Component } from 'react'
import { Alert, ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { object, arrayOf, string } from 'prop-types'
import { Query, Mutation, compose } from 'react-apollo';
import { DotIndicator } from 'react-native-indicators';

import { FETCH_PRODUCT_DETAIL } from 'GraphQL/Product/Query';
import { UPDATE_CART_ITEM, UPDATE_CART_ITEM_SCHEMA, cacheUpdateCartItem } from 'GraphQL/Cart/Mutation';
import { getUser } from 'Redux/SessionRedux';
import { getCartItemIds } from 'Redux/CartRedux';

import { Images, Metrics } from 'Themes'
import { OptimizedList } from 'Components'
import { parseToRupiah, calcDiscount, getReadableDate } from 'Lib'
import styles from './Styles'

class Detail extends Component {
  
  onAddToCart = updateCartItem => {
    const { user, navigation } = this.props;
    if (!user) {
      Alert.alert(
        'Belum terdaftar',
        'Silahkan login terlebih dahulu sebelum memesan',
        [
          {text: 'OK', onPress: this.openSignin, },
        ],
        {cancelable: false},
      );
    } else {
      updateCartItem();
    }
  }
  
  openSignin = () => {
    const { navigation } = this.props;
    navigation.navigate('Signin');
  }
  
  render () {
    const { 
      navigation: { state: { params: { data: { _id: productId } }}},
      cartItemIds,
      user: { _id: userId }
    } = this.props;
    const isInsideCart = cartItemIds.indexOf(productId ) > -1;
    return (
      <View style={{flex: 1}}>
        <Query 
          variables={{ _id: productId }}
          query={FETCH_PRODUCT_DETAIL}>
          {({ loading, error, data, refetch }) => {
            if(loading) {
              return <View></View>;
            } else if(error) {
              return <View></View>;
            } else {
              const { product } = data;
              const { title, description, stock, unit, photo, price, discount, expired_date, minimum_order } = product;
              const priceRupiah = parseToRupiah(price);
              const discountRupiah = parseToRupiah(calcDiscount(price, discount));
              return (
                <View style={styles.container}>
                  <ScrollView style={styles.scrollView}>
                    <Image source={{ uri: photo }} style={{ width: Metrics.deviceWidth, height: 200 }} />

                    <Text style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 15, fontSize: 20 }}>{title}</Text>
                    { discount > 0 &&
                      <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Text style={{ marginRight: 5, fontWeight: 'bold', textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{priceRupiah}</Text>
                        <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 16 }}>{discountRupiah}</Text>
                      </View>
                    }
                    { discount === 0 &&
                      <View style={{ marginBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>{priceRupiah}</Text>
                      </View>
                    }
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ marginBottom: 5 }}>Stok: {stock} {unit}</Text>
                      <Text style={{ marginBottom: 5 }}>Min pesan: {minimum_order} {unit}</Text>
                    </View>
                    <Text style={{ marginBottom: 5 }}>Kadaluarsa: {getReadableDate(expired_date, 'DD-MM-YYYY', 'id', 'DD MMM YYYY')}</Text>
                    <Text style={{ marginBottom: 20 }}>{description}</Text>
                    { isInsideCart &&
                      <Text style={{ color: 'red', marginBottom: 20 }}>Telah masuk keranjang belanja</Text>
                    }
                  </ScrollView>
                  { !isInsideCart &&
                    <Mutation
                      mutation={UPDATE_CART_ITEM_SCHEMA}
                      variables={{ user_id: userId, product_id: productId, qty: null }}
                      update={(cache, data) => cacheUpdateCartItem(cache, data, productId)}
                      onError={(error) => {}}
                      ignoreResults={false}
                      errorPolicy='all'>
                      { (updateCartItem, {loading, error, data}) => {
                        if (data) {
                          return (
                            <Text style={{ color: 'red', marginBottom: 20 }}>
                              Telah masuk keranjang belanja
                            </Text>
                          );
                        }
                        return (
                          <TouchableOpacity
                            onPress={() => this.onAddToCart(updateCartItem)}
                            style={{
                              height: 50, backgroundColor: 'gray',
                              alignItems: 'center', justifyContent: 'center'
                            }}
                            >
                            {loading && (
                              <DotIndicator
                                count={4}
                                size={7}
                                color='white'
                                animationDuration={800}
                              />
                            )}
                            {!loading && (
                              <Text style={{color: 'white'}}>
                                Pesan Sekarang
                              </Text>
                            )}
                          </TouchableOpacity>
                        );
                      }}
                    </Mutation>
                  }
                </View>
              )
            }
          }}
        </Query>
      </View>
    )
  }
}

Detail.propTypes = {
  user: object,
  cartItemIds: arrayOf(string),
}

const mapStateToProps = createStructuredSelector({
  user: getUser(),
  cartItemIds: getCartItemIds(),
});

export default compose(
  connect(mapStateToProps, null),
  UPDATE_CART_ITEM
)(Detail);