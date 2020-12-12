import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { string, func } from 'prop-types';

import ButtonWithShadow from './ButtonWithShadow';
import Button from './Button';
import { METRICS } from 'themes-v3';
import { screenWidth } from 'Lib';

const TWO_BUTTON_WIDTH = screenWidth / 2 - METRICS.LARGE - METRICS.LARGE / 2;

class ButtonYesNo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressYes = () => {
    const { onPressYes } = this.props;
    if (onPressYes) onPressYes();
  };

  onPressNo = () => {
    const { onPressNo } = this.props;
    if (onPressNo) onPressNo();
  };

  render() {
    const { noText, yesText } = this.props;
    return (
      <View style={styles.container}>
        <ButtonWithShadow
          text={noText}
          width={TWO_BUTTON_WIDTH}
          onPress={this.onPressNo}
        />
        <View style={{ marginLeft: -METRICS.LARGE }}>
          <Button
            text={yesText}
            width={TWO_BUTTON_WIDTH}
            onPress={this.onPressYes}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
});

ButtonYesNo.propTypes = {
  onPressYes: func.isRequired,
  onPressNo: string.isRequired,
  yesText: string.isRequired,
  noText: string.isRequired,
};

export default ButtonYesNo;
