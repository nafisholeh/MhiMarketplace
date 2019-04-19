import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { shape, string, func } from 'prop-types';

import Config from 'Config/AppConfig';
import { StatePage } from 'Components';
import { Colors, Metrics } from 'Themes';
import SessionActions, { getUser } from 'Redux/SessionRedux';

class Account extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }
  
  signout = () => {
    const { reset: clearSession } = this.props;
    clearSession();
  };
  
  signin = () => {
    const { navigation } = this.props;
    navigation.navigate('Signin');
  }
  
  render() {
    const { user } = this.props;
    const { email = '', name = '' } = user || {};
    if (!user) {
      return (
        <StatePage
          title="Untuk kenyamanan Anda"
          subtitle="Silahkan daftar/login terlebih dahulu"
          buttonTitle="Login Yuk"
          icon={Config.pageState.NO_ACCOUNT}
          onPress={this.signin}
        />
      )
    }
    return (
      <View style={{ flex: 1, padding: Metrics.baseMargin }}>
        <Text>{email}</Text>
        <Text>{name}</Text>
        <TouchableOpacity
          style={{
            flex: 1,
            maxHeight: 50,
            justifyContent: 'center',
            backgroundColor: Colors.green_light
          }}
          onPress={this.signout}
        >
          <Text style={{ alignSelf: 'center', color: 'white' }}>Keluar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Account.propTypes = {
  user: shape({
    email: string,
    name: string,
  }),
  reset: func,
};

const mapStateToProps = createStructuredSelector({
  user: getUser(),
});

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(SessionActions.reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
