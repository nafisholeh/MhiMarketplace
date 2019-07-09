import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { shape, number, string, func, arrayOf, bool } from 'prop-types';
import { compose, Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withNavigation } from 'react-navigation'; 
import LinearGradient from 'react-native-linear-gradient';
import { DotIndicator } from 'react-native-indicators';

import { Colors, Images } from 'Themes';
import {
  ProductHorizontalWrapper,
  ProductImage
} from 'Components';
import { screenWidth, moderateScale, parseToRupiah, calcDiscount } from 'Lib';
import { getUserId, isStokOpname } from 'Redux/SessionRedux';
import { getCartItemIds } from 'Redux/CartRedux';
import {
  UPDATE_CART_ITEM,
  UPDATE_CART_ITEM_SCHEMA,
  cacheUpdateCartItem
} from 'GraphQL/Cart/Mutation';

class ItemHorizontal extends Component {
  onNavigate = () => {
    const { data, navigation } = this.props;
    navigation.navigate('ProductDetail', { data });
  };

  render() {
    const { data, cartItemIds, userId } = this.props
    if (!data) {
      return <View />
    }
    const {
      _id: productId,
      title,
      price,
      discount,
      photo,
      unit,
      stock,
      label,
      category,
      packaging
    } = data;
    const isInsideCart = cartItemIds.indexOf(productId) > -1;
    return (
      <ProductHorizontalWrapper
        onPress={this.onNavigate}
      >
        {discount ? (
          <View
            style={{
              position: 'absolute',
              right: 8,
              bottom: userId ? 18.5 : 80,
              height: moderateScale(30),
              width: moderateScale(30),
              borderRadius: moderateScale(15),
              backgroundColor: Colors.fruit_dark,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 5
            }}
          >
            <Text 
              style={{
                fontFamily: 'CircularStd-Book',
                fontSize: 12,
                color: Colors.white,
              }}
              numberOfLines={1}
            >
              {discount}%
            </Text>
          </View>
        ) : null}
        <View
          style={{
            marginTop: moderateScale(10),
          }}
        >
          <ProductImage
            source={photo}
            style={{
              width: moderateScale(
                (screenWidth / 2) - moderateScale(38)
              ),
              height: moderateScale(96),
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: userId ? 'flex-start' : 'space-around',
            marginTop: userId ? 0 : moderateScale(5),
            marginHorizontal: moderateScale(10),
            marginBottom: moderateScale(5),
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text 
              style={{
                fontFamily: 'CircularStd-Book',
                fontSize: 14,
                color: 'rgba(0,0,0,0.68)',
                marginRight: moderateScale(5),
              }}
              numberOfLines={1}
            >
              {discount ? 
                parseToRupiah(price - calcDiscount(price, discount))
                : parseToRupiah(price)
              }
            </Text>
            { packaging ? (
                <Text 
                  style={{
                    fontFamily: 'CircularStd-Book',
                    fontSize: 14,
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
              fontSize: 16,
              color: Colors.black,
            }}
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text
            style={{
              fontFamily: 'CircularStd-Book',
              fontSize: 12,
              color: 'rgba(0,0,0,0.3)',
            }}
            numberOfLines={1}
          >
            {stock ? `${stock} ${unit}` : `Stok sementara kosong`}
          </Text>
        </View>
        {userId &&
          <Mutation
            mutation={UPDATE_CART_ITEM_SCHEMA}
            variables={{ user_id: userId, product_id: productId, qty: null }}
            update={(cache, data) => cacheUpdateCartItem(cache, data, productId)}
            onError={(error) => {}}
            ignoreResults={false}
            errorPolicy='all'>
            { (updateCartItem, {loading, error, data}) => {
              return (
                <LinearGradient
                  start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                  colors={
                    !isInsideCart ?
                    ['#a8de1c', '#50ac02'] : 
                    [Colors.brown_light, Colors.brown_dark]
                  }
                  style={{
                    height: 35,
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => updateCartItem()}
                    disabled={isInsideCart}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center' 
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
                      <Text
                        style={{
                          fontFamily: 'CircularStd-Medium',
                          fontSize: 17,
                          color: 'white'
                        }}
                      >
                        {!isInsideCart ? `Beli` : `Terbeli`}
                      </Text>
                    )}
                  </TouchableOpacity> 
                </LinearGradient>
              );
            }}
          </Mutation>
        }
        {label === 'mhi' ? (
          <Image
            source={Images.bebas_peskim}
            style={{
              position: 'absolute',
              top: moderateScale(5),
              left: moderateScale(5),
              height: moderateScale(30),
              width: moderateScale(30),
              resizeMode: 'contain',
            }}
          />
        ) : null}
      </ProductHorizontalWrapper>
    );
  }
}

ItemHorizontal.propTypes = {
  data: shape({
    _id: string,
    title: string,
    price: number,
    discount: number,
    photo: string,
  }),
};

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  cartItemIds: getCartItemIds(),
  isStokOpname: isStokOpname(),
});

const mapDispatchToProps = dispatch => ({
  storeEditedProduct: editedProduct => dispatch(ProductActions.storeEditedProduct(editedProduct)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  UPDATE_CART_ITEM
)(withNavigation(ItemHorizontal));
