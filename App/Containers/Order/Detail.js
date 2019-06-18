import React, { Component, Fragment } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { string, bool } from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { TextField } from 'react-native-material-textfield';
import { DotIndicator } from 'react-native-indicators';

import Config from 'Config/AppConfig';
import { parseToRupiah } from 'Lib';
import { QueryEffectPage } from 'Components';
import { Colors } from 'Themes';
import { getCheckoutId, getCheckoutName, getCheckoutStatus } from 'Redux/CheckoutRedux';
import { FETCH_CHECKOUT_SUMMARY } from 'GraphQL/Order/Query';
import { COMPLETED_CHECKOUT_LIST, PAID_OFF_CHECKOUT_LIST } from 'GraphQL/Order/Query';
import { CONFIRM_ORDER } from 'GraphQL/Order/Mutation';

class Detail extends Component {
  state = {
    total_paid: '',
    total_paid_parsed: '',
    account_number: '',
    account_bank: '',
    transaction_detail: '',
    error_total_paid: null,
    error_account_number: null,
    error_account_bank: null,
    error_transaction_detail: null,
  };

  isValid = () => {
    const { total_paid, account_number, account_bank } = this.state;
    this.setState({
      error_total_paid: !total_paid ? Config.warningMandatory : null,
      error_account_number: !account_number ? Config.warningMandatory : null,
      error_account_bank: !account_bank ? Config.warningMandatory : null,
    });
    return total_paid && account_number && account_bank;
  };
  
  submit = mutate => {
    if(!this.isValid()) return;
    const { total_paid, account_number, account_bank, transaction_detail } = this.state;
    const { checkoutId } = this.props;
    mutate({
      variables: {
        _id: checkoutId,
        total_paid: parseInt(total_paid, 10),
        account_number,
        account_bank,
        transaction_detail 
      }
    });
  };
  
  onSubmitComplete = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const {
      total_paid,
      total_paid_parsed,
      account_number,
      account_bank,
      transaction_detail,
      error_total_paid,
      error_account_number,
      error_account_bank,
      error_transaction_detail,
    } = this.state;
    const { checkoutId, checkoutName, confirmed } = this.props;
    return (
      <Mutation
        mutation={CONFIRM_ORDER}
        onCompleted={this.onSubmitComplete}
        refetchQueries={[ {query: PAID_OFF_CHECKOUT_LIST}, {query: COMPLETED_CHECKOUT_LIST}]}
        awaitRefetchQueries={true}
        ignoreResults={false}
        errorPolicy='all'>
        { (
          mutate, 
          {
            loading: loadingMutate,
            error: errorMutate,
            data: dataMutate
          }
        ) => {
          return (
            <Query 
              query={FETCH_CHECKOUT_SUMMARY}
              variables={{ _id: checkoutId }}>
              {({ loading, error, data, refetch }) => {
                if (!data) {
                  return (
                    <QueryEffectPage
                      loading={loading}
                      state={error}
                      onStateRefresh={refetch}
                    />
                  );
                }
                const { checkoutSummary: { total_cost, transaction_id } = {} } = data || {};
                return (
                  <Fragment>
                    <ScrollView>
                      <Text>No. Transaksi: {transaction_id}</Text>
                      <Text>Nama pemesan: {checkoutName}</Text>
                      <Text>Yang harus dibayar:</Text>
                      <Text>{total_cost}</Text>
                      {!confirmed && (
                        <Fragment>
                          <Text>Detail transfer</Text>
                          <TextField
                            label="Total yang dikirim"
                            value={total_paid_parsed}
                            error={error_total_paid}
                            prefix="Rp"
                            onChangeText={(text) => this.setState({
                              total_paid: text.replace(/\D+/g, ''),
                              total_paid_parsed: parseToRupiah(text, ' ') || '-',
                            })}
                            returnKeyType="next"
                            keyboardType="numeric"
                            onSubmitEditing={() => this._accountNumber.focus()}
                          />
                          <TextField
                            ref={ref => this._accountNumber = ref}
                            label="Nomor rekening"
                            value={account_number}
                            error={error_account_number}
                            onChangeText={(text) => this.setState({ account_number: text })}
                            returnKeyType="next"
                            keyboardType="numeric"
                            onSubmitEditing={() => this._accountBank.focus()}
                          />
                          <TextField
                            ref={ref => this._accountBank = ref}
                            label="Nama bank"
                            value={account_bank}
                            error={error_account_bank}
                            onChangeText={(text) => this.setState({ account_bank: text })}
                            returnKeyType="next"
                            onSubmitEditing={() => this._transactionDetail.focus()}
                          />
                          <TextField
                            ref={ref => this._transactionDetail = ref}
                            label="Berita transaksi"
                            value={transaction_detail}
                            error={error_transaction_detail}
                            onChangeText={(text) => this.setState({ transaction_detail: text })}
                            multiline={true}
                            returnKeyType="go"
                            onSubmitEditing={() => this.submit(mutate)}
                          />
                        </Fragment>
                      )}
                    </ScrollView>
                    {!confirmed && (
                      <TouchableOpacity
                        disabled={loadingMutate || loading}
                        onPress={() => this.submit(mutate)}
                        style={{
                          flex: 1,
                          height: 50,
                          backgroundColor: Colors.green_light,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        {loadingMutate &&
                          <DotIndicator
                            count={4}
                            size={7}
                            color='white'
                            animationDuration={800}
                          />
                        }
                        {!loadingMutate &&
                          <Text style={{ color: 'white' }}>
                            Selesai
                          </Text>
                        }
                      </TouchableOpacity>
                    )}
                  </Fragment>
                );
              }}
            </Query>
          )
        }}
      </Mutation>
    );
  }
}

Detail.propTypes = {
  checkoutId: string,
  checkoutName: string,
  confirmed: bool,
};

const mapStateToProps = createStructuredSelector({
  checkoutId: getCheckoutId(),
  checkoutName: getCheckoutName(),
  confirmed: getCheckoutStatus(),
});

export default connect(mapStateToProps, null)(Detail);
