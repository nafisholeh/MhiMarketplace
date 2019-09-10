import React, { Component } from 'react';
import { View, TouchableOpacity, Image, TextInput } from 'react-native';
import { func, string, bool, oneOfType, number } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import ViewShadow from '../Shadow/ViewShadow';
import { LOG_PRODUCT_SEARCH } from 'GraphQL/Logs/Mutation';
import { Images, Metrics, Colors } from 'Themes';
import { moderateScale, screenWidth } from 'Lib';
import { getUserId } from 'Redux/SessionRedux';
import ProductActions, { getTermFilter } from 'Redux/ProductRedux';

class ConsumerPageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  
  componentDidMount() {
    this.initValue();
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.termFilter !== this.props.termFilter) {
      this.initValue();
    }
  }
  
  initValue = () => {
    const { termFilter, onSearch, isResetUponSearch } = this.props;
    if (termFilter && !isResetUponSearch) {
      this.setState({ value: termFilter });
      onSearch(termFilter);
    }
  }

  onChangeText = value => {
    const { onSearch } = this.props;
    this.setState({ value }, () => {
      if (value === '' || !value) {
        onSearch(value);
      };
    })
  };
  
  onSearch = () => {
    const { value } = this.state;
    const { onSearch, isResetUponSearch } = this.props;
    this.logProductSearch(value);
    if (isResetUponSearch) {
      this.setState({ value: '' }, () => {
        onSearch(value);
      });
      return;
    }
    onSearch(value);
  };
  
  logProductSearch = term => {
    const { userId } = this.props;
    let variables = { search_term: term };
    if (userId) {
      variables = { ...variables, ...{user_id: userId}};
    }
    ApolloClientProvider.client.mutate({
      mutation: LOG_PRODUCT_SEARCH,
      variables,
    })
    .then(res => {})
    .catch(err => {});
  };

  render() {
    const { onIconPress, icon, userId, termFilter } = this.props;
    const { value } = this.state;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: moderateScale(20),
          paddingBottom: moderateScale(25),
          zIndex: 2,
        }}
      >
        {userId &&
          <TouchableOpacity onPress={() => onIconPress()}>
            <Image
              source={icon}
              style={{
                height: 30,
                width: 35,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        }
        <ViewShadow
          width={!userId ? screenWidth - 40 : 275}
          height={50}
          borderRadius={4}
          shadowBorderRadiusAndroid={3}
          shadowRadiusAndroid={18}
          posYAndroid={0.82}
          shadowHorizontalMarginAndroid={0}
          shadowOpacityAndroid={0.1}
          mainColor={Colors.white}
          shadowColor={Colors.brown_light}
          styleChildren={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: moderateScale(10),
          }}
        >
            <TextInput
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Cari produk"
              selectTextOnFocus
              returnKeyType='search'
              clearTextOnFocus
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSearch}
              value={value}
              style={{
                flex: 1,
                marginRight: moderateScale(5),
              }}
            />
            <TouchableOpacity
              onPress={this.onSearch}
            >
              <Image
                source={Images.search}
                style={{
                  width: moderateScale(20),
                  height: moderateScale(20),
                  tintColor: Colors.icon,
                }}
              />
            </TouchableOpacity>
        </ViewShadow>
      </View>
    )
  }
}

ConsumerPageHeader.propTypes = {
  icon: oneOfType([string, number]),
  onIconPress: func,
  onSearch: func,
  userId: string,
  filterByTerm: func,
  termFilter: string,
  isResetUponSearch: bool,
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  termFilter: getTermFilter(),
});

const mapDispatchToProps = (dispatch) => ({
  filterByTerm: (term) => dispatch(ProductActions.filterByTerm(term)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerPageHeader);
