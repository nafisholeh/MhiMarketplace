import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { func, string, bool } from 'prop-types';
import { createStructuredSelector } from 'reselect';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import List from 'Containers/Product/List';
import { HeaderButton, SearchBar, ConsumerPageHeader } from 'Components';
import CartActions from 'Redux/CartRedux';
import { getUserId, isKurir } from 'Redux/SessionRedux';
import { Images, Metrics } from 'Themes';
import { moderateScale } from 'Lib';
import styles from './Styles';
    
class Home extends Component {
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
    this.fetchInitCart();
  }
  
  fetchInitCart = () => {
    const { storeCart, userId } = this.props;
    if (!userId) {
      return;
    }
    ApolloClientProvider.client.query({
      query: FETCH_CART,
      variables: { user_id: userId }
    })
    .then(data => {
      const { data: { cart }} = data;
      storeCart(cart);
    })
    .catch(err => {})
  }
  
  onSearch = term => {
    this.setState({ searchTerm: term });
  };
  
  render() {
    const { isKurir, navigation } = this.props;
    const { searchTerm } = this.state;
    return (
      <View style={styles.container}>
        <ConsumerPageHeader
          icon={isKurir ? Images.cart : Images.delivery}
          onIconPress={() => navigation.navigate(isKurir ? 'Cart' : 'ConsumerOrder')}
          onSearch={this.onSearch}
        />
        <List
          searchTerm={searchTerm}
        />
      </View>
    )
  }
}

Home.propTypes = {
  userId: string,
  storeCart: func,
  isKurir: bool,
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  isKurir: isKurir(),
});

const mapDispatchToProps = (dispatch) => ({
  storeCart: cart => dispatch(CartActions.storeCart(cart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Home));
