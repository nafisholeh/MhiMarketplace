import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { func, string, bool } from 'prop-types';
import { createStructuredSelector } from 'reselect';

import ProductList from 'Containers/Product/List';
import { HeaderButton, SearchBar, ConsumerPageHeader } from 'Components';
import { getUserId, isKurir } from 'Redux/SessionRedux';
import { Images, Metrics } from 'Themes';
import { moderateScale } from 'Lib';
    
class ConsumerProductList extends Component {
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state
    const { isKurir = false } = params || {};
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

  componentDidMount() {
    const { navigation, isKurir } = this.props;
    navigation.setParams({ isKurir });
  }
  
  onSearch = term => {
    this.setState({ searchTerm: term });
  };
  
  render() {
    const { isKurir, navigation } = this.props;
    const { searchTerm } = this.state;
    return (
      <View 
        style={{
          flex: 1,
          paddingBottom: Metrics.baseMargin
        }}
      >
        <ConsumerPageHeader
          icon={isKurir ? Images.cart : Images.delivery}
          onIconPress={() => navigation.navigate(isKurir ? 'Cart' : 'ConsumerOrder')}
          onSearch={this.onSearch}
        />
        <ProductList
          searchTerm={searchTerm}
        />
      </View>
    )
  }
}

ConsumerProductList.propTypes = {
  userId: string,
  storeCart: func,
  isKurir: bool,
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  isKurir: isKurir(),
});

const mapDispatchToProps = (dispatch) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ConsumerProductList));
