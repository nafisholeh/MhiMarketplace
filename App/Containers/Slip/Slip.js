import React, { Component } from 'react';
import { View, Text, ScrollView, Image, FlatList, WebView, StyleSheet, TouchableOpacity } from 'react-native';
import { Query } from 'react-apollo';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import HTMLView from 'react-native-htmlview';

import { Metrics, Images, Colors } from 'Themes';
import { ToolbarButton } from 'Components';
import { FETCH_ORDER_DETAIL } from 'GraphQL/Order/Query';
import { getCheckoutId } from 'Redux/CheckoutRedux';
import { parseToRupiah, moderateScale } from 'Lib';

class Slip extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  };

  render() {
    const { checkoutId } = this.props;
    return (
      <View style={{flex:1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: moderateScale(15),
            paddingVertical: moderateScale(20),
          }}>
          <Text
            style={{
              fontFamily: 'CircularStd-Bold',
              fontSize: 18,
              color: 'rgba(0,0,0,0.68)',
            }}
          >
            Slip Pembayaran
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} >
            <Image
              source={Images.check}
              style={{
                width: moderateScale(35),
                height: moderateScale(35),
              }}
            />
          </TouchableOpacity>
        </View>
        <Query 
          query={FETCH_ORDER_DETAIL}
          variables={{ _id: checkoutId }}>
          {({ loading, error, data, refetch }) => {
            if (loading) return (<View />);
            else if (error) return (<View />);
            const { orderDetail } = data;
            if (!orderDetail) return (<View />);
            const { products, transaction_id, total_cost, payment_option } = orderDetail;
            const { how_to_pay = '' } = payment_option || {};
            console.tron.log('Slip', how_to_pay);
            return (
              <ScrollView
                style={{
                  flex: 1,
                  paddingHorizontal: moderateScale(15),
                }}
              >
                <View style={{ marginVertical: Metrics.section }}>
                  <View 
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: Metrics.baseMargin
                    }}
                  >
                    <Text
                      style={styles.rowTitle}
                      numberOfLines={1}
                    >
                      Nomor Transaksi:
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: Colors.green_light
                      }}>
                      {transaction_id || ''}
                    </Text>
                  </View>
                  <Text
                    style={styles.rowTitle}
                    numberOfLines={1}
                  >
                    Yang harus dibayar:
                  </Text>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      textAlign: 'right',
                      color: Colors.red
                    }}>
                    {parseToRupiah(total_cost) || ''}
                  </Text>
                </View>
                <View style={{ marginBottom: Metrics.doubleSection }}>
                  <Text
                    style={[ styles.rowTitle, { marginBottom: moderateScale(15) } ]}
                    numberOfLines={1}
                  >
                    Cara membayar:
                  </Text>
                  { how_to_pay ? (
                      <HTMLView
                        value={how_to_pay}
                        stylesheet={htmlStyles}
                      />
                    ) : (
                      <Text
                        style={htmlStyles.p}
                      >
                        Belum ada info cara pembayaran. Silahkan hubungi MHI untuk mengetahui lebih lanjut.
                      </Text>
                    )
                  }
                </View>
                <View style={{ alignItems: 'center', marginBottom: Metrics.section }}>
                  <Image source={Images.mhi} style={{ height: 90, width: 110, marginBottom: Metrics.baseMargin }} />
                  <Text
                    style={{
                      fontFamily: 'CircularStd-Book',
                      fontSize: 14,
                      color: 'rgba(0,0,0,0.4)',
                    }}
                  >
                    Diproduksi dan diawasi oleh MHI
                  </Text>
                </View>
              </ScrollView>
            );
          }}
        </Query>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowTitle: {
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
    color: 'rgba(0,0,0,0.68)',
    marginRight: moderateScale(10),
  },
});

const htmlStyles = StyleSheet.create({
  p: {
    fontFamily: 'CircularStd-Book',
    fontSize: 13,
    color: 'rgba(0,0,0,0.5)',
  }
});

Slip.propTypes = {
  checkoutId: string,
};

const mapStateToProps = createStructuredSelector({
  checkoutId: getCheckoutId(),
});

export default connect(mapStateToProps, null)(Slip);
