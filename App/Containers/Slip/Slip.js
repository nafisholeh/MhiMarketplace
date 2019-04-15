import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Metrics } from 'Themes';
import { FETCH_CHECKOUT_SUMMARY } from 'GraphQL/Checkout/Query';
import { getCheckoutId } from 'Redux/CheckoutRedux';

class Slip extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Slip Pembayaran',
      headerLeft: null,
    }
  }

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
            console.tron.log('Slip', data)
            const { checkoutSummary } = data;
            if (!checkoutSummary) return (<View />);
            return (
              <ScrollView style={{flex: 1}}>
                <View>
                  <Text style={{marginVertical: Metrics.baseMargin}}>
                    Yang dipesan:
                  </Text>
                  {checkoutSummary.products.map(item => {
                    const { product: { title, unit }, qty } = item;
                    return (
                      <Text>{item.product.title} {qty || ''} {unit || ''}</Text>
                    )}
                  )}
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
