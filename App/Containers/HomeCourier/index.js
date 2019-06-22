import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { bool } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import { HeaderButton } from 'Components';
import { Images } from 'Themes';

import ReadyToProcessList from 'Containers/Courier/ReadyToProcess/List';

class Home extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'MH.id',
      headerLeft: null,
      headerRight: (
        <HeaderButton
          onPress={() => navigation.navigate('Completed')}
          icon={Images.history}
        />
      ),
    }
  }

  openPage = page => {
    const { navigation } = this.props;
    if (navigation) navigation.navigate(page);
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
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
