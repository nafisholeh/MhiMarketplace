import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { bool } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import MyOrder from './MyOrder';
import ReadyToProcessList from './ReadyToProcess/List';

class Home extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'MH.id',
      headerLeft: null,
    }
  }

  openMyOrder = () => {
    const { navigation } = this.props;
    if (navigation) navigation.navigate('');
  };

  render() {
    return (
      <ScrollView>
        <MyOrder onNavigate={this.openMyOrder}/>
        <ReadyToProcessList />
      </ScrollView>
    );
  }
}

Home.propTypes = {
  
};

const mapStateToProps = createStructuredSelector({
  
});

export default connect(mapStateToProps, null)(withNavigation(Home));