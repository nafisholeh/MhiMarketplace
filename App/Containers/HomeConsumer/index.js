import React, { Component } from 'react';
import { View } from 'react-native';
import { func, string, bool } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Images } from 'Themes';
import { ConsumerPageHeader } from 'Components';
import { getUserId, isKurir } from 'Redux/SessionRedux';

class HomeConsumer extends Component {
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    return {
      header: null,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }
  
  onSearch = term => {
    this.setState({ searchTerm: term });
  };

  render() {
    const { isKurir, navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ConsumerPageHeader
          icon={isKurir ? Images.cart : Images.delivery}
          onIconPress={() => navigation.navigate(isKurir ? 'Cart' : 'ConsumerOrder')}
          onSearch={this.onSearch}
        />
      </View>
    );
  }
}

HomeConsumer.propTypes = {
  userId: string,
  isKurir: bool,
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  isKurir: isKurir(),
});

export default connect(mapStateToProps, null)(withNavigation(HomeConsumer));
