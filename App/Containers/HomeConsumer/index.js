import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { func, string, bool } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import CartActions from 'Redux/CartRedux';
import { Images, Colors } from 'Themes';
import { moderateScale, reportSentryError } from 'Lib';
import { ConsumerPageHeader, ListHeader, CategoryItem, AppTitle } from 'Components';
import { getUserId, isKurir } from 'Redux/SessionRedux';
import ProductList from 'Containers/Product/List';

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
  
  componentDidMount() {
    const { navigation } = this.props;
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
  
  openStoreByCategory = category => {
    const { navigation } = this.props;
    navigation.navigate('ProductList');
  };

  render() {
    const { isKurir, navigation } = this.props;
    return (
      <ScrollView style={{ flex: 1 }}>
        <ConsumerPageHeader
          icon={isKurir ? Images.cart : Images.delivery}
          onIconPress={() => navigation.navigate(isKurir ? 'Cart' : 'ConsumerOrder')}
          onSearch={this.onSearch}
        />
        <AppTitle />
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: moderateScale(15),
            marginBottom: moderateScale(18),
          }}
        >
          <CategoryItem
            title="Sayuran"
            icon={Images.veggie}
            color={Colors.veggie_bg}
            onPress={() => this.openStoreByCategory('veggie')}
          />
          <CategoryItem
            title="Buah"
            icon={Images.fruit}
            color={Colors.fruit_bg}
            onPress={() => this.openStoreByCategory('fruit')}
          />
          <CategoryItem
            title="Hortikultura"
            icon={Images.horti}
            color={Colors.horti_bg}
            onPress={() => this.openStoreByCategory('horti')}
          />
        </View>
        <ListHeader
          title="STOK BARU"
          color={Colors.red2}
          onNavigate={() => navigation.navigate('Store')}
        />
        <ProductList
          limit={2}
          sort={{ expired_date: -1 }}
          isSection
          isHorizontal
        />
        <ListHeader
          title="STOK MELIMPAH"
          color="#03506C"
          onNavigate={() => navigation.navigate('Store')}
        />
        <ProductList
          limit={2}
          sort={{ stock: -1 }}
          isSection
        />
      </ScrollView>
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

const mapDispatchToProps = (dispatch) => ({
  storeCart: cart => dispatch(CartActions.storeCart(cart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(HomeConsumer));
