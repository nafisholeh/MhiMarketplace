import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { func, string, bool } from 'prop-types';
import { createStructuredSelector } from 'reselect';

import ProductActions from 'Redux/ProductRedux';
import ProductList from 'Containers/Product/List';
import FilterItem from './FilterItem';
import { HeaderButton, SearchBar, ConsumerPageHeader } from 'Components';
import { getUserId, isKurir } from 'Redux/SessionRedux';
import { getProductTitle, getProductCategory, getTermFilter } from 'Redux/ProductRedux';
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
  
  clearFilter = () => {
    const { selectCategory } = this.props;
    selectCategory(null, null);
  };
  
  onSearch = value => {
    this.setState({
      searchTerm: value
    });
  }
  
  render() {
    const { isKurir, navigation, productTitle, productCategory } = this.props;
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
        {productTitle ? (
          <FilterItem
            title={productTitle}
            onPress={this.clearFilter}
          />
        ) : null}
        <ProductList
          searchTerm={searchTerm}
          category={productCategory}
        />
      </View>
    )
  }
}

ConsumerProductList.propTypes = {
  userId: string,
  storeCart: func,
  isKurir: bool,
  productTitle: string,
  productCategory: string,
  selectCategory: func,
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  isKurir: isKurir(),
  productTitle: getProductTitle(),
  productCategory: getProductCategory(),
});

const mapDispatchToProps = (dispatch) => ({
  selectCategory: (category_id, category_title) =>
    dispatch(ProductActions.selectCategory(category_id, category_title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ConsumerProductList));
