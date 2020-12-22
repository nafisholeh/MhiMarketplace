import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { string, func, any } from 'prop-types';

import ButtonWithIcon from './ButtonWithIcon';
import { METRICS } from 'themes-v3';
import { screenWidth } from 'Lib';

const TWO_BUTTON_WIDTH = screenWidth / 2 - METRICS.LARGE - METRICS.LARGE / 2;

class ButtonTwosWithIcon extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressRight = () => {
    const { onPressRight } = this.props;
    if (onPressRight) onPressRight();
  };

  onPressLeft = () => {
    const { onPressLeft } = this.props;
    if (onPressLeft) onPressLeft();
  };

  render() {
    const {
      leftText,
      rightText,
      leftIcon,
      rightIcon,
      TourHighlightRight,
      TourHighlightLeft,
    } = this.props;
    return (
      <View style={styles.container}>
        <ButtonWithIcon
          text={leftText}
          width={TWO_BUTTON_WIDTH}
          icon={leftIcon}
          onPress={this.onPressLeft}
          TourHighlight={TourHighlightLeft}
        />
        <View style={{ marginLeft: -METRICS.LARGE }}>
          <ButtonWithIcon
            text={rightText}
            width={TWO_BUTTON_WIDTH}
            icon={rightIcon}
            onPress={this.onPressRight}
            TourHighlight={TourHighlightRight}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
});

ButtonTwosWithIcon.propTypes = {
  onPressRight: func.isRequired,
  onPressLeft: string.isRequired,
  rightText: string.isRequired,
  leftText: string.isRequired,
  rightIcon: any.isRequired,
  leftIcon: any.isRequired,
  TourHighlightRight: any,
  TourHighlightLeft: any,
};

export default ButtonTwosWithIcon;
