import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Images, Metrics } from 'Themes';

class NotificationBar extends Component {
  openNotificationPage = () => {
    const { navigation } = this.props;
    navigation.navigate('NotificationHistory');
  };

  render() {
    const { style } = this.props;
    return (
      <TouchableOpacity
        onPress={this.openNotificationPage}
        style={style}
      >
        <Image
          source={Images.notification}
          style={{
            width: Metrics.icons.medium,
            height: Metrics.icons.medium
          }}
        />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(NotificationBar);