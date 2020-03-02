import React, { Component } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { createStructuredSelector } from "reselect";

import { SIGNOUT } from "GraphQL/User/Mutation";
import ApolloClientProvider from "Services/ApolloClientProvider";
import SessionActions, { getUser, getUserId } from "Redux/SessionRedux";
import CartActions from "Redux/CartRedux";
import CheckoutActions from "Redux/CheckoutRedux";

export default function withSignout(WrappedComponent) {
  class SignoutComponent extends Component {
    signout = mutate => {
      Alert.alert(
        "Konfirmasi",
        "Apa Anda yakin ingin keluar dari sesi ini?",
        [
          {
            text: "Batal",
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {
              const { userId: user_id } = this.props;
              mutate({
                variables: { user_id }
              });
            }
          }
        ],
        { cancelable: false }
      );
    };

    onSignoutComplete = async () => {
      const {
        reset: clearSession,
        resetCart,
        resetCheckout,
        navigation
      } = this.props;
      ApolloClientProvider.client.resetStore();
      await clearSession();
      await resetCart();
      await resetCheckout();
      navigation.navigate("ConsumerNav");
    };

    render() {
      return (
        <Mutation
          mutation={SIGNOUT}
          onCompleted={this.onSignoutComplete}
          ignoreResults={false}
          errorPolicy="all"
        >
          {(mutate, { loading, error, data }) => {
            return (
              <WrappedComponent
                {...this.props}
                signoutLoading={loading}
                signoutError={error}
                signoutData={data}
                onSignout={() => this.signout(mutate)}
              />
            );
          }}
        </Mutation>
      );
    }
  }

  const mapStateToProps = createStructuredSelector({
    userData: getUser(),
    userId: getUserId()
  });

  const mapDispatchToProps = dispatch => ({
    reset: () => dispatch(SessionActions.reset()),
    resetCart: () => dispatch(CartActions.resetCart()),
    resetCheckout: () => dispatch(CheckoutActions.resetCheckout())
  });

  return connect(mapStateToProps, mapDispatchToProps)(SignoutComponent);
}
