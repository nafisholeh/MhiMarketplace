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

  openPage = page => {
    const { navigation } = this.props;
    if (navigation) navigation.navigate(page);
  };

  render() {
    return (
      <ScrollView>
        <MyOrder 
          onOpenProcessing={() => this.openPage('Processing')}
          onOpenReadyToSend={() => this.openPage('ReadyToSend')}
        />
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
