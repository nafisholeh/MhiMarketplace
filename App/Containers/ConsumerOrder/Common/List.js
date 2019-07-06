import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { func, string, bool } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { createStructuredSelector } from 'reselect';

import {
  getReadableAddress,
  getReadableSubdistrict,
  getUpcomingShippingSched,
  calcTotalWeight,
  getReadableDate,
  getIntervalTimeToday,
  getAggregateProducts,
  parseToRupiah,
} from 'Lib';
import { QueryEffectSection, QueryEffectPage } from 'Components';
import { Colors } from 'Themes';
import Item from '../Common/Item';
import Title from '../Common/Title';
import ListActions from 'Redux/ListRedux';
import { getUserId } from 'Redux/SessionRedux';

class List extends Component {
  renderItems = ({item, index}) => {
    const { selectListItem, navigation } = this.props;
    const {
      _id,
      products,
      transaction_id,
      total_cost,
    } = item || {};
    const title = getAggregateProducts(products);
    return (
      <Item
        id={_id}
        index={index}
        transactionId={transaction_id}
        title={title}
        subtitle={parseToRupiah(total_cost)}
        onSelectItem={id => {
          selectListItem(id);
          navigation.navigate('ConsumerOrderDetail');
        }}
      />
    );
  };
  
  render() {
    const { title, userId, query, isPage } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {title && <Title>{title}</Title>}
        <Query
          query={query}
          variables={{ courier_id: null, user_id: userId }}
        >
          {({ loading, error, data, refetch }) => {
            const items = data[Object.keys(data)[0]] || [];
            if (Array.isArray(items) && items.length) {
              return (
                <FlatList
                  keyExtractor={(item, id) => item._id.toString()}
                  data={items} 
                  renderItem={this.renderItems}
                />
              )
            }
            if (isPage) {
              return (
                <QueryEffectPage
                  isLoading={loading}
                  isError={error}
                  isEmpty={!items.length}
                  onRefetch={refetch}
                />
              );
            }
            return (
              <QueryEffectSection
                isLoading={loading}
                isError={error}
                isEmpty={!items.length}
                onRefetch={refetch}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}

List.propTypes = {
  selectListItem: func,
  userId: string,
  isPage: bool,
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

const mapDispatchToProps = dispatch => ({
  selectListItem: selectedId => dispatch(ListActions.selectListItem(selectedId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(List));
