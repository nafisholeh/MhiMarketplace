import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import List from 'Containers/Product/List';
import CartActions from 'Redux/CartRedux';
import { Images, Metrics } from 'Themes';
import styles from './Styles';
    
class Home extends Component {
  
  componentDidMount() {
    this.props.fetchCart();
  }
  
  render () {
    return (
      <View style={styles.container}>
        <List />
      </View>
    )
  }
}

Home.propTypes = {
  fetchCart: func,
}

const mapDispatchToProps = (dispatch) => ({
  fetchCart: () => dispatch(CartActions.fetchCart()),
});

export default connect(null, mapDispatchToProps)(Home);