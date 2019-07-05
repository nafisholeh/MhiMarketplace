import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { func, string, bool, oneOfType, number } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SearchBar from '../SearchBar';
import { Images, Metrics } from 'Themes';
import { moderateScale } from 'Lib';
import { getUserId } from 'Redux/SessionRedux';

class ConsumerPageHeader extends Component {
  render() {
    const { onIconPress, onSearch, icon, userId } = this.props;
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
        <SearchBar
          isFullWidth={!userId}
          onSearch={term => onSearch(term)}
        />
      </View>
    )
  }
}

ConsumerPageHeader.propTypes = {
  icon: oneOfType([string, number]),
  onIconPress: func,
  onSearch: func,
  userId: string,
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

export default connect(mapStateToProps, null)(ConsumerPageHeader);
