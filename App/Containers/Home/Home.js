import React, { Component } from 'react';
import { View } from 'react-native';
import { bool } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { HeaderButton } from 'Components';
import { Images, Metrics } from 'Themes';
import { isStokOpname, isKeuangan } from 'Redux/SessionRedux';
import HomeKeuangan from './HomeKeuangan';
import HomeUser from './HomeUser';

class Home extends Component {  
  static navigationOptions = ({navigation}) => {
    const {params: { isStokOpname, isKeuangan } = {}} = navigation.state
    return {
      title: 'MH.id',
      headerLeft: null,
      headerRight: isKeuangan ? null : (
        <HeaderButton
          onPress={() => navigation.navigate(isStokOpname ? 'ProductAdd' : 'Cart')}
          icon={isStokOpname ? Images.plus : Images.cart}
        />
      ),
    }
  }
  
  componentWillMount() {
    this.passNavigationProps();
  }
  
  componentDidUpdate(prevProps) {
    const { isKeuangan, isStokOpname } = this.props;
    if (prevProps.isKeuangan !== isKeuangan) {
      this.passNavigationProps();
    }
    if (prevProps.isStokOpname !== isStokOpname) {
      this.passNavigationProps();
    }
  }
  
  passNavigationProps = () => {
    const { navigation: { setParams }, isKeuangan, isStokOpname } = this.props;
    setParams({ isKeuangan, isStokOpname });
  };

  render() {
    const { isStokOpname, isKeuangan } = this.props;
    if (isKeuangan) {
      return <HomeKeuangan />
    }
    return <HomeUser />
  }
}

Home.propTypes = {
  isStokOpname: bool,
  isKeuangan: bool,
};

const mapStateToProps = createStructuredSelector({
  isStokOpname: isStokOpname(),
  isKeuangan: isKeuangan(),
});

export default connect(mapStateToProps, null)(Home);
