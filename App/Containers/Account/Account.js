import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { shape, string, func } from 'prop-types';

import SessionActions, { getUser } from 'Redux/SessionRedux';

class Account extends Component {
  signout = () => {
    const { reset: clearSession } = this.props;
    clearSession();
  };
  
  render() {
    const { user: { email = '', name = '' } } = this.props;
    return (
      <View>
        <Text>{email}</Text>
        <Text>{name}</Text>
        <TouchableOpacity
          onPress={this.signout}
        />
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

Account.defaultProps = {
  user: {
    email: '',
    name: '',
  }
};

const mapStateToProps = createStructuredSelector({
  user: getUser(),
});

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(SessionActions.reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
