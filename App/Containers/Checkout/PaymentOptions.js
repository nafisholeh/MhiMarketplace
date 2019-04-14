import React, { Component } from 'react';
import { View, Text, CheckBox, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { FETCH_PAYMENT_OPTION } from 'GraphQL/PaymentOption/Query';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import { Metrics } from 'Themes';
import { RadioButton } from 'Components';
import CheckoutActions from 'Redux/CheckoutRedux';

class PaymentOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: null,
      paymentSelected: null,
    }
  }
  
  componentDidMount() {
    this.setupData();
  }
  
  setupData = async () => {
    const { selectPayment } = this.props;
    try {
      const { paymentOptions = [] } = ApolloClientProvider.client.cache.readQuery({
        query: FETCH_PAYMENT_OPTION
      });
      this.setState({ payments: paymentOptions });
      if (paymentOptions.length > 0) {
        this.setState({
          paymentSelected: paymentOptions[0]._id
        }, () => {
          selectPayment(this.state.paymentSelected);
        })
      }
    } catch (error) {
      const { data: { paymentOptions = [] } } = await ApolloClientProvider.client.query({
        query: FETCH_PAYMENT_OPTION
      });
      this.setState({ payments: paymentOptions });
      if (paymentOptions.length > 0) {
        this.setState({
          paymentSelected: paymentOptions[0]._id
        }, () => {
          selectPayment(this.state.paymentSelected);
        })
      }
    }
  };
  
  toggleCod = state => {
    this.setState((prevState) => {
      return {
        cod: !prevState.cod,
        transfer: prevState.cod,
      }
    });
  };
  
  toggleTransfer = state => {
    this.setState((prevState) => {
      return {
        transfer: !prevState.transfer,
        cod: prevState.transfer,
      }
    });
  };
  
  toggleSelection = _id => {
    this.setState({ paymentSelected: _id });
  }
  
  renderPaymentItems = ({ item, index }) => {
    const { _id = 0, type = '', detail = '' } = item;
    const { paymentSelected } = this.state;
    const isSelected = paymentSelected === _id;
    return (
      <TouchableOpacity 
        style={{
          flexDirection: 'row',
          marginBottom: Metrics.baseMargin,
          alignItems: 'center',
        }}
        onPress={() => this.toggleSelection(_id)}
      >
        <RadioButton
          isSelected={isSelected}
          styleContainer={{ marginRight: Metrics.baseMargin }}
        />
        <Text>{detail || ''}</Text>
      </TouchableOpacity>
    );
  };
  
  render() {
    const { cod, transfer, payments, paymentSelected } = this.state;
    return (
      <View 
        style={{
          flex: 1,
          marginHorizontal: Metrics.baseMargin,
          marginTop: Metrics.baseMargin
        }}
      >
        <FlatList
          data={payments}
          extraData={paymentSelected}
          keyExtractor={(item, id) => item._id.toString()}
          renderItem={this.renderPaymentItems}
        />
      </View>
    );
  }
}

PaymentOptions.propTypes = {
  selectPayment: func,
};

const mapDispatchToProps = dispatch => ({
  selectPayment: paymentSelected => dispatch(CheckoutActions.selectPayment(paymentSelected))
});

export default connect(null, mapDispatchToProps)(PaymentOptions);
