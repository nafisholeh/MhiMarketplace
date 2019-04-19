import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { shape, string, func } from 'prop-types';

import { Colors } from 'Themes';
import SessionActions, { getUser } from 'Redux/SessionRedux';

class Account extends Component {
  signout = () => {
    const { reset: clearSession } = this.props;
    clearSession();
  };
  
  render() {
    const { user } = this.props;
    const { email = '', name = '' } = user || {};
    return (
      <View>
        <Text>{email}</Text>
        <Text>{name}</Text>
        <TouchableOpacity
          style={{ width: 150, height: 50, backgroundColor: Colors.green_light }}
          onPress={this.signout}
        >
          <Text>Keluar</Text>
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
