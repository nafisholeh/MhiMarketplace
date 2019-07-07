import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import { parseToRupiah, isString, calcDiscount, moderateScale } from 'Lib';
import styles from './Styles';
import { ProductVerticalWrapper, ProductImage } from 'Components';
import { Colors, Images } from 'Themes';

class Item extends Component {
  render() {
    const {
      data,
      data: {
        product: { _id, title, photo, price, discount, unit }, 
        qty = 1
      },
      userId
    } = this.props;
    if (!data) {
      return (<View />);
    }
    const normalPrice = price * qty;
    const discountPrice = (price - calcDiscount(price, discount)) * qty;
    return (
      <ProductVerticalWrapper
        styleParent={{
          marginTop: moderateScale(2),
          marginBottom: moderateScale(2)
        }}
        styleChildren={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        }}
        height={80}
        shadowRadiusAndroid={8}
      >
        <ProductImage
          source={photo}
          style={{
            width: moderateScale(68),
            height: moderateScale(60),
            resizeMode: 'contain',
            marginRight: moderateScale(10),
          }}
        />
        <View style={styles.detail}>
          <Text
            style={{
              fontFamily: 'CircularStd-Book',
              fontSize: 16,
              color: Colors.black,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
          { discount > 0 &&
            <Text
              style={{
                fontFamily: 'CircularStd-Book',
                fontSize: 14,
                color: 'rgba(0,0,0,0.68)',
              }}
              numberOfLines={1}
            >
              {parseToRupiah(discountPrice)}
            </Text>
          }
          { (discount === 0 || !discount) &&
            <Text
              style={{
                fontFamily: 'CircularStd-Book',
                fontSize: 14,
                color: 'rgba(0,0,0,0.68)',
              }}
              numberOfLines={1}
            >
              {parseToRupiah(normalPrice)}
            </Text>
          }
          <Text
            style={{
              fontFamily: 'CircularStd-Book',
              fontSize: 12,
              color: 'rgba(0,0,0,0.3)',
            }}
            numberOfLines={1}
          >
            {qty} pcs
          </Text>
        </View>
        {label === 'mhi' ? (
          <Image
            source={Images.bebas_peskim}
            style={{
              position: 'absolute',
              right: moderateScale(4),
              bottom: moderateScale(4),
              height: moderateScale(30),
              width: moderateScale(30),
              resizeMode: 'contain',
            }}
          />
       ) : null}
      </ProductVerticalWrapper>
    );
  }
}

export default Item;
