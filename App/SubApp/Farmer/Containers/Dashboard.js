import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { Query } from 'react-apollo';

import AppConfig from 'Config/AppConfig';
import { OptimizedList, QueryEffectPage } from 'Components';
import { FileItem } from 'CommonFarmer';
import { moderateScale, screenWidth } from 'Lib';
import { THEORY_CATEGORIES } from 'GraphQL/Theory/Query';

class Dashboard extends Component {
  static navigationOptions = ({navigation}) => ({ header: null })
  
  render() {
    return (
      <View style={{ flex: 1 }}>
      <Query
        query={THEORY_CATEGORIES}
        fetchPolicy="network-only"
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
                  const { title, desc, thumbnail } = data;
                  return (
                    <FileItem
                      title={title}
                      thumbnail={`${AppConfig.uri.basic}${thumbnail}`}
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
      </View>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
