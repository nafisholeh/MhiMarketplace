import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { isLoggedin } from 'Redux/SessionRedux';
import { StatePage } from 'Components';
import Config from 'Config/AppConfig';

export default function withPageAccess(
  WrappedComponent,
  Options = {}
) {
  class PageAccess extends Component {
    static navigationOptions = ({navigation}) => ({ header: null })
    
    openRegistrationPage = () => {
      const { navigation } = this.props;
      navigation.navigate('Signin');
    };

    render() {
      const { isLoggedin } = this.props;
      if (!isLoggedin) {
        return (
          <StatePage
            title="Sosial Media diblokir"
            subtitle="Halaman ini hanya untuk akun yang telah terdaftar sebagai petani"
            buttonTitle="Daftar Yuk"
            icon={Config.pageState.NO_ACCOUNT}
            onPress={this.openRegistrationPage}
          />
        );
      }
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
        />
      )
    }
  }
  
  const mapStateToProps = createStructuredSelector({
    isLoggedin: isLoggedin(),
  });
  
  return connect(mapStateToProps, null)(PageAccess);
}