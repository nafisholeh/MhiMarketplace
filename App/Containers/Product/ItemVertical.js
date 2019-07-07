import React, { Component, Fragment } from 'react';
import { Text, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { shape, number, string, func, arrayOf, bool } from 'prop-types';
import { compose, Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withNavigation } from 'react-navigation';

import { parseToRupiah, calcDiscount, moderateScale } from 'Lib';
import { Images, Colors } from 'Themes';
import styles from './Styles';
import { ProductVerticalWrapper, CartAddButton, ProductImage } from 'Components';
import { getUserId, isStokOpname } from 'Redux/SessionRedux';
import { getCartItemIds } from 'Redux/CartRedux';
import { UPDATE_CART_ITEM, UPDATE_CART_ITEM_SCHEMA, cacheUpdateCartItem } from 'GraphQL/Cart/Mutation';
import ProductActions from 'Redux/ProductRedux';

class Item extends Component {
  
  onItemClicked = () => {
    const { data, navigation } = this.props;
    navigation.navigate('ProductDetail', { data });
  }
  
  onEdit = () => {
    const { navigation, storeEditedProduct, data: { _id: productId } } = this.props;
    storeEditedProduct(productId);
    navigation.navigate('ProductEdit')
  }
  
  render() {
    const { data, cartItemIds, userId, isStokOpname } = this.props
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
      <ProductVerticalWrapper
        onPress={this.onItemClicked}
        styleChildren={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        {discount ? (
          <View
            style={{
              position: 'absolute',
              right: 3,
              top: moderateScale(5),
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
        <ProductImage
          source={photo}
          style={{
            width: moderateScale(74),
            height: moderateScale(74),
            resizeMode: 'contain',
            marginRight: moderateScale(12),
          }}
        />
        <View
          style={{
            flex: 1,
            height: 74,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text 
              style={{
                fontFamily: 'CircularStd-Book',
                fontSize: 16,
                color: Colors.text,
                marginRight: moderateScale(5)
              }}
              numberOfLines={1}
            >
              {parseToRupiah(price)}
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
            {stock ? `${stock} pcs` : `Stok sementara kosong`}
          </Text>
        </View>
        { isStokOpname &&
          <TouchableOpacity
            style={styles.product__item_cart}
            onPress={this.onEdit}
          >
            <Image
              source={Images.edit}
              style={styles.itemImage}
            />
          </TouchableOpacity>
        }
        { !isInsideCart && !isStokOpname && userId &&
          <Mutation
            mutation={UPDATE_CART_ITEM_SCHEMA}
            variables={{ user_id: userId, product_id: productId, qty: null }}
            update={(cache, data) => cacheUpdateCartItem(cache, data, productId)}
            onError={(error) => {}}
            ignoreResults={false}
            errorPolicy='all'>
            { (updateCartItem, {loading, error, data}) => {
              if (data) return (<View/>);
              return (
                <TouchableOpacity
                  style={styles.product__item_cart}
                  onPress={() => updateCartItem()}
                >
                  {loading && (<ActivityIndicator size="small" />)}
                  {!loading && (
                    <CartAddButton isError={error} />
                  )}
                </TouchableOpacity>
              );
            }}
          </Mutation>
        }
      </ProductVerticalWrapper>
    )
  }
}

Item.propTypes = {
  data: shape({
    _id: string,
    title: string,
    price: number,
    discount: number,
    photo: string,
  }),
  updateCartItem: func,
  userId: string,
  cartItemIds: arrayOf(string),
  isStokOpname: bool,
  storeEditedProduct: func,
}

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
)(withNavigation(Item));