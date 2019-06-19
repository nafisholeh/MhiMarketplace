import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { func, string, bool } from 'prop-types';
import { createStructuredSelector } from 'reselect';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import List from 'Containers/Product/List';
import { HeaderButton } from 'Components';
import CartActions from 'Redux/CartRedux';
import { getUserId, isStokOpname } from 'Redux/SessionRedux';
import { Images, Metrics } from 'Themes';
import styles from './Styles';
    
class Home extends Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state
    return {
      title: 'MH.id',
      headerLeft: null,
      headerRight: (
        <HeaderButton
          onPress={() => navigation.navigate('ProductAdd')}
          icon={Images.plus}
        />
      ),
    }
  }

  componentDidMount() {
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
  
  render() {
    return (
      <View style={styles.container}>
        <List />
      </View>
    )
  }
}

Home.propTypes = {
  userId: string,
  storeCart: func,
  isStokOpname: bool,
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  isStokOpname: isStokOpname(),
});

const mapDispatchToProps = (dispatch) => ({
  storeCart: cart => dispatch(CartActions.storeCart(cart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Home));
