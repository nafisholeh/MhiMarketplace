import React, { Component } from 'react';
import { View, Text, ScrollView, Image, FlatList } from 'react-native';
import { Query } from 'react-apollo';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Metrics, Images } from 'Themes';
import { FETCH_CHECKOUT_SUMMARY } from 'GraphQL/Order/Query';
import { getCheckoutId } from 'Redux/CheckoutRedux';

class Order extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Order',
      headerLeft: null,
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
            const { products } = checkoutSummary;
            return (
              <ScrollView style={{flex: 1}}>
                <Image source={Images.mhi} style={{ height: 40, width: 40 }} />
                <View>
                  <Text style={{marginVertical: Metrics.baseMargin}}>
                    Yang dipesan:
                  </Text>
                  <FlatList
                    data={products}
                    renderItem={this.renderItem}
                  />
                </View>
              </ScrollView>
            );
          }}
        </Query>
      </View>
    )
  }
}

Order.propTypes = {
  checkoutId: string,
};

const mapStateToProps = createStructuredSelector({
  checkoutId: getCheckoutId(),
});

export default connect(mapStateToProps, null)(Order);
