import React, { Component, Fragment } from 'react'
import { Alert, ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { object, arrayOf, string, bool } from 'prop-types'
import { Query, Mutation, compose } from 'react-apollo';
import { DotIndicator } from 'react-native-indicators';

import { FETCH_PRODUCT_DETAIL } from 'GraphQL/Product/Query';
import { UPDATE_CART_ITEM, UPDATE_CART_ITEM_SCHEMA, cacheUpdateCartItem } from 'GraphQL/Cart/Mutation';
import { getUser, isAdmin } from 'Redux/SessionRedux';
import { getCartItemIds } from 'Redux/CartRedux';

import { Images, Metrics, Colors } from 'Themes';
import {
  OptimizedList,
  HeaderButton,
  ProductDetailWrapper,
  ButtonPrimary,
  ProductImage,
  CustomHeader,
} from 'Components';
import { parseToRupiah, calcDiscount, getReadableDate, moderateScale } from 'Lib';
import styles from './Styles';

class Detail extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: <View></View>,
      headerRight: (
        <HeaderButton
          onPress={() => navigation.navigate('Cart')}
          icon={Images.cart}
        />
      ),
    }
  }
  
  onAddToCart = (updateCartItem, isInsideCart) => {
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
      if (isInsideCart) {
        navigation.navigate('Cart');
      } else {
        updateCartItem();
      }
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
      user: { _id: userId } = {},
      navigation,
      isAdmin,
    } = this.props;
    const isInsideCart = cartItemIds.indexOf(productId ) > -1;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isInsideCart ? '#FC9000' : '#a8de1c',
        }}
      >
        <CustomHeader title="Detail" />
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
              const {
                title,
                description,
                stock,
                unit,
                photo,
                price,
                discount,
                expired_date,
                minimum_order,
                label,
                category,
                packaging
              } = product;
              const { title: categoryTitle = ''  } = category || {};
              const priceRupiah = parseToRupiah(price);
              const discountRupiah = parseToRupiah(calcDiscount(price, discount));
              return (
                <Fragment>
                  <ScrollView 
                    contentContainerStyle={{
                      alignItems: 'center',
                    }}
                    showsVerticalScrollIndicator={false}
                  >
                    <ProductDetailWrapper>
                      {discount ? (
                        <View
                          style={{
                            position: 'absolute',
                            right: moderateScale(10),
                            top: moderateScale(10),
                            height: moderateScale(40),
                            width: moderateScale(40),
                            borderRadius: moderateScale(20),
                            backgroundColor: Colors.fruit_dark,
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation: 5
                          }}
                        >
                          <Text 
                            style={{
                              fontFamily: 'CircularStd-Book',
                              fontSize: 16,
                              color: Colors.white,
                            }}
                            numberOfLines={1}
                          >
                            {discount}%
                          </Text>
                        </View>
                      ) : null}
                      <ProductImage
                        source={photo}
                        style={{
                          width: moderateScale(260),
                          height: moderateScale(260),
                          resizeMode: 'contain',
                          alignSelf: 'center',
                        }}
                      />
                      <View 
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginHorizontal: moderateScale(30),
                          marginBottom: moderateScale(3),
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: 'CircularStd-Book',
                            fontSize: 18,
                            color: 'rgba(0,0,0,0.68)',
                            marginRight: moderateScale(5),
                          }}
                        >
                          {discount ? discountRupiah : priceRupiah}
                        </Text>
                        { packaging ? (
                            <Text 
                              style={{
                                fontFamily: 'CircularStd-Book',
                                fontSize: 16,
                                color: Colors.text_light,
                              }}
                              numberOfLines={1}
                            >
                              {`/${packaging} ${unit}`}
                            </Text>
                          ) : null
                        }
                      </View>
                      <Text
                        style={{
                          fontFamily: 'CircularStd-Bold',
                          fontSize: 20,
                          color: Colors.black,
                          marginHorizontal: moderateScale(30),
                          marginBottom: moderateScale(5),
                        }}
                      >
                        {title}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'CircularStd-Book',
                          fontSize: 16,
                          color: 'rgba(0,0,0,0.3)',
                          marginHorizontal: moderateScale(30),
                        }}
                      >
                        Stok tersedia: {stock} {unit}
                      </Text>
                    </ProductDetailWrapper>
                    
                    <View
                      style={{ 
                        marginTop: moderateScale(20),
                        marginBottom: moderateScale(30),
                        marginHorizontal: moderateScale(40),
                        alignSelf: 'flex-start',
                      }}
                    >
                      {categoryTitle ? (
                        <Text 
                          style={{
                            fontFamily: 'CircularStd-Book',
                            fontSize: 14,
                            color: 'rgba(0,0,0,0.3)',
                            marginBottom: moderateScale(5),
                          }}
                        >
                          Kategori: {categoryTitle}
                        </Text>
                      ) : null }
                      <Text 
                        style={{
                          fontFamily: 'CircularStd-Book',
                          fontSize: 14,
                          color: 'rgba(0,0,0,0.3)',
                          marginBottom: moderateScale(15),
                        }}
                      >
                        Kadaluarsa: {getReadableDate(expired_date, 'DD-MM-YYYY', 'id', 'DD MMM YYYY')}
                      </Text>
                      <Text 
                        style={{
                          fontFamily: 'CircularStd-Book',
                          fontSize: 14,
                          color: 'rgba(0,0,0,0.5)',
                        }}
                      >
                        {description}
                      </Text>
                    </View>
                  </ScrollView>
                  {!isAdmin && userId &&
                    <Mutation
                      mutation={UPDATE_CART_ITEM_SCHEMA}
                      variables={{ user_id: userId, product_id: productId, qty: null }}
                      update={(cache, data) => cacheUpdateCartItem(cache, data, productId)}
                      onCompleted={this.onUpdateCartItem}
                      onError={(error) => {}}
                      ignoreResults={false}
                      errorPolicy='all'>
                      { (updateCartItem, {loading, error, data}) => {
                        const isAdded = isInsideCart || data;
                        return (
                          <ButtonPrimary
                            onPress={() => this.onAddToCart(updateCartItem, isAdded)}
                            title={isAdded ? 'Lihat di Keranjang' : 'Pesan Sekarang'}
                            colors={isAdded ? ['#FC9000', '#FDAD00'] : ['#a8de1c', '#50ac02']}
                            loading={loading}
                          />
                        );
                      }}
                    </Mutation>
                  }
                </Fragment>
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
  isAdmin: bool,
}

const mapStateToProps = createStructuredSelector({
  user: getUser(),
  cartItemIds: getCartItemIds(),
  isAdmin: isAdmin(),
});

export default compose(
  connect(mapStateToProps, null),
  UPDATE_CART_ITEM
)(Detail);