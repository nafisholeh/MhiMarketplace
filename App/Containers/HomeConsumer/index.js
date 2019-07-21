import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { func, string, bool } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { FETCH_PRODUCT_CATEGORY } from 'GraphQL/Product/Query';
import CartActions from 'Redux/CartRedux';
import ProductActions from 'Redux/ProductRedux';
import { Images, Colors } from 'Themes';
import { moderateScale, reportSentryError } from 'Lib';
import { ConsumerPageHeader, ListHeader, CategoryItem, AppTitle } from 'Components';
import { getUserId, isKurir } from 'Redux/SessionRedux';
import ProductList from 'Containers/Product/List';
import AppConfig from 'Config/AppConfig';

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
      categories: [],
    };
  }
  
  componentDidMount() {
    const { navigation } = this.props;
    this.fetchInitCart();
    this.setupCategory();
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
  
  setupCategory = () => {
    const { productCategory = [] } = ApolloClientProvider.client.readQuery({
      query: FETCH_PRODUCT_CATEGORY
    });
    if (Array.isArray(productCategory) && productCategory.length) {
      this.setState({
        categories: productCategory.map(({ _id, title }) => 
          Object.assign({}, {id: _id}, AppConfig.category[title])
          || Object.assign({}, {id: null}, AppConfig.category.default)
        )
      });
    }
  }
  
  onSearch = value => {
    const { navigation, filterByTerm } = this.props;
    filterByTerm(value);
    navigation.navigate('ProductList');
  };
  
  openStoreByCategory = (categoryId, title) => {
    const { navigation, selectCategory } = this.props;
    selectCategory(categoryId, title);
    navigation.navigate('ProductList');
  };

  render() {
    const { isKurir, navigation } = this.props;
    const { categories } = this.state;
    return (
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <ConsumerPageHeader
          icon={isKurir ? Images.cart : Images.delivery}
          onIconPress={() => navigation.navigate(isKurir ? 'Cart' : 'ConsumerOrder')}
          onSearch={this.onSearch}
          isResetUponSearch
        />
        <AppTitle />
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: moderateScale(15),
            marginBottom: moderateScale(18),
          }}
        >
          {Array.isArray(categories) && categories.map(({ id, title, icon, color }, index) => 
            <CategoryItem
              key={index}
              title={title}
              icon={icon}
              color={color}
              onPress={() => this.openStoreByCategory(id, title)}
            />
          )}
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
  selectCategory: func,
  filterByTerm: func,
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  isKurir: isKurir(),
});

const mapDispatchToProps = (dispatch) => ({
  storeCart: cart => dispatch(CartActions.storeCart(cart)),
  selectCategory: (category_id, category_title) =>
    dispatch(ProductActions.selectCategory(category_id, category_title)),
  filterByTerm: (term) => dispatch(ProductActions.filterByTerm(term)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(HomeConsumer));
