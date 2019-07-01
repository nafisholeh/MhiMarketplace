import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { func, string, bool } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Images, Colors } from 'Themes';
import { ConsumerPageHeader, ListHeader } from 'Components';
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
  
  onSearch = term => {
    this.setState({ searchTerm: term });
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

export default connect(mapStateToProps, null)(withNavigation(HomeConsumer));
