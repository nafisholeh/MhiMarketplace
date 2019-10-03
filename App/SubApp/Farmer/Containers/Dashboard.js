import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { Query } from 'react-apollo';

import AppConfig from 'Config/AppConfig';
import { OptimizedList, QueryEffectPage } from 'Components';
import { FileItem, SearchHeader } from 'CommonFarmer';
import { moderateScale, screenWidth } from 'Lib';
import { THEORY_CATEGORIES, SEARCH_THEORIES } from 'GraphQL/Theory/Query';
import { Fonts } from 'Themes';
import ListActions, { getSelectedListId } from 'Redux/ListRedux';

class Dashboard extends Component {
  static navigationOptions = ({navigation}) => ({ header: null })
  
  state = {
    isShowTheories: false,
    searchTerm: null,
    categoryId: null,
  }
  
  onSearchSOP = value => {
    this.setState({
      isShowTheories: value ? true : false,
      searchTerm: value,
      categoryId: null,
    });
  };
  
  onOpenSOP = url => {
    const { navigation, selectListItem } = this.props;
    selectListItem(AppConfig.uri.basic + url);
    navigation.navigate('SopViewer');
  };
  
  onOpenCategory = categoryId => {
    this.setState({
      isShowTheories: true,
      categoryId,
      searchTerm: null,
    });
  };
  
  render() {
    const { isShowTheories, searchTerm, categoryId } = this.state;
    return (
      <View style={{ flex: 1, paddingVertical: moderateScale(20) }}>
      <SearchHeader
        style={{ marginBottom: moderateScale(15) }}
        onSearch={this.onSearchSOP}
      />
      {isShowTheories
        ? (
          <Query
            query={SEARCH_THEORIES}
            variables={{
              term: searchTerm,
              categoryId
            }}
          >
            {({ loading, error, data, refetch }) => {
              const { searchTheories: items = [] } = data || {};
              if (Array.isArray(items) && items.length > 0) {
                return (
                  <Fragment>
                    <Text
                      style={{
                        marginHorizontal: moderateScale(23),
                        ...Fonts.TITLE_SMALL
                      }}
                    >
                      Ditemukan {items.length} hasil
                    </Text>
                    <OptimizedList
                      isHorizontal={false}
                      itemWidth={screenWidth / 2 - moderateScale(10)}
                      itemHeight={moderateScale(170)}
                      data={items}
                      renderRow={(type, data) => {
                        const { title, url, thumbnail } = data;
                        return (
                          <FileItem
                            title={title}
                            bigThumbnail
                            onPressParam={url}
                            thumbnail={`${AppConfig.uri.basic}${thumbnail}`}
                            onPress={this.onOpenSOP}
                          />
                        );
                      }}
                      style={{
                        flex: 1,
                      }}
                      contentContainerStyle={{
                        paddingBottom: moderateScale(20),
                        paddingTop: moderateScale(15),
                        marginHorizontal: moderateScale(10),
                      }}
                    />
                  </Fragment>
                );
              }
              return (
                <QueryEffectPage
                  isLoading={loading}
                  isError={error}
                  isEmpty={!items.length}
                  onRefetch={refetch}
                />
              );
            }}
          </Query>
        )
        : (
          <Query
            query={THEORY_CATEGORIES}
          >
            {({ loading, error, data, refetch }) => {
              const { theoryCategories = [] } = data || {};
              if (Array.isArray(theoryCategories) && theoryCategories.length > 0) {
                return (
                  <OptimizedList
                    isHorizontal={false}
                    itemWidth={screenWidth / 2 - moderateScale(10)}
                    itemHeight={moderateScale(170)}
                    data={theoryCategories}
                    renderRow={(type, data) => {
                      const { title, desc, thumbnail, _id } = data;
                      return (
                        <FileItem
                          title={title}
                          thumbnail={`${AppConfig.uri.basic}${thumbnail}`}
                          onPress={this.onOpenCategory}
                          onPressParam={_id}
                        />
                      );
                    }}
                    style={{
                      flex: 1,
                    }}
                    contentContainerStyle={{
                      paddingBottom: moderateScale(20),
                      paddingTop: moderateScale(15),
                      marginHorizontal: moderateScale(10),
                    }}
                  />
                );
              }
              return (
                <QueryEffectPage
                  isLoading={loading}
                  isError={error}
                  isEmpty={!theoryCategories.length}
                  onRefetch={refetch}
                />
              );
            }}
          </Query>
        )
      }
      </View>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  
});

const mapDispatchToProps = dispatch => ({
  selectListItem: selectedId => dispatch(ListActions.selectListItem(selectedId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
