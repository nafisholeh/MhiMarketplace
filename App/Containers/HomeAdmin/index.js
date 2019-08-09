import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { bool } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class Home extends Component {
  onOpenEventPage = () => {
    const { navigation } = this.props;
    navigation.navigate('EventInput');
  };

  render() {
    return (
      <ScrollView>
        <TouchableOpacity
          onPress={this.onOpenEventPage}
        >
          <Text>Input Event</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

Home.propTypes = {
  
};

const mapStateToProps = createStructuredSelector({
  
});

export default connect(mapStateToProps, null)(withNavigation(Home));
