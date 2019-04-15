import React, { Component } from 'react';
import { View, Text, ScrollView, Image, FlatList, WebView } from 'react-native';
import { Query } from 'react-apollo';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import HTMLView from 'react-native-htmlview';

import { Metrics, Images, Colors } from 'Themes';
import { ToolbarButton } from 'Components';
import { FETCH_CHECKOUT_SUMMARY } from 'GraphQL/Checkout/Query';
import { getCheckoutId } from 'Redux/CheckoutRedux';
import { parseToRupiah } from 'Lib';

class Slip extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Slip Pembayaran',
      headerLeft: null,
      headerRight: (
        <ToolbarButton
          icon={Images.check}
          onPress={() => navigation.navigate('Home')} 
        />
      ),
      headerStyle: { elevation: 0 }
    }
  }
  
  renderItem = ({ item, index }) => {
    const { product: { _id, title, unit }, qty } = item;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>
          {item.product.title}
        </Text>
        <Text>
          {qty ? qty : ''} {unit ? unit : ''}
        </Text>
      </View>
    );
  };

  render() {
    const { checkoutId } = this.props;
    return (
      <View style={{flex:1}}>
        <Query 
          query={FETCH_CHECKOUT_SUMMARY}
          variables={{ _id: checkoutId }}>
          {({ loading, error, data, refetch }) => {
            if (loading) return (<View />);
            else if (error) return (<View />);
            const { checkoutSummary } = data;
            if (!checkoutSummary) return (<View />);
            const { products, total_cost, payment_option } = checkoutSummary;
            const { how_to_pay = '' } = payment_option;
            return (
              <ScrollView style={{ flex: 1, paddingHorizontal: Metrics.baseMargin }}>
                <View style={{ marginVertical: Metrics.section }}>
                  <View 
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: Metrics.baseMargin
                    }}
                  >
                    <Text>Nomor Transaksi:</Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: Colors.green_light
                      }}>
                      {total_cost || ''}
                    </Text>
                  </View>
                  <Text>
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
                  <Text style={{ marginBottom: Metrics.baseMargin }}>
                    Cara membayar:
                  </Text>
                  { how_to_pay ? (
                      <HTMLView
                        value={how_to_pay}
                      />
                    ) : (
                      <Text>Belum ada info cara pembayaran. Silahkan hubungi MHI untuk mengetahui lebih lanjut.</Text>
                    )
                  }
                </View>
                <View style={{ alignItems: 'center', marginBottom: Metrics.section }}>
                  <Image source={Images.mhi} style={{ height: 90, width: 110, marginBottom: Metrics.baseMargin }} />
                  <Text style={{ flexShrink: 1 }}>
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

Slip.propTypes = {
  checkoutId: string,
};

const mapStateToProps = createStructuredSelector({
  checkoutId: getCheckoutId(),
});

export default connect(mapStateToProps, null)(Slip);
